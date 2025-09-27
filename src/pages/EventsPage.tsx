// src/pages/EventsPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { CalendarDays, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  is_virtual: boolean;
  link_url?: string;
  cover_image?: string;
  max_participants: number;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
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
            Aktivite / Events
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Patisipe nan atelye, webinar, ak reyonyon kominote yo.
            Join workshops, webinars, and community meetups.
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="tpn-card p-6 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="tpn-card p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">
                          {format(new Date(event.start_date), 'dd')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(event.start_date), 'MMM yyyy')}
                        </div>
                        <div className="mt-2 flex items-center justify-center text-xs text-muted-foreground">
                          <CalendarDays className="w-3 h-3 mr-1" />
                          {format(new Date(event.start_date), 'HH:mm')}
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.is_virtual ? 'Vityèl / Virtual' : event.location}
                      </div>
                      <Link to={`/events/${event.id}`}>
                        <button className="tpn-gradient text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                          Inskri / Register
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {events.length === 0 && !loading && (
          <div className="text-center py-12">
            <CalendarDays className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              Pa gen aktivite pou kounya
            </h3>
            <p className="text-muted-foreground">
              Nou ap planifye nouvo aktivite yo. Tounen pi ta!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventsPage;