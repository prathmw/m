import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const features = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Faith-Based Matching",
      description: "Connect with singles who share your Christian values",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Verified Profiles",
      description: "Every profile is manually verified for authenticity",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Active Community",
      description: "Join thousands of active Christian singles",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-background/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Find Your <span className="text-accent">Soulmate</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Join Sacred Union today and take the first step towards a blessed marriage. 
            Your God-ordained partner could be just a click away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-xl bg-background/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-primary-foreground/70">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base px-8 h-12 shadow-gold"
              asChild
            >
              <Link to="/register">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-primary-foreground/60 mt-4">
              Free registration • No credit card required
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
