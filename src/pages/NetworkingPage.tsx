// src/pages/NetworkingPage.tsx
import React from 'react';
import { Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const NetworkingPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Rezo / Networking
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Konekte ak lòt etidyan, pwofesè, ak antreprenè nan kominote Tek Pou Nou.
            Connect with other students, teachers, and entrepreneurs in the Tek Pou Nou community.
          </p>
          <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Fonksyonalite sa pral disponib bientòt!
            </h2>
            <p className="text-muted-foreground">
              Nou ap travay sou yon sistèm rezo ki pral pèmèt ou:
            </p>
            <ul className="mt-3 space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                Wè pwofil lòt manm yo
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                Anvwaye mesaj prive
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                Rekòmande koneksyon
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NetworkingPage;