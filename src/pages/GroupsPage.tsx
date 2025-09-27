// src/pages/GroupsPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

interface Group {
  id: string;
  name: string;
  description: string;
  member_count: number;
  cover_image?: string;
  is_public: boolean;
}

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('is_public', true)
        .order('member_count', { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (err) {
      console.error('Error fetching groups:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4 tpn-gradient-text">
            Gwoup / Groups
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rejwenn ak lòt moun ki gen menm enterè ou yo nan kominote Tek Pou Nou.
            Connect with others who share your interests in the Tek Pou Nou community.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="tpn-card p-6 animate-pulse">
                <div className="h-40 bg-muted rounded mb-4"></div>
                <div className="h-6 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="tpn-card overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-muted/30 to-muted/10 relative">
                    {group.cover_image ? (
                      <img 
                        src={group.cover_image} 
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-12 h-12 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {group.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {group.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{group.member_count} manm</span>
                      <span>{group.is_public ? 'Piblik' : 'Prive'}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {groups.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              Pa gen gwoup pou kounya
            </h3>
            <p className="text-muted-foreground">
              Kòmanse yon gwoup pou pataje enterè ou yo ak kominote a!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GroupsPage;