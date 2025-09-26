// src/components/home/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ROUTES } from '@/routes';
import logoPath from '/logo.png';

interface HeroSectionProps {
  user: { id: string } | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ user }) => {
  return (
    <section className="tpn-hero-section relative min-h-screen flex items-center overflow-hidden">
      {/* Animated radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Central Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-8 relative inline-block"
          >
            <img
              src={logoPath}
              alt="Tek Pou Nou Logo"
              className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-2xl shadow-xl"
            />
            {/* Floating glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Badge + Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-6 inline-flex items-center justify-center">
              <Globe className="w-4 h-4 mr-2" />
              Teknoloji pou kominote Ayisyen an
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="block bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                Tek Pou Nou
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-normal mt-3 text-muted-foreground">
                Technology for Us / Teknolòji pou Nou
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground"
          >
            Aprann, devlope, ak grandi ak kominote edikasyon Ayisyen an
          </motion.p>

          {/* Primary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {user ? (
              <>
                <Link to={ROUTES.courses}>
                  <Button size="lg" className="tpn-gradient text-primary-foreground hover:shadow-lg">
                    Kontinye Aprann
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={ROUTES.profile}>
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-accent/5">
                    Mon Pwofil
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={ROUTES.register}>
                  <Button size="lg" className="tpn-gradient text-primary-foreground hover:shadow-lg">
                    Kòmanse Jodia a
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={ROUTES.courses}>
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-accent/5">
                    Gade Kous yo
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Haitian Flag Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230072CE' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      {/* Floating Sparkles */}
      <motion.div
        className="absolute top-20 right-10 text-accent"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
