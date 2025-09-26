// src/components/home/CtaSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/routes';
import { motion } from 'framer-motion';
import logoPath from '/logo.png';

interface CtaSectionProps {
  user: { id: string; email: string } | null;
}

const CtaSection: React.FC<CtaSectionProps> = ({ user }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Logo as Trust Signal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <img
                src={logoPath}
                alt="Tek Pou Nou"
                className="w-20 h-20 rounded-2xl shadow-xl border-2 border-white/20"
              />
              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/20 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl lg:text-4xl font-bold mb-6 text-primary-foreground"
          >
            <span className="block">Pare pou Kòmanse?</span>
            <span className="block text-2xl mt-2">Ready to Get Started?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto"
          >
            Antre nan kominote nou an ak kòmanse aprann jodi a
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {!user ? (
              <>
                <Link to={ROUTES.register}>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Kreye Kont Gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={ROUTES.courses}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Gade Kous yo
                  </Button>
                </Link>
              </>
            ) : (
              <Link to={ROUTES.courses}>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-shadow"
                >
                  Kontinye Aprann
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <div className="inline-flex items-center bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-white/90 text-sm">500+ etidyan aprann jodi a</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Haitian Flag */}
      <div className="absolute bottom-6 right-6 animate-bounce flex flex-col items-center">
        <div className="w-12 h-6 bg-blue-600 relative rounded-sm shadow-lg mb-2">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 rounded-t-sm" />
        </div>
        <img src={logoPath} alt="Tek Pou Nou" className="w-10 h-10 rounded-full shadow-lg" />
      </div>
    </section>
  );
};

export default CtaSection;
