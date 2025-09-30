// src/pages/NewsPage.tsx
import React, { useEffect, useState } from 'react';
import { Calendar, User, Tag, Globe } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/utils';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  tags: string[];
  language: string;
  slug: string;
}

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select(`
            id,
            title,
            excerpt,
            published_at,
            tags,
            language,
            slug,
            profiles!inner(display_name)
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) throw error;

        const formattedArticles = (data || []).map(article => ({
          ...article,
          author: article.profiles?.[0]?.display_name || 'Tek Pou Nou',
          published_at: article.published_at,
        }));

        setArticles(formattedArticles);
      } catch (err) {
        console.error('Error fetching news articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
            News / Nouvèl
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news affecting education, technology, and culture.
            <br />
            Rete enfòme sou dènye nouvèl ki gen rapò ak edikasyon, teknoloji, ak kilti.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="tpn-card flex flex-col h-full">
                <div className="h-40 bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="space-y-3 mt-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map(tag => (
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
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {formatDate(article.published_at)}
                      </div>
                    </div>

                    <a href={`/news/${article.slug}`} className="w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-border hover:bg-muted/30"
                      >
                        Li atik la / Read Article
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {!loading && articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/10 mb-4">
              <Globe className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">
              Pa gen nouvèl pou kounya
            </h3>
            <p className="text-muted-foreground">
              Nou ap travay sou nouvo nouvèl yo. Tounen pi ta!
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default NewsPage;
