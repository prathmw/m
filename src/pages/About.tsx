import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Heart, Shield, Users, BookOpen, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Faith-Centered",
    description: "Every connection begins with shared Christian faith and values.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Trust & Safety",
    description: "Verified profiles and secure communication for your peace of mind.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community",
    description: "A supportive community of believers seeking meaningful relationships.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Guided Journey",
    description: "Resources and support to help you find your life partner.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Excellence",
    description: "Committed to providing the best matrimony experience.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Reach",
    description: "Connecting Christian singles from around the world.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-b from-royal-blue-light to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-gradient-gold">Sacred Union</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a Christ-centered matrimony platform dedicated to helping Christian singles 
              find their God-ordained life partners. Our mission is to facilitate divine connections 
              that lead to blessed, lasting marriages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=500&fit=crop"
                alt="Christian couple"
                className="rounded-2xl shadow-elegant-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sacred Union was founded with a simple yet profound vision: to help Christian 
                  singles find meaningful, faith-based relationships that lead to holy matrimony.
                </p>
                <p>
                  We understand that finding a life partner who shares your faith, values, and 
                  commitment to Christ is essential for a blessed marriage. That's why we created 
                  a platform specifically designed for the Christian community.
                </p>
                <p>
                  Our team is dedicated to providing a safe, trustworthy environment where you 
                  can connect with like-minded individuals who are equally committed to building 
                  a Christ-centered relationship.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by our commitment to faith, integrity, and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {value.icon}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                "Therefore what God has joined together, let no one separate." - Mark 10:9
              </p>
              <p className="text-muted-foreground">
                We believe that marriage is a sacred covenant ordained by God. Our mission is to 
                facilitate divine connections between Christian singles, helping them find partners 
                who will walk alongside them in faith, love, and mutual respect. We are committed 
                to supporting couples on their journey from first connection to lasting marriage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
