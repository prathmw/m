-- ============================================
-- SACRED UNION - DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Create Enum Types
-- ============================================
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.profile_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');
CREATE TYPE public.gender_type AS ENUM ('male', 'female');

-- 2. User Roles Table (for admin access)
-- ============================================
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Denominations / Castes Table
-- ============================================
CREATE TABLE public.denominations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default denominations
INSERT INTO public.denominations (name, description) VALUES
    ('Roman Catholic', 'Roman Catholic Church'),
    ('Protestant', 'Protestant Christianity'),
    ('Orthodox', 'Eastern Orthodox Church'),
    ('Baptist', 'Baptist Churches'),
    ('Methodist', 'Methodist Churches'),
    ('Lutheran', 'Lutheran Churches'),
    ('Pentecostal', 'Pentecostal Churches'),
    ('Anglican', 'Anglican Communion'),
    ('Presbyterian', 'Presbyterian Churches'),
    ('Evangelical', 'Evangelical Christianity'),
    ('Other', 'Other Christian Denominations');

ALTER TABLE public.denominations ENABLE ROW LEVEL SECURITY;

-- 4. Sub-Castes / Communities Table
-- ============================================
CREATE TABLE public.sub_castes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    denomination_id UUID REFERENCES public.denominations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (denomination_id, name)
);

ALTER TABLE public.sub_castes ENABLE ROW LEVEL SECURITY;

-- 5. Profiles Table
-- ============================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    registration_number VARCHAR(20) UNIQUE,
    
    -- Personal Details
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender gender_type NOT NULL,
    date_of_birth DATE NOT NULL,
    phone VARCHAR(20),
    
    -- Religious Info
    denomination_id UUID REFERENCES public.denominations(id),
    sub_caste_id UUID REFERENCES public.sub_castes(id),
    mother_tongue VARCHAR(100),
    
    -- Location
    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    
    -- Education & Career
    education VARCHAR(100),
    profession VARCHAR(100),
    employer VARCHAR(200),
    income VARCHAR(50),
    
    -- Profile Content
    about_me TEXT,
    partner_expectation TEXT,
    profile_photo_url TEXT,
    
    -- Status
    status profile_status DEFAULT 'pending',
    rejection_reason TEXT,
    is_featured BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 6. Profile Photos Table (multiple photos)
-- ============================================
CREATE TABLE public.profile_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    photo_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profile_photos ENABLE ROW LEVEL SECURITY;

-- 7. Interests Table (expressing interest in profiles)
-- ============================================
CREATE TABLE public.interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    to_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (from_profile_id, to_profile_id)
);

ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;

-- 8. Messages Table
-- ============================================
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 9. Contact Enquiries Table
-- ============================================
CREATE TABLE public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

-- 10. CMS Content Table
-- ============================================
CREATE TABLE public.cms_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200),
    content TEXT,
    metadata JSONB DEFAULT '{}',
    updated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;

-- 11. Banners Table
-- ============================================
CREATE TABLE public.banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200),
    subtitle TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SECURITY DEFINER FUNCTIONS
-- ============================================

-- Function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT public.has_role(_user_id, 'admin')
$$;

-- Function to generate registration number
CREATE OR REPLACE FUNCTION public.generate_registration_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    new_number TEXT;
    counter INTEGER;
BEGIN
    SELECT COUNT(*) + 1 INTO counter FROM public.profiles;
    new_number := 'SU' || LPAD(counter::TEXT, 6, '0');
    RETURN new_number;
END;
$$;

-- Trigger to auto-generate registration number
CREATE OR REPLACE FUNCTION public.set_registration_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.registration_number IS NULL THEN
        NEW.registration_number := public.generate_registration_number();
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_set_registration_number
    BEFORE INSERT ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.set_registration_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$;

-- Apply updated_at triggers
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trigger_denominations_updated_at
    BEFORE UPDATE ON public.denominations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trigger_sub_castes_updated_at
    BEFORE UPDATE ON public.sub_castes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trigger_cms_content_updated_at
    BEFORE UPDATE ON public.cms_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trigger_banners_updated_at
    BEFORE UPDATE ON public.banners
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- User Roles Policies
CREATE POLICY "Users can view their own roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
    ON public.user_roles FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Denominations Policies (public read, admin write)
