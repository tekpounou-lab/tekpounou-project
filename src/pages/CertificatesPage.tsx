// src/pages/CertificatesPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/routes';
import { Award, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const CertificatesPage: React.FC = () => {
  const { user } = useAuthStore();

  const certificates = user
    ? [
        { id: 1, course: 'Kòdman HTML ak CSS', date: 'Jan 15, 2024', url: '#' },
        { id: 2, course: 'Entwodiksyon Javascript', date: 'Mar 3, 2024', url: '#' },
      ]
    : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-8 h-8 text-orange-600" />
        <h1 className="text-3xl font-bold">Sètifika / Certificates</h1>
      </div>

      {!user ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Ou dwe konekte pou wè sètifika ou yo.</p>
          <Link to={ROUTES.login}>
            <Button>Konekte / Sign In</Button>
          </Link>
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg">Ou pa gen ankenn sètifika pou kounya.</p>
          <p className="text-gray-600 mt-2">Kòmanse yon kous pou ou kapab genyen yon sètifika!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="p-6 flex items-start gap-4">
              <FileText className="w-10 h-10 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">{cert.course}</h3>
                <p className="text-gray-600">Oktòye: {cert.date}</p>
                {/* ✅ Use <a> for external links */}
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block"
                >
                  Wè Sètifika
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;