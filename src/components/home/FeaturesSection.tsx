// src/components/home/FeaturesSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import logoPath from '/logo.png';

export interface HomePageFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

interface FeaturesSectionProps {
  features: HomePageFeature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
            Sa nou ofri / What We Offer
          </h2>
          <p className="text-xl text-muted-foreground">
            Dekouvri opòtinite yo pou aprann ak grandi nan domèn teknolòji ak edikasyon an
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="tpn-card p-6 text-center hover:shadow-xl transition-shadow duration-300 group relative">
                  {/* Logo Watermark */}
                  <div className="absolute top-2 right-2 opacity-5 pointer-events-none">
                    <img src={logoPath} alt="" className="w-8 h-8" />
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-3 text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>

                  {/* Link Button */}
                  <Link to={feature.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-accent hover:bg-accent/10 group-hover:translate-x-1 transition-transform"
                      aria-label={`Aprann plis sou ${feature.title}`}
                    >
                      Aprann Plus
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
