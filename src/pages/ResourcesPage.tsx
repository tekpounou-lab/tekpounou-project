// src/pages/ResourcesPage.tsx
import React from 'react';
import { Card } from '@/components/ui/Card';
import { FolderOpen, BookOpen, Video } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const resources = [
  {
    title: 'Gid Pwogrammi nan Kreyòl',
    description: 'Tout bagay ou bezwen konnen pou kòmanse pwogrammi nan lang Kreyòl.',
    type: 'guide',
    icon: BookOpen,
  },
  {
    title: 'Video Tutorial yo',
    description: 'Atelye pratik sou devlopman wèb, mobil, ak AI.',
    type: 'video',
    icon: Video,
  },
  {
    title: 'Resous pou Biznis',
    description: 'Gab pou kreye plan biznis, jere finans, ak vann sou entènèt.',
    type: 'business',
    icon: FolderOpen,
  },
];

const ResourcesPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4 tpn-gradient-text">
            Resous / Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resous pou ede w aprann, devlope, ak grandi.
            Resources to help you learn, develop, and grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="tpn-card p-6">
                  <div className="w-12 h-12 rounded-lg bg-muted/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <button className="text-accent hover:text-accent/80 font-medium text-sm">
                    Eksplore Resous yo →
                  </button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;