// src/pages/PartnersPage.tsx
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const PartnersPage: React.FC = () => {
  // TODO: Fetch from Supabase when partners table exists
  const partners = [
    { name: 'Haiti Tech Summit', logo: null, description: 'Annual tech conference in Port-au-Prince' },
    { name: 'Digital Haiti Initiative', logo: null, description: 'Non-profit promoting digital literacy' },
    { name: 'Caribbean Developers Network', logo: null, description: 'Regional developer community' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4 tpn-gradient-text">
            Patnè / Partners
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nou travay ansanm ak òganizasyon ki gen menm misyon nou an.
            We collaborate with organizations that share our mission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="tpn-card p-6 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {partner.name}
                </h3>
                <p className="text-muted-foreground">
                  {partner.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PartnersPage;