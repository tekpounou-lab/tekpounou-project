// src/pages/CommunityPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Users, MessageCircle, Calendar } from 'lucide-react';

const CommunityPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Kominote / Community</h1>
      <p className="text-lg text-gray-600 mb-8">
        Rankontre ak lòt etidyan, pwofesè, ak kontribitè TekPouNou.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Gròp yo / Groups</h2>
          <p className="text-gray-600 mb-4">Reyoni pa enterè oswa kous</p>
          <Link to={ROUTES.groups}>
            <Button size="sm">Gade Gròp yo</Button>
          </Link>
        </Card>

        <Card className="p-6 text-center">
          <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Diskisyon / Discussions</h2>
          <p className="text-gray-600 mb-4">Pote kesyon ak pataje ide</p>
          <Link to={ROUTES.courses}>
            <Button size="sm">Ale nan Kous yo</Button>
          </Link>
        </Card>

        <Card className="p-6 text-center">
          <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Evènman / Events</h2>
          <p className="text-gray-600 mb-4">Reyonyon, atelye, ak webinè</p>
          <Link to={ROUTES.events}>
            <Button size="sm">Gade Evènman yo</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default CommunityPage;