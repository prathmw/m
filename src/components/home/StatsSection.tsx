import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Heart, UserCheck, Award } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function StatItem({ icon, value, suffix, label, delay }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: 50000,
      suffix: "+",
      label: "Registered Profiles",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      value: 12000,
      suffix: "+",
      label: "Successful Matches",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      value: 98,
      suffix: "%",
      label: "Verified Members",
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: 15,
      suffix: "+",
      label: "Years of Trust",
    },
  ];

  return (
    <section className="bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our growing community of Christian singles who have found love and companionship through Sacred Union.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
