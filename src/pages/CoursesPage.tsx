// src/pages/CoursesPage.tsx
import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout'; // ✅ Use Layout

interface Course {
  id: string;
  title: string;
  description: string;
  teacher_id: string;
  duration_hours: number;
  enrollment_count: number;
  price: number;
  currency: string;
  language: string;
  difficulty_level: string;
  thumbnail_url: string;
  is_free: boolean;
  teacher?: {
    profiles?: {
      display_name: string;
    };
  };
  instructor_name?: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuthStore();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            id,
            title,
            description,
            teacher_id,
            duration_hours,
            enrollment_count,
            price,
            currency,
            language,
            difficulty_level,
            thumbnail_url,
            is_free,
            teacher:users!courses_teacher_id_fkey(profiles(display_name))
          `)
          .eq('status', 'published')
          .order('enrollment_count', { ascending: false });

        if (error) throw error;

        const coursesWithInstructor = data.map(course => ({
          ...course,
          instructor_name: course.teacher?.profiles?.display_name || 'Pwofesè anonim'
        }));

        setCourses(coursesWithInstructor);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Pa kapab chaje kou yo. Tanpri eseye ankò.')
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getDifficultyBadge = (level: string) => {
    const classes = {
      beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
      intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
      advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200'
    };
    return classes[level as keyof typeof classes] || classes.beginner;
  };

  const formatPrice = (course: Course) => {
    if (course.is_free) return 'Gratis';
    return `${course.price} ${course.currency}`;
  };

  const getLanguageFlag = (lang: string) => {
    switch (lang) {
      case 'ht-HT': return '🇭🇹';
      case 'fr-FR': return '🇫🇷';
      case 'en-US': return '🇺🇸';
      default: return '🌐';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4 tpn-gradient-text">
            Kou yo / Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dekouvri kou yo ki ka ede ou aprann ak devlope nan domèn diferan yo.
            <br className="hidden sm:block" />
            Discover courses that help you learn and grow in various fields.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {['Tout bagay / All', 'Lang / Language', 'Biznis / Business', 'Teknoloji / Technology', 'Kilti / Culture'].map((filter) => (
              <Button key={filter} variant="outline" size="sm" className="border-border hover:bg-muted/30">
                {filter}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="tpn-card animate-pulse">
                <div className="aspect-video bg-muted rounded-t-xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-muted rounded w-1/4"></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Eseye Ankò / Try Again
            </Button>
          </motion.div>
        )}

        {/* Course Grid */}
        {!loading && !error && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="tpn-card overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      {course.thumbnail_url ? (
                        <img
                          src={course.thumbnail_url}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="mb-3 flex justify-between items-start">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getDifficultyBadge(course.difficulty_level)}`}>
                          {course.difficulty_level === 'beginner' ? 'Kòmansè' : 
                           course.difficulty_level === 'intermediate' ? 'Entèmedyè' : 'Avanse'}
                        </span>
                        <span className="text-lg" aria-hidden="true">
                          {getLanguageFlag(course.language)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                        {course.description}
                      </p>
                      
                      <div className="text-sm text-muted-foreground mb-4">
                        <p>Pwofesè / Instructor: {course.instructor_name}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.duration_hours} èdtan
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {course.enrollment_count}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                          4.8
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                        <span className="text-lg font-bold text-accent">
                          {formatPrice(course)}
                        </span>
                        <Button size="sm" className="tpn-gradient text-primary-foreground">
                          Enskri
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Pa jwenn kou ou vle a? / Don't see the course you want?
          </p>
          <Button variant="outline" className="border-border hover:bg-muted/30">
            Mande yon kou / Request a Course
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CoursesPage;