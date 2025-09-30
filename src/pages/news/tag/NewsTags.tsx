// src/pages/news/tag/NewsTag.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, User, Tag as TagIcon } from 'lucide-react';
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

const NewsTagPage: React.FC = () => {
  const router = useRouter();
  const { tag } = router.query;
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tag) return;

    const fetchArticles = async () => {
      setLoading(true);
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
          .contains('tags', [tag])
          .order('published_at', { ascending: false });

        if (error) throw error;

        const formatted = (data || []).map((item: any) => ({
          ...item,
          author: item.profiles?.[0]?.display_name || 'Tek Pou Nou',
        }));

        setArticles(formatted);
      } catch (err) {
        console.error('Error fetching news by tag:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [tag]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4 tpn-gradient-text">
            News Tagged: {tag}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse all news articles related to &quot;{tag}&quot;.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="tpn-card p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-4"></div>
              </Card>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="tpn-card flex flex-col h-full p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1.5" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {formatDate(article.published_at)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {article.tags.slice(0, 3).map(t => (
                      <span
                        key={t}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-muted text-foreground rounded-full"
                      >
                        <TagIcon className="w-3 h-3 mr-1" />
                        {t}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-auto border-border hover:bg-muted/30"
                  >
                    <a href={`/news/${article.slug}`}>Read Article / Li Atik la</a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/10 mb-4">
              <TagIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">
              No articles found for "{tag}"
            </h3>
            <p className="text-muted-foreground">
              Sorry, we could not find any news articles with this tag.
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default NewsTagPage;
