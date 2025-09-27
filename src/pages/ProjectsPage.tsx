// src/pages/ProjectsPage.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { Briefcase } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  completion_percentage: number;
  budget: number;
  profiles: {
    display_name: string;
  };
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles!inner(display_name)
        `)
        .eq('status', 'completed');

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
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
            Pwojè / Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wè travay ki fini ak siksè nan kominote Tek Pou Nou.
            See successfully completed work in the Tek Pou Nou community.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="tpn-card p-6 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="tpn-card p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center mr-3">
                      <Briefcase className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        pa {project.profiles?.display_name}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">
                      ${project.budget} USD
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {project.completion_percentage}% fini
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectsPage;