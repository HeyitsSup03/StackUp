import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ProfileCard from '../../components/profile/ProfileCard';
import ProfileEditor from '../../components/profile/ProfileEditor';
import Button from '../../components/common/Button';
import { Edit, CheckSquare } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  const handleSaveProfile = (updatedProfile: any) => {
    // In a real app, this would update the user profile in the database
    console.log('Profile updated:', updatedProfile);
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <Button
            variant={isEditing ? 'primary' : 'outline'}
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center"
          >
            {isEditing ? (
              <>
                <CheckSquare size={18} className="mr-2" />
                Finish Editing
              </>
            ) : (
              <>
                <Edit size={18} className="mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
        
        {isEditing ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ProfileEditor
              profile={currentUser}
              onSave={handleSaveProfile}
            />
          </div>
        ) : (
          <ProfileCard
            profile={currentUser}
            showActions={false}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;