import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Shield, AlertTriangle, MessageCircle, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Safety = () => {
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
              Safety <span className="text-gradient-gold">Tips</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Your safety is our top priority. Here are some guidelines to help you stay safe while looking for your partner.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-display text-xl font-bold mb-3">Protect Your Personal Info</h3>
                  <p className="text-muted-foreground">
                    Never share your personal financial information, social security number, or home address with someone you've just met online. Keep your communication within the Sacred Union platform until you feel completely comfortable.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <AlertTriangle className="h-10 w-10 text-accent mb-4" />
                  <h3 className="font-display text-xl font-bold mb-3">Watch Out for Red Flags</h3>
                  <p className="text-muted-foreground">
                    Be cautious of anyone who asks for money, claims to be overseas in distress, or pressures you to move the conversation off the platform immediately. If something feels off, trust your instincts.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <MessageCircle className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="font-display text-xl font-bold mb-3">Take Your Time</h3>
                  <p className="text-muted-foreground">
                    Get to know the person through messages and video calls before meeting in person. Ask questions and look for consistency in their answers. Don't rush into anything.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <UserCheck className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="font-display text-xl font-bold mb-3">Meeting in Person</h3>
                  <p className="text-muted-foreground">
                    When you decide to meet, choose a public place. Tell a friend or family member where you are going and who you are meeting. Arrange your own transportation to and from the meeting.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-2xl font-bold mb-4">Report Suspicious Activity</h2>
            <p className="text-muted-foreground mb-6">
              If you encounter a profile that violates our terms or seems suspicious, please report it immediately. We review all reports to keep our community safe.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Safety;
