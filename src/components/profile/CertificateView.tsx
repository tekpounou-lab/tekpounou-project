import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase";

export interface Certificate {
  id: string;
  course_id: string;
  course_title: string;
  issued_at: string;
  url?: string;
}

export interface CertificateViewProps {
  certificates?: Certificate[];
}

const CertificateView: React.FC<CertificateViewProps> = ({ certificates }) => {
  const { user } = useAuthStore();
  const [userCertificates, setUserCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    if (certificates) {
      // Use provided certificates (from parent) if passed
      setUserCertificates(certificates);
      setLoading(false);
    } else {
      // Otherwise fetch from Supabase
      loadCertificates();
    }
  }, [user, certificates]);

  const loadCertificates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("id, course_id, issued_at, url, course:courses(title)")
        .eq("student_id", user?.id);

      if (error) throw error;

      const formatted: Certificate[] =
        data?.map((c: any) => ({
          id: c.id,
          course_id: c.course_id,
          course_title: c.course?.title || "Unknown Course",
          issued_at: c.issued_at,
          url: c.url,
        })) || [];

      setUserCertificates(formatted);
    } catch (err) {
      console.error("Error loading certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading certificates...</p>;
  }

  if (userCertificates.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No certificates earned yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {userCertificates.map((cert) => (
        <Card key={cert.id} className="p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {cert.course_title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Issued: {new Date(cert.issued_at).toLocaleDateString()}
          </p>
          {cert.url ? (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 dark:text-pink-400 text-sm underline"
            >
              View Certificate
            </a>
          ) : (
            <Badge variant="secondary">No file</Badge>
          )}
        </Card>
      ))}
    </div>
  );
};

export default CertificateView;