CREATE POLICY "Anyone can view active denominations"
    ON public.denominations FOR SELECT
    TO authenticated
    USING (is_active = true);

CREATE POLICY "Admins can manage denominations"
    ON public.denominations FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Sub-Castes Policies
CREATE POLICY "Anyone can view active sub-castes"
    ON public.sub_castes FOR SELECT
    TO authenticated
    USING (is_active = true);

CREATE POLICY "Admins can manage sub-castes"
    ON public.sub_castes FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can view approved profiles"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (status = 'approved');

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all profiles"
    ON public.profiles FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Profile Photos Policies
CREATE POLICY "Users can view approved photos"
    ON public.profile_photos FOR SELECT
    TO authenticated
    USING (is_approved = true);

CREATE POLICY "Users can manage their own photos"
    ON public.profile_photos FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = profile_photos.profile_id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all photos"
    ON public.profile_photos FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Interests Policies
CREATE POLICY "Users can view interests involving them"
    ON public.interests FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE (id = interests.from_profile_id OR id = interests.to_profile_id)
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can send interests from their profile"
    ON public.interests FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = from_profile_id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update interests sent to them"
    ON public.interests FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = interests.to_profile_id
            AND user_id = auth.uid()
        )
    );

-- Messages Policies (only between mutually accepted interests)
CREATE POLICY "Users can view their messages"
    ON public.messages FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE (id = messages.sender_id OR id = messages.receiver_id)
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can send messages to accepted matches"
    ON public.messages FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = sender_id AND p.user_id = auth.uid()
        )
        AND EXISTS (
            SELECT 1 FROM public.interests i
            WHERE (
                (i.from_profile_id = sender_id AND i.to_profile_id = receiver_id)
                OR (i.from_profile_id = receiver_id AND i.to_profile_id = sender_id)
            )
            AND i.status = 'accepted'
        )
    );

-- Contact Enquiries Policies
CREATE POLICY "Anyone can submit enquiries"
    ON public.contact_enquiries FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admins can manage enquiries"
    ON public.contact_enquiries FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- CMS Content Policies
CREATE POLICY "Anyone can read CMS content"
    ON public.cms_content FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admins can manage CMS content"
    ON public.cms_content FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- Banners Policies
CREATE POLICY "Anyone can view active banners"
    ON public.banners FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "Admins can manage banners"
    ON public.banners FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()));

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create profile photos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create banners bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('banners', 'banners', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for profile-photos
CREATE POLICY "Users can upload their own photos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'profile-photos'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update their own photos"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'profile-photos'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete their own photos"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'profile-photos'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Anyone can view profile photos"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'profile-photos');

-- Storage Policies for banners (admin only)
CREATE POLICY "Admins can manage banners storage"
    ON storage.objects FOR ALL
    TO authenticated
    USING (
        bucket_id = 'banners'
        AND public.is_admin(auth.uid())
    );

CREATE POLICY "Anyone can view banners"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'banners');

-- ============================================
-- INITIAL CMS CONTENT
-- ============================================

INSERT INTO public.cms_content (key, title, content, metadata) VALUES
    ('home_hero_title', 'Find Your Sacred Union', 'Join thousands of Christian singles seeking meaningful relationships rooted in faith.', '{}'),
    ('home_hero_subtitle', 'Hero Subtitle', 'Where Faith Meets Forever', '{}'),
    ('about_us', 'About Sacred Union', 'Sacred Union is a premier Christian matrimony platform dedicated to helping believers find their life partners...', '{}'),
    ('terms_conditions', 'Terms & Conditions', 'Please read these terms carefully...', '{}'),
    ('privacy_policy', 'Privacy Policy', 'Your privacy is important to us...', '{}'),
    ('contact_email', 'Contact Email', 'digitalwebcore@gmail.com', '{}'),
    ('contact_phone', 'Contact Phone', '+1 (234) 567-8900', '{}'),
    ('contact_address', 'Contact Address', '123 Faith Street, Christian City, CC 12345', '{}')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- CREATE FIRST ADMIN (IMPORTANT!)
-- After running this, replace 'YOUR_USER_ID' with your actual user ID
-- You can find your user ID in Supabase Auth > Users
-- ============================================

-- Uncomment and modify this line after you register your admin account:
-- INSERT INTO public.user_roles (user_id, role) VALUES ('YOUR_USER_ID_HERE', 'admin');
