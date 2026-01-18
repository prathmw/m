import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-b from-royal-blue-light to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy <span className="text-gradient-gold">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2>1. Introduction</h2>
            <p>
              Welcome to Sacred Union. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Personal details (name, date of birth, gender)</li>
              <li>Contact information (email address, phone number)</li>
              <li>Profile information (education, profession, religious background)</li>
              <li>Photos and other media you upload</li>
              <li>Messages and communications with other users</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul>
              <li>Create and manage your account</li>
              <li>Facilitate matches with other users</li>
              <li>Provide customer support</li>
              <li>Send you updates and notifications</li>
              <li>Improve our services and prevent fraud</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>5. Sharing Your Information</h2>
            <p>
              We do not sell your personal information to third parties. We may share your data with:
            </p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You can manage your profile settings or contact us for assistance.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@sacredunion.com.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
