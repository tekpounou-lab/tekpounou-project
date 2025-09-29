// src/pages/ServicesPage.tsx
import React, { useEffect, useState } from 'react';
import { MapPin, Clock, DollarSign, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

// Extend the base Service type with UI-only fields
interface ServiceWithUI extends Service {
  title: string;
  service_type: string;
  providerName: string; // ✅ safe string, instead of overwriting Profile
  location: string;
  timeline_days: number;
  rating: number;
  reviews: number;
  price_range: string;
}

const ServicesPage: React.FC = () => {
  const [featuredServices, setFeaturedServices] = useState<ServiceWithUI[]>([]);
  const [regularServices, setRegularServices] = useState<ServiceWithUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select(`
            id,
            name,
            description,
            category,
            price_range,
            status,
            created_by,
            is_featured,
            profiles!inner(display_name, avatar_url)
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const transformedServices: ServiceWithUI[] = (data || []).map((service: any) => ({
          ...service,
          title: service.name,
          service_type: service.category,
          providerName:
            Array.isArray(service.profiles) && service.profiles.length > 0
              ? service.profiles[0].display_name
              : 'Unknown Provider',
          location: 'Haiti',
          timeline_days: 14,
          rating: 4.8,
          reviews: Math.floor(Math.random() * 50) + 10,
          price_range: service.price_range ?? 'N/A',
        }));

        setFeaturedServices(transformedServices.filter((s) => s.is_featured));
        setRegularServices(transformedServices.filter((s) => !s.is_featured));
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="tpn-animate-bounce">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4 tpn-gradient text-primary-foreground"
            >
              Retry
            </Button>
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
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sèvis yo / Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jwenn sèvis ak ekspètiz ou bezwen yo nan kominote a.
            Find the services and expertise you need in the community.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="ghost" size="sm" className="border-border hover:bg-muted/30">
              Tout sèvis / All Services
            </Button>
            <Button variant="ghost" size="sm" className="border-border hover:bg-muted/30">
              Devlopman / Development
            </Button>
            <Button variant="ghost" size="sm" className="border-border hover:bg-muted/30">
              Konsèy / Consulting
            </Button>
            <Button variant="ghost" size="sm" className="border-border hover:bg-muted/30">
              Fòmasyon / Training
            </Button>
            <Button variant="ghost" size="sm" className="border-border hover:bg-muted/30">
              Depo / Design
            </Button>
            <Button variant="ghost" size="sm" className="border-border hover:bg-muted/30">
              Maketing / Marketing
            </Button>
          </div>
        </div>

        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Sèvis ki Rekomande yo / Featured Services
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredServices.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -5 }}
                  className="tpn-card overflow-hidden"
                >
                  <div className="p-6">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded">
                          Featured
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                          <span className="text-sm font-medium">{service.rating}</span>
                          <span className="text-sm text-muted-foreground ml-1">
                            ({service.reviews})
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground mb-4">{service.description}</p>

                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {service.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {service.timeline_days} jou / days
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {service.price_range}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button size="sm" className="flex-1 tpn-gradient text-primary-foreground">
                        Kontakt Founisè a
                      </Button>
                      <Button variant="outline" size="sm" className="border-border text-foreground">
                        Wè Detay yo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {regularServices.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -3 }}
              className="tpn-card flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      {service.service_type}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="space-y-1 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {service.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.timeline_days} jou
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-accent">{service.price_range}</span>
                    <span className="text-sm text-muted-foreground">{service.reviews} reyèy</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 tpn-gradient text-primary-foreground">
                      Kontakt
                    </Button>
                    <Button variant="outline" size="sm" className="border-border text-foreground">
                      Detay
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 p-8 bg-gradient-to-br from-muted/30 to-transparent rounded-xl border border-border/30"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Ou gen yon sèvis pou ou ofri? / Do you have a service to offer?
          </h3>
          <p className="text-muted-foreground mb-6">
            Kominote a bezwen ekspètiz ou an. Kominote ak nou pou nou ka ede moun yo.
            The community needs your expertise. Join us to help others.
          </p>
          <Button className="tpn-gradient text-primary-foreground">
            <Sparkles className="w-4 h-4 mr-2" />
            Ajoute Sèvis ou an
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
