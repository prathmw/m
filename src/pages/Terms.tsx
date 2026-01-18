import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

const Terms = () => {
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
              Terms & <span className="text-gradient-gold">Conditions</span>
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
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Sacred Union ("the Service"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use the Service.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use this Service. By using the Service, you represent and warrant that you have the right, authority, and capacity to enter into this agreement.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account and password.
            </p>

            <h2>4. Code of Conduct</h2>
            <p>
              You agree to use the Service in a manner consistent with applicable laws and regulations. You will not:
            </p>
            <ul>
              <li>Harass, abuse, or harm another person</li>
              <li>Post content that is offensive, defamatory, or obscene</li>
              <li>Use the Service for any fraudulent or illegal purpose</li>
              <li>Impersonate any person or entity</li>
            </ul>

            <h2>5. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or us.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              Sacred Union is not responsible for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Service.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
            </p>

            <h2>8. Contact Information</h2>
            <p>
              For any questions regarding these Terms, please contact us at legal@sacredunion.com.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
