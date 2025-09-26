// src/components/home/TestimonialsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star, LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
            Temoignaj / Testimonials
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
            Sa moun yo ap di / What People Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aprann kijan Tek Pou Nou ap chanje lavi moun yo nan kominote Ayisyen an.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="tpn-card p-6 hover:shadow-xl transition-shadow relative"
            >
              {/* Star Rating */}
              <div className="flex items-center mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg italic mb-6 text-muted-foreground text-center">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-border"
                  loading="lazy"
                />
                <div className="text-left">
                  <div className="font-bold text-primary">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Haitian Cultural Accent */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/30 border border-border">
            <span className="text-2xl mr-2" aria-hidden="true">🇭🇹</span>
            <span className="text-muted-foreground font-medium">
              Edikasyon se pouvwa a / Education is power
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
