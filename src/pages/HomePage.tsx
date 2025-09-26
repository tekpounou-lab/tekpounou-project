// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { 
  BookOpen, 
  FileText, 
  Users, 
  Award, 
  ArrowRight, 
  Star,
  Brain,
  Globe,
  Zap,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ROUTES } from '@/routes';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Import logo from public folder
import logoPath from '/logo.png';

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Kou yo / Courses',
      description: 'Aprann ak kou entraktif yo nan Kreyòl ak lòt lang yo',
      href: ROUTES.courses,
      gradient: 'from-orange-500 to-pink-600',
      delay: 0.1
    },
    {
      icon: FileText,
      title: 'Blog / Nouvèl',
      description: 'Li atik ak nouvèl yo sou edikasyon ak teknolòji',
      href: ROUTES.blog,
      gradient: 'from-green-500 to-teal-600',
      delay: 0.2
    },
    {
      icon: Users,
      title: 'Kominote / Community',
      description: 'Rankontre ak lòt etidyan ak pwofè yo nan kominote an',
      href: ROUTES.community,
      gradient: 'from-purple-500 to-indigo-600',
      delay: 0.3
    },
    {
      icon: Award,
      title: 'Sètifika / Certificates',
      description: 'Resevwa sètifika lè ou fini kou yo ak siksè',
      href: ROUTES.certificates,
      gradient: 'from-yellow-500 to-orange-600',
      delay: 0.4
    }
  ];

  const stats = [
    { number: '500+', label: 'Etidyan / Students', icon: Users },
    { number: '50+', label: 'kou / Courses', icon: BookOpen },
    { number: '20+', label: 'Pwofè / Teachers', icon: Brain },
    { number: '100+', label: 'Sètifika / Certificates', icon: Award }
  ];

  const testimonials = [
    {
      quote: "Tek Pou Nou te chanje lavi m. Mwen kapab travay sou pwojè teknoloji yo nan Kreyòl!",
      author: "Sarah Michel",
      role: "Etidyan nouvo",
      avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "Kou yo yo fèt pou kominote Ayisyen an. Mwen pa janm santi m kòmansè.",
      author: "Pierre Moïse",
      role: "Etidyan ak pasyon pou pwogrammi",
      avatar: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Floating Navigation with Logo */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
          >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img 
                  src={logoPath} 
                  alt="Tek Pou Nou" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-bold text-primary">Tek Pou Nou</span>
              </div>
              <Link to={ROUTES.courses}>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-accent/10">
                  Kòmanse Aprann
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Logo as Central Visual */}
      <section className="tpn-hero-section relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* ✅ LOGO AS HERO ANCHOR */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <div className="relative inline-block">
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
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <Badge className="bg-accent/10 text-accent border-accent/20 mb-6">
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

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground"
            >
              Aprann, devlope, ak grandi ak kominote edikasyon Ayisyen an
            </motion.p>

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
                      Gade kou yo
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Animated Haitian Flag Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230072CE' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Logo Watermark */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Sa nou ofri / What We Offer
            </h2>
            <p className="text-xl text-muted-foreground">
              Dekouvri opòtinite yo pou aprann ak grandi nan domèn teknolòji ak edikasyon an
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                >
                  <Card className="tpn-card p-6 text-center hover:shadow-xl transition-all duration-300 group relative">
                    {/* ✅ SUBTLE LOGO WATERMARK */}
                    <div className="absolute top-2 right-2 opacity-5">
                      <img 
                        src={logoPath} 
                        alt="" 
                        className="w-8 h-8"
                      />
                    </div>
                    
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-primary">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                    
                    <Link to={feature.href}>
                      <Button variant="ghost" size="sm" className="text-accent hover:bg-accent/10 group-hover:translate-x-1 transition-transform">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-6">Temoignaj / Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Sa moun yo ap di / What People Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="tpn-card p-6"
              >
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                <p className="text-lg italic mb-6 text-muted-foreground">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-primary">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Logo as Trust Signal */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            {/* ✅ LOGO NEXT TO CTA */}
            <div className="flex justify-center mb-6">
              <img 
                src={logoPath} 
                alt="Tek Pou Nou" 
                className="w-16 h-16 rounded-2xl shadow-lg"
              />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-primary-foreground">
              Pare pou Kòmanse? / Ready to Get Started?
            </h2>
            
            <p className="text-xl mb-8 text-primary-foreground/90">
              Antre nan kominote nou an ak kòmanse aprann jodi a
            </p>
            
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={ROUTES.register}>
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Kreye Kont Gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={ROUTES.courses}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Gade kou yo
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to={ROUTES.courses}>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Kontinye Aprann
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Floating Haitian Flag with Logo */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce flex flex-col items-center">
        <div className="w-12 h-6 bg-blue-600 relative rounded-sm shadow-lg mb-2">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 rounded-t-sm"></div>
        </div>
        <img 
          src={logoPath} 
          alt="Tek Pou Nou" 
          className="w-10 h-10 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default HomePage;