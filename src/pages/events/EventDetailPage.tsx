// src/pages/events/EventDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { Calendar, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  location?: string;
  cover_image?: string;
  is_public: boolean;
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from<Event>("events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setEvent(data);
      } catch (err: any) {
        console.error("Error fetching event:", err);
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleJoinEvent = async () => {
    if (!user || !event) return;

    try {
      const { error } = await supabase.from("event_attendees").insert([
        {
          user_id: user.id,
          event_id: event.id,
        },
      ]);

      if (error) throw error;
      alert("Successfully joined the event!");
    } catch (err: any) {
      console.error("Failed to join event:", err);
      alert("Failed to join the event.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8 text-center">Loading event...</div>
      </Layout>
    );
  }

  if (error || !event) {
    return (
      <Layout>
        <div className="p-8 text-center text-red-500">
          {error || "Event not found."}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold tpn-gradient-text">{event.title}</h1>
          <p className="text-muted-foreground mt-2">
            {event.is_public ? "Piblik" : "Prive"}
          </p>
        </motion.div>

        <Card className="overflow-hidden mb-6">
          <div className="h-60 bg-gradient-to-br from-muted/30 to-muted/10 relative">
            {event.cover_image ? (
              <img
                src={event.cover_image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Calendar className="w-16 h-16 text-muted-foreground/50" />
              </div>
            )}
          </div>
          <div className="p-6">
            <p className="text-muted-foreground mb-4">{event.description}</p>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleString()}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
            {user && (
              <button
                onClick={handleJoinEvent}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Join Event
              </button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default EventDetailPage;
