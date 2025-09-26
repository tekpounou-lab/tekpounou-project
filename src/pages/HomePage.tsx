// src/pages/HomePage.tsx
import React, { lazy, Suspense } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/routes';
import { motion } from 'framer-motion';

// ✅ Modular Sections (Lazy-loaded for performance)
const HeroSection = lazy(() => import('@/components/home/HeroSection'));
const StatsSection = lazy(() => import('@/components/home/StatsSection'));
const FeaturesSection = lazy(() => import('@/components/home/FeaturesSection'));
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection'));
const CtaSection = lazy(() => import('@/components/home/CtaSection'));

// ✅ Types
import type { HomePageFeature, HomePageStat, HomePageTestimonial } from '@/types/home';

// ✅ Icons
import { BookOpen, FileText, Users, Award, Brain, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuthStore();

  // ✅ Feature Data (Aligned with seeded courses/blog)
  const features: HomePageFeature[] = [
    {
      icon: BookOpen,
      title: 'Kous yo / Courses',
      description: 'Aprann ak kous entraktif yo nan Kreyòl ak lòt lang yo',
      href: ROUTES.courses,
      gradient: 'from-orange-500 to-pink-600'
    },
    {
      icon: FileText,
      title: 'Blog / Nouvèl',
      description: 'Li atik ak nouvèl yo sou edikasyon ak teknolòji',
      href: ROUTES.blog,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Kominote / Community',
      description: 'Rankontre ak lòt etidyan ak pwofè yo nan kominote an',
      href: ROUTES.community,
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Award,
      title: 'Sètifika / Certificates',
      description: 'Resevwa sètifika lè ou fini kous yo ak siksè',
      href: ROUTES.certificates,
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  // ✅ Stats Data (From seeded analytics)
  const stats: HomePageStat[] = [
    { number: '500+', label: 'Etidyan / Students', icon: Users },
    { number: '50+', label: 'Kous / Courses', icon: BookOpen },
    { number: '20+', label: 'Pwofè / Teachers', icon: Brain },
    { number: '100+', label: 'Sètifika / Certificates', icon: Award }
  ];

  // ✅ Testimonials (From seeded user_feedback & profiles)
  const testimonials: HomePageTestimonial[] = [
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
    <div className="overflow-x-hidden bg-background">
      {/* Hero Section (Above the fold - not lazy-loaded) */}
      <HeroSection user={user} />

      {/* Lazy-loaded sections below the fold */}
      <Suspense fallback={<div className="h-96 bg-muted/30" />}>
        <StatsSection stats={stats} />
        <FeaturesSection features={features} />
        <TestimonialsSection testimonials={testimonials} />
        <CtaSection user={user} />
      </Suspense>
    </div>
  );
};

export default HomePage;