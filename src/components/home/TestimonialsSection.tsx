import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    names: "John & Mary Thompson",
    location: "Atlanta, GA",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop",
    quote: "We met on Sacred Union and knew instantly that God had a plan for us. After 6 months of getting to know each other, we got married. Thank you for bringing us together!",
    rating: 5,
    marriedYear: "2023",
  },
  {
    id: 2,
    names: "David & Rebecca Williams",
    location: "Dallas, TX",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop",
    quote: "The faith-based matching system helped us find each other. We shared the same values from day one. Now we're blessed with a beautiful family.",
    rating: 5,
    marriedYear: "2022",
  },
  {
    id: 3,
    names: "Peter & Grace Anderson",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
    quote: "After years of searching, we finally found our soulmates through Sacred Union. The platform's focus on Christian values made all the difference.",
    rating: 5,
    marriedYear: "2024",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
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
            Success Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real couples who found their divine match through Sacred Union
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-0 shadow-elegant-lg">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    {/* Image */}
                    <div className="aspect-square md:aspect-auto">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].names}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10 flex flex-col justify-center bg-card">
                      <Quote className="h-10 w-10 text-accent mb-6" />
                      
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                        ))}
                      </div>

                      <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                        "{testimonials[currentIndex].quote}"
                      </p>

                      <div>
                        <h4 className="font-display text-xl font-semibold text-foreground">
                          {testimonials[currentIndex].names}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {testimonials[currentIndex].location} • Married {testimonials[currentIndex].marriedYear}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
