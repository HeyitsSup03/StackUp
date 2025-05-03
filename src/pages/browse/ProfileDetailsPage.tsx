import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfiles } from '../../context/ProfileContext';
import ProfileCard from '../../components/profile/ProfileCard';
import Button from '../../components/common/Button';
import { ArrowLeft } from 'lucide-react';

const ProfileDetailsPage: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const { profiles, likeProfile } = useProfiles();
  const navigate = useNavigate();
  
  const profile = profiles.find(p => p.id === profileId);
  
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/browse')}>
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
        
        <ProfileCard 
          profile={profile}
          onLike={() => {
            likeProfile(profile.id);
            navigate('/matches');
          }}
          showActions={true}
        />
      </div>
    </div>
  );
};

export default ProfileDetailsPage;