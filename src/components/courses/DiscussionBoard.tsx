import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MessageSquare } from 'lucide-react';

interface DiscussionMessage {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  profiles: {
    display_name: string;
    avatar?: string;
  } | null; // 👈 normalized to a single object
}

interface DiscussionBoardProps {
  courseId: string;
}

export const DiscussionBoard: React.FC<DiscussionBoardProps> = ({ courseId }) => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchMessages();
    }
  }, [courseId]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('course_discussions')
        .select(`
          id,
          content,
          created_at,
          author_id,
          profiles(display_name, avatar)
        `)
        .eq('course_id', courseId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // 🔥 Normalize profiles from array → object
      const normalized = (data || []).map((d: any) => ({
        ...d,
        profiles: d.profiles?.[0] || null,
      }));

      setMessages(normalized as DiscussionMessage[]);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handlePostMessage = async () => {
    if (!user || !newMessage.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('course_discussions').insert({
        course_id: courseId,
        author_id: user.id,
        content: newMessage.trim(),
      });

      if (error) throw error;

      setNewMessage('');
      fetchMessages(); // Refresh messages
    } catch (err) {
      console.error('Error posting message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Post new message */}
      {user ? (
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Input
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={loading}
              className="flex-grow"
            />
            <Button onClick={handlePostMessage} disabled={loading || !newMessage.trim()}>
              Post
            </Button>
          </div>
        </Card>
      ) : (
        <p className="text-gray-500">Login to join the discussion.</p>
      )}

      {/* Messages */}
      <div className="space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">No messages yet. Be the first to post!</p>
        )}

        {messages.map((msg) => (
          <Card key={msg.id} className="p-4">
            <div className="flex items-start space-x-3">
              {msg.profiles?.avatar ? (
                <img
                  src={msg.profiles.avatar}
                  alt={msg.profiles.display_name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{msg.profiles?.display_name || 'Unknown'}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{msg.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
