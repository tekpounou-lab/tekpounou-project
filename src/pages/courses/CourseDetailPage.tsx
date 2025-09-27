// src/pages/courses/CourseDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib/supabase';
import { 
  Clock, Users, BookOpen, Play, 
  CheckCircle, Circle, MessageSquare, DollarSign,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { DiscussionBoard } from '@/components/courses/DiscussionBoard';
import { PaymentModal } from '@/components/payments/PaymentModal';
import { usePayments } from '@/hooks/usePayments';
import { formatPrice } from '@/lib/stripe';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  teacher_id: string;
  teacher: {
    id: string;
    profiles: {
      display_name: string;
      avatar_url?: string;
      bio?: string;
    };
  };
  difficulty_level: string;
  language: string;
  duration_hours: number;
  is_free: boolean;
  price?: number;
  currency?: string;
  thumbnail_url?: string;
  modules?: Module[];
}

interface Module {
  id: string;
  title: string;
  description?: string;
  order_index: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  media_url?: string;
  duration_minutes: number;
  order_index: number;
  is_free: boolean;
}

interface Enrollment {
  id: string;
  progress_percentage: number;
  enrolled_at: string;
  completed_at?: string;
}

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { canAccessCourse } = usePayments();

  // Local state
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lessonProgress, setLessonProgress] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'content' | 'discussion'>('content');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCourseDetails();
    }
  }, [id, user]);

  // Fetch course, modules, lessons, and enrollment
  const fetchCourseDetails = async () => {
    try {
      // Fetch course data and teacher profile
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`
          *,
          profiles!inner(display_name, avatar_url, bio)
        `)
        .eq('id', id)
        .single();

      if (courseError) throw courseError;

      // Fetch modules and lessons separately
      const { data: modulesData, error: modulesError } = await supabase
        .from('course_modules')
        .select(`
          *,
          lessons(*)
        `)
        .eq('course_id', id)
        .order('order_index');

      if (modulesError) throw modulesError;

      // Sort lessons within each module
      const modulesWithSortedLessons: Module[] = modulesData.map((module: any) => ({
        ...module,
        lessons: (module.lessons as Lesson[]).sort((a: Lesson, b: Lesson) => a.order_index - b.order_index)
      }));

      // Set course state with modules
      setCourse({
        ...courseData,
        teacher: {
          id: courseData.teacher_id,
          profiles: courseData.profiles
        },
        modules: modulesWithSortedLessons
      });

      // Check enrollment & access
      if (user) {
        const access = await canAccessCourse(id!);
        setHasAccess(access);

        const { data: enrollmentData } = await supabase
          .from('enrollments')
          .select('*')
          .eq('student_id', user.id)
          .eq('course_id', id)
          .single();

        if (enrollmentData) {
          setEnrollment(enrollmentData as Enrollment);
          await fetchLessonProgress();
        }
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonProgress = async () => {
    if (!user || !id) return;

    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('lesson_id')
        .eq('student_id', user.id)
        .not('completed_at', 'is', null);

      if (error) throw error;

      setLessonProgress(new Set(data?.map(p => p.lesson_id) || []));
    } catch (error) {
      console.error('Error fetching lesson progress:', error);
    }
  };

  const handleEnroll = async () => {
    if (!user || !id || !course) return;

    if (!course.is_free && !hasAccess) {
      setShowPaymentModal(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          student_id: user.id,
          course_id: id
        });

      if (error) throw error;

      setEnrollment({
        id: crypto.randomUUID(),
        progress_percentage: 0,
        enrolled_at: new Date().toISOString()
      });
      setHasAccess(true);
      await fetchLessonProgress();
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setHasAccess(true);
    fetchCourseDetails();
  };

  const markLessonComplete = async (lessonId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          student_id: user.id,
          lesson_id: lessonId,
          completed_at: new Date().toISOString()
        });

      if (error) throw error;

      setLessonProgress(prev => new Set([...prev, lessonId]));
      fetchCourseDetails();
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="tpn-card p-6 animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-6"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // Course not found
  if (!course) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/10 mb-4">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Kous sa pa egziste</h2>
            <p className="text-muted-foreground mb-6">
              Nou pa trouve kous sa a. Tounen nan lis kous yo.
            </p>
            <Button 
              onClick={() => navigate('/courses')}
              className="tpn-gradient text-primary-foreground"
            >
              Tounen nan Kous yo
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // Calculate progress
  const totalLessons = course.modules?.reduce((acc: number, module: Module) => acc + module.lessons.length, 0) || 0;
  const completedLessons = course.modules?.reduce((acc: number, module: Module) => {
    return acc + module.lessons.filter(lesson => lessonProgress.has(lesson.id)).length;
  }, 0) || 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Title & Enrolled Badge */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/courses')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/30"
            >
              ← Retounen nan Kous yo
            </Button>
            {enrollment && (
              <Badge variant="success" className="bg-success/10 text-success-foreground border-success/20">
                Enskri / Enrolled
              </Badge>
            )}
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tpn-gradient-text">
            {course.title}
          </h1>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Modules / Lessons / Discussion */}
            <div className="lg:col-span-2">
              <p className="text-muted-foreground mb-6">{course.description}</p>

              {/* Course Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span className="text-foreground">{course.teacher?.profiles?.display_name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span>{course.duration_hours} èdtan</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span>{totalLessons} leson</span>
                </div>
              </div>

              {/* Progress Bar */}
              {enrollment && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">Pwogrè / Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {completedLessons} / {totalLessons} leson
                    </span>
                  </div>
                  <Progress 
                    value={totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0}
                    className="w-full h-2 bg-muted"
                  />
                </div>
              )}

              {/* Tabs */}
              {enrollment && (
                <div className="mb-6">
                  <div className="border-b border-border">
                    <nav className="-mb-px flex space-x-8">
                      <button
                        onClick={() => setActiveTab('content')}
                        className={`
                          py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                          ${activeTab === 'content'
                            ? 'border-accent text-accent'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        <BookOpen className="w-4 h-4 inline mr-2" />
                        Kontni Kous la
                      </button>
                      <button
                        onClick={() => setActiveTab('discussion')}
                        className={`
                          py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                          ${activeTab === 'discussion'
                            ? 'border-accent text-accent'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Diskisyon
                      </button>
                    </nav>
                  </div>
                </div>
              )}

              {/* Modules */}
              {(!enrollment || activeTab === 'content') && course.modules?.map((module: Module, moduleIndex: number) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: moduleIndex * 0.1 }}
                  className="space-y-6 mb-6"
                >
                  <Card className="tpn-card p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {moduleIndex + 1}. {module.title}
                    </h3>

                    {module.description && (
                      <p className="text-muted-foreground mb-4">{module.description}</p>
                    )}

                    {/* Lessons */}
                    <div className="space-y-2">
                      {module.lessons.map((lesson: Lesson, lessonIndex: number) => (
                        <div 
                          key={lesson.id}
                          className={`flex items-center justify-between p-3 rounded-lg border border-border ${
                            selectedLesson?.id === lesson.id
                              ? 'bg-accent/5 border-accent/20'
                              : 'hover:bg-muted/30'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {lessonProgress.has(lesson.id) ? (
                              <CheckCircle className="w-5 h-5 text-success" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground" />
                            )}

                            <div>
                              <div className="font-medium text-foreground">
                                {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {lesson.duration_minutes} min
                                {!lesson.is_free && !enrollment && (
                                  <Badge variant="warning" className="ml-2 bg-warning/10 text-warning-foreground border-warning/20">
                                    Premium
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-x-2">
                            {(lesson.is_free || enrollment) && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-border hover:bg-muted/30"
                                onClick={() => setSelectedLesson(lesson)}
                              >
                                {lesson.media_url ? (
                                  <><Play className="w-4 h-4 mr-1" /> Jouwe</>
                                ) : (
                                  'Li'
                                )}
                              </Button>
                            )}

                            {enrollment && !lessonProgress.has(lesson.id) && (
                              <Button
                                size="sm"
                                className="tpn-gradient text-primary-foreground"
                                onClick={() => markLessonComplete(lesson.id)}
                              >
                                Fini Leson an
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Discussion */}
              {enrollment && activeTab === 'discussion' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Diskisyon Kous la / Course Discussion</h2>
                  <DiscussionBoard courseId={id!} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-4"
              >
                <Card className="tpn-card p-6">
                  {/* Teacher */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Pwofesè / Instructor</h3>
                    <div className="flex items-center space-x-3">
                      {course.teacher?.profiles?.avatar_url && (
                        <img
                          src={course.teacher.profiles.avatar_url}
                          alt={course.teacher?.profiles?.display_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium text-foreground">
                          {course.teacher?.profiles?.display_name}
                        </div>
                        {course.teacher?.profiles?.bio && (
                          <div className="text-sm text-muted-foreground">{course.teacher.profiles.bio}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Enrollment / Purchase */}
                  <div className="mb-6">
                    {!user ? (
                      <Button 
                        className="w-full tpn-gradient text-primary-foreground"
                        onClick={() => navigate('/login')}
                      >
                        Konekte pou Enskri
                      </Button>
                    ) : !enrollment && !hasAccess ? (
                      <div className="space-y-3">
                        {!course.is_free && course.price && (
                          <div className="text-center p-4 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg">
                            <div className="text-2xl font-bold text-foreground">
                              {formatPrice(course.price, course.currency)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Peman yon sèl fwa / One-time payment
                            </div>
                          </div>
                        )}
                        <Button 
                          className="w-full tpn-gradient text-primary-foreground"
                          onClick={handleEnroll}
                        >
                          {course.is_free ? 'Enskri Gratis' : <><DollarSign className="w-4 h-4 mr-2" />Achte Kous la</>}
                        </Button>
                      </div>
                    ) : hasAccess || enrollment ? (
                      <div className="text-center">
                        <Badge variant="success" className="bg-success/10 text-success-foreground border-success/20 mb-2">
                          {enrollment ? 'Enskri' : 'Aksè Otorize'}
                        </Badge>
                        {enrollment && (
                          <div className="text-sm text-muted-foreground">
                            Enskri {new Date(enrollment.enrolled_at).toLocaleDateString('ht-HT')}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>

                  {/* Course Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nivo:</span>
                      <Badge className="bg-muted text-foreground border-border">{course.difficulty_level}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lang:</span>
                      <span className="text-foreground">
                        {course.language === 'ht-HT' ? 'Kreyòl' : course.language === 'fr-FR' ? 'Fransè' : 'Angle'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dire:</span>
                      <span className="text-foreground">{course.duration_hours} èdtan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prix:</span>
                      {course.is_free ? (
                        <Badge variant="success" className="bg-success/10 text-success-foreground border-success/20">Gratis</Badge>
                      ) : (
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{course.price ? formatPrice(course.price, course.currency) : 'Premium'}</div>
                          <div className="text-xs text-muted-foreground">Yon sèl fwa / One-time</div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Selected Lesson Modal */}
        {selectedLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{selectedLesson.title}</h3>
                  <Button variant="outline" className="border-border hover:bg-muted/30" onClick={() => setSelectedLesson(null)}>
                    Fèmen
                  </Button>
                </div>

                {selectedLesson.media_url && (
                  <div className="mb-6">
                    <video src={selectedLesson.media_url} controls className="w-full rounded-lg" />
                  </div>
                )}

                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                  <div dangerouslySetInnerHTML={{ __html: selectedLesson.content || '' }} />
                </div>

                {enrollment && !lessonProgress.has(selectedLesson.id) && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button
                      className="tpn-gradient text-primary-foreground"
                      onClick={() => {
                        markLessonComplete(selectedLesson.id);
                        setSelectedLesson(null);
                      }}
                    >
                      Makònen kòm fini
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && course && !course.is_free && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            course={{
              id: course.id,
              title: course.title,
              price: course.price || 0,
              currency: course.currency || 'USD',
            }}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </Layout>
  );
};

export default CourseDetailPage;
