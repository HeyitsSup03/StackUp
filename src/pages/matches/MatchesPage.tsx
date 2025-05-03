import React from 'react';
import { Link } from 'react-router-dom';
import { useProfiles } from '../../context/ProfileContext';
import ProfileCard from '../../components/profile/ProfileCard';
import Button from '../../components/common/Button';
import { MessageSquare } from 'lucide-react';

const MatchesPage: React.FC = () => {
  const { matches, profiles } = useProfiles();
  
  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No matches yet</h2>
            <p className="text-gray-600 mb-6">
              Start browsing to find and match with potential co-founders.
            </p>
            <Link to="/browse">
              <Button>Browse Co-founders</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map(match => {
            // For each match, find the other user (not the current user)
            const otherUserId = match.users[0]; // Simplified for example
            const otherUser = profiles.find(p => p.id === otherUserId);
            
            if (!otherUser) return null;
            
            return (
              <div key={match.id} className="relative">
                <ProfileCard
                  profile={otherUser}
                  showActions={false}
                />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <Link to={`/profile/${otherUser.id}`} className="block flex-1">
                    <Button variant="outline" fullWidth>
                      View Profile
                    </Button>
                  </Link>
                  <Link to={`/messages/${match.id}`} className="block flex-1">
                    <Button fullWidth className="flex items-center justify-center">
                      <MessageSquare size={16} className="mr-2" />
                      Message
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;