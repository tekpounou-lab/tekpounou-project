// src/pages/news/[slug].tsx
import React, { useEffect, useState } from 'react';
import { Calendar, User, Tag, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/utils';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  published_at: string;
  tags: string[];
  language: string;
  slug: string;
}

const NewsArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select(`
            id,
            title,
            content,
            excerpt,
            published_at,
            tags,
            language,
            slug,
            profiles!inner(display_name)
          `)
          .eq('slug', slug)
          .single();

        if (error) throw error;

        const formattedArticle: NewsArticle = {
          ...data,
          author: data.profiles?.[0]?.display_name || 'Tek Pou Nou',
          content: data.content || '',
          published_at: data.published_at,
        };

        setArticle(formattedArticle);

        // Fetch related articles based on first tag
        if (formattedArticle.tags.length > 0) {
          const { data: relatedData } = await supabase
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
            .contains('tags', [formattedArticle.tags[0]])
            .neq('slug', slug)
            .order('published_at', { ascending: false })
            .limit(3);

          setRelatedArticles(
            (relatedData || []).map((item: any) => ({
              ...item,
              author: item.profiles?.[0]?.display_name || 'Tek Pou Nou',
              published_at: item.published_at,
            }))
          );
        }
      } catch (err) {
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading || !article) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="tpn-card p-6 animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-80 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {article.title}
          </h1>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1.5" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              {formatDate(article.published_at)}
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1.5" />
              {article.language}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-muted text-foreground rounded-full"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose dark:prose-invert max-w-full mb-12"
        >
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </motion.div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related Articles / Atik Ki Gen Rapò
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map(rel => (
                <Card key={rel.id} className="tpn-card p-4 flex flex-col">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {rel.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1.5" />
                      {rel.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {formatDate(rel.published_at)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-auto border-border hover:bg-muted/30"
                  >
                    <a href={`/news/${rel.slug}`}>Read Article / Li Atik la</a>
                  </Button>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default NewsArticlePage;
