// src/pages/dashboard/ClientDashboardPage.tsx
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { TeacherDashboard } from '@/components/dashboard/TeacherDashboard';
import  CommunityDashboard  from '@/components/dashboard/CommunityDashboard';

const ClientDashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <p className="text-lg font-semibold">
            Please log in to view your dashboard.
          </p>
        </div>
      </Layout>
    );
  }

  const renderDashboard = () => {
    switch (user.roles) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'guest':
      case 'sme_client':
        return <CommunityDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user.name ?? user.email}!
        </h1>
        {renderDashboard()}
      </div>
    </Layout>
  );
};

export default ClientDashboardPage;
