import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data - will be replaced with real data from Supabase
const featuredProfiles = [
  {
    id: "1",
    name: "Sarah M.",
    age: 28,
    location: "New York, NY",
    profession: "Software Engineer",
    education: "Masters in Computer Science",
    denomination: "Catholic",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Michael R.",
    age: 32,
    location: "Los Angeles, CA",
    profession: "Doctor",
    education: "MD Medicine",
    denomination: "Protestant",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Emily J.",
    age: 26,
    location: "Chicago, IL",
    profession: "Teacher",
    education: "Bachelor in Education",
    denomination: "Orthodox",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "David K.",
    age: 30,
    location: "Houston, TX",
    profession: "Architect",
    education: "Masters in Architecture",
    denomination: "Baptist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
];

function ProfileCard({ profile, index }: { profile: typeof featuredProfiles[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group overflow-hidden hover:shadow-elegant-lg transition-all duration-300 border-border/50">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
            <h3 className="font-display text-xl font-semibold">
              {profile.name}, {profile.age}
            </h3>
            <p className="flex items-center gap-1 text-sm text-background/80">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </p>
          </div>
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            {profile.denomination}
          </Badge>
        </div>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 text-primary" />
            <span>{profile.profession}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span>{profile.education}</span>
          </div>
          <Button className="w-full gap-2 mt-2" variant="outline">
            <Heart className="h-4 w-4" />
            Express Interest
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function FeaturedProfiles() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Featured Profiles
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our <span className="text-gradient-gold">Premium</span> Members
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore verified profiles of Christian singles looking for meaningful relationships built on faith and love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProfiles.map((profile, index) => (
            <ProfileCard key={profile.id} profile={profile} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button size="lg" variant="outline" className="gap-2">
            View All Profiles
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
