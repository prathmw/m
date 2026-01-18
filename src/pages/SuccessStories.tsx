import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Quote, UserPlus } from "lucide-react";

const successStories = [
  {
    id: 1,
    names: "John & Mary",
    location: "Atlanta, GA",
    date: "Married June 2023",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop",
    story: "We met on Sacred Union and knew instantly that God had a plan for us. After 6 months of getting to know each other, we got married. The platform made it easy to filter by our specific denomination and values.",
  },
  {
    id: 2,
    names: "David & Rebecca",
    location: "Dallas, TX",
    date: "Married August 2022",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
    story: "The faith-based matching system helped us find each other. We shared the same values from day one. Now we're blessed with a beautiful family and serve in our local church together.",
  },
  {
    id: 3,
    names: "Peter & Grace",
    location: "Seattle, WA",
    date: "Married January 2024",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    story: "After years of searching, we finally found our soulmates through Sacred Union. We appreciate how the site encourages detailed profiles, which helped us understand each other's walk with Christ before we even met.",
  },
  {
    id: 4,
    names: "Michael & Sarah",
    location: "Chicago, IL",
    date: "Married September 2023",
    image: "https://images.unsplash.com/photo-1623091411315-bd4e76550605?w=600&h=400&fit=crop",
    story: "God's timing is perfect. We both joined Sacred Union at the same time and were matched within a week. Our first conversation lasted for hours, and we knew this was something special.",
  },
  {
    id: 5,
    names: "Thomas & Elizabeth",
    location: "Boston, MA",
    date: "Married April 2023",
    image: "https://images.unsplash.com/photo-1529634597503-139d372668c4?w=600&h=400&fit=crop",
    story: "We were both skeptical about online matrimony, but Sacred Union changed our minds. The community is genuine and focused on marriage. We are so grateful for this platform.",
  },
  {
    id: 6,
    names: "James & Hannah",
    location: "Nashville, TN",
    date: "Married December 2023",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?w=600&h=400&fit=crop",
    story: "Finding someone who shares your calling is rare. Sacred Union helped us connect across states. Now we are happily married and leading a youth ministry together.",
  },
];

const SuccessStories = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-royal-blue-light to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Success <span className="text-gradient-gold">Stories</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Celebrate the beautiful unions that began right here. These couples found their
              God-ordained partners through faith, prayer, and Sacred Union.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-elegant-lg transition-all duration-300 overflow-hidden group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.names}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {story.names}
                        </h3>
                        <p className="text-sm text-primary font-medium">{story.date}</p>
                        <p className="text-xs text-muted-foreground">{story.location}</p>
                      </div>
                      <Quote className="h-6 w-6 text-accent/50" />
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{story.story}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Ready to Write Your Own Love Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of Christian singles who are seeking a meaningful, faith-centered relationship.
            </p>
            <Button size="lg" className="gap-2 text-base px-8" asChild>
              <Link to="/register">
                <UserPlus className="h-5 w-5" />
                Create Your Profile
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SuccessStories;
