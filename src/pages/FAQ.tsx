import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "Registration & Profile",
    questions: [
      {
        q: "Is it free to create a profile?",
        a: "Yes, registration and creating a profile on Sacred Union is completely free. You can add your details, upload photos, and express interest in other profiles without any cost.",
      },
      {
        q: "How do I verify my profile?",
        a: "We take trust and safety seriously. To verify your profile, you need to provide a valid government ID and a phone number. Our team manually reviews each verification request.",
      },
      {
        q: "Can I hide my profile?",
        a: "Yes, you can temporarily hide your profile from search results if you wish to take a break. You can find this option in your profile settings.",
      },
    ],
  },
  {
    category: "Safety & Privacy",
    questions: [
      {
        q: "Is my personal information safe?",
        a: "Absolutely. We use industry-standard encryption to protect your data. Your contact details are never shared with other users unless you explicitly choose to share them.",
      },
      {
        q: "How do I report a suspicious profile?",
        a: "If you encounter any suspicious activity or a profile that violates our terms, please use the 'Report' button on their profile page. Our safety team investigates all reports immediately.",
      },
    ],
  },
  {
    category: "Membership & Matching",
    questions: [
      {
        q: "How does the matching system work?",
        a: "Our algorithm considers your preferences, denomination, values, and interests to suggest compatible matches. The more detailed your profile, the better our suggestions will be.",
      },
      {
        q: "What is the difference between free and premium membership?",
        a: "Free members can create profiles and send interests. Premium members enjoy benefits like unlimited messaging, viewing contact details, and priority customer support.",
      },
    ],
  },
];

const FAQ = () => {
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
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Find answers to common questions about Sacred Union, your profile, safety, and more.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {faqs.map((category, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-foreground mb-6"
              >
                {category.category}
              </motion.h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, qIndex) => (
                  <motion.div
                    key={qIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: qIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem value={`item-${index}-${qIndex}`}>
                      <AccordionTrigger className="text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              We're here to help. Contact our support team for assistance.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
