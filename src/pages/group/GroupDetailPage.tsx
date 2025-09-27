// src/pages/group/GroupDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/Card";
import { Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

interface Group {
  id: string;
  name: string;
  description: string;
  member_count: number;
  cover_image?: string;
  is_public: boolean;
}

const GroupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from<Group, Group>("groups") // ✅ Added second type argument
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setGroup(data);
      } catch (err: any) {
        console.error("Error fetching group:", err);
        setError("Failed to load group.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  const handleJoinGroup = async () => {
    if (!user || !group) return;

    try {
      const { error } = await supabase.from("group_members").insert([
        {
          user_id: user.id,
          group_id: group.id,
        },
      ]);

      if (error) throw error;
      alert("Successfully joined the group!");
      setGroup({ ...group, member_count: group.member_count + 1 });
    } catch (err: any) {
      console.error("Failed to join group:", err);
      alert("Failed to join the group.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <p>Loading group...</p>
        </div>
      </Layout>
    );
  }

  if (error || !group) {
    return (
      <Layout>
        <div className="p-8 text-center text-red-500">
          <p>{error || "Group not found."}</p>
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
          <h1 className="text-4xl font-bold tpn-gradient-text">{group.name}</h1>
          <p className="text-muted-foreground mt-2">
            {group.is_public ? "Piblik" : "Prive"}
          </p>
        </motion.div>

        <Card className="overflow-hidden mb-6">
          <div className="h-60 bg-gradient-to-br from-muted/30 to-muted/10 relative">
            {group.cover_image ? (
              <img
                src={group.cover_image}
                alt={group.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Users className="w-16 h-16 text-muted-foreground/50" />
              </div>
            )}
          </div>
          <div className="p-6">
            <p className="text-muted-foreground mb-4">{group.description}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>{group.member_count} manm</span>
            </div>
            {user && (
              <button
                onClick={handleJoinGroup}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Join Group
              </button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default GroupDetailPage;
