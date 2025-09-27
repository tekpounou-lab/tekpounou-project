// src/pages/BlogPage.tsx
import React, { useEffect, useState } from 'react';
import { Calendar, User, Tag, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/utils';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  is_featured: boolean;
  tags: string[];
  language: string;
  slug: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [regularPosts, setRegularPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            excerpt,
            published_at,
            is_featured,
            tags,
            language,
            slug,
            profiles!inner(display_name)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) throw error;

        const formattedPosts = (data || []).map(post => ({
          ...post,
          author: post.profiles?.display_name || 'Tek Pou Nou',
          published_at: post.published_at,
        }));

        setPosts(formattedPosts);
        setFeaturedPost(formattedPosts.find(p => p.is_featured) || null);
        setRegularPosts(formattedPosts.filter(p => !p.is_featured));
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="tpn-card p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-4"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

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
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Li dènye nouvèl yo ak atik yo ki konsènen edikasyon ak devlopman.
            <br />
            Read the latest news and articles about education and development.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card className="tpn-card overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-48 md:h-full tpn-gradient flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full mb-3">
                        Featured / Popiyè
                      </span>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {featuredPost.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1.5" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1.5" />
                          {formatDate(featuredPost.published_at)}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="tpn-gradient text-primary-foreground hover:shadow-md"
                        asChild
                      >
                        <a href={`/blog/${featuredPost.slug}`}>
                          Li plis / Read More
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="tpn-card flex flex-col h-full">
                <div className="h-40 bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-muted text-foreground rounded-full"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1.5" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {formatDate(post.published_at)}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-border hover:bg-muted/30"
                      asChild
                    >
                      <a href={`/blog/${post.slug}`}>
                        Li atik la / Read Article
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {regularPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="outline" className="border-border hover:bg-muted/30">
              Chaje plis atik / Load More Articles
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!featuredPost && regularPosts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/10 mb-4">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">
              Pa gen atik pou kounya
            </h3>
            <p className="text-muted-foreground">
              Nou ap travay sou nouvo atik yo. Tounen pi ta!
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;