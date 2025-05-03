import React from 'react';
import { User } from '../../types';
import { ExternalLink, Github, Linkedin, Globe } from 'lucide-react';
import Button from '../common/Button';

interface ProfileCardProps {
  profile: User;
  onLike?: () => void;
  onPass?: () => void;
  showActions?: boolean;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onPass,
  showActions = true,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${className}`}>
      <div className="relative">
        <img 
          src={profile.profilePicture}
          alt={`${profile.name}'s profile`}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-sm opacity-90">{profile.location}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">About</h3>
          <p className="text-gray-700">{profile.bio}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {profile.skills.map(skill => (
              <span 
                key={skill} 
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Interests</h3>
          <div className="flex flex-wrap gap-1">
            {profile.interests.map(interest => (
              <span 
                key={interest} 
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
        
        {profile.projectIdeas.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Project Ideas</h3>
            {profile.projectIdeas.map(project => (
              <div key={project.id} className="bg-gray-50 p-3 rounded-md mb-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{project.title}</h4>
                  <span className="px-2 py-0.5 bg-black text-white text-xs rounded-full">
                    {project.stage}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Looking For</h3>
          <div className="flex flex-wrap gap-1">
            {profile.lookingFor.map(role => (
              <span 
                key={role} 
                className="px-2 py-1 bg-black text-white text-xs rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          {profile.links.github && (
            <a 
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          )}
          {profile.links.linkedin && (
            <a 
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          )}
          {profile.links.portfolio && (
            <a 
              href={profile.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Portfolio"
            >
              <Globe size={20} />
            </a>
          )}
        </div>
        
        {showActions && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onPass}
              fullWidth
              className="transition-transform hover:scale-105"
            >
              Pass
            </Button>
            <Button
              variant="primary"
              onClick={onLike}
              fullWidth
              className="transition-transform hover:scale-105"
            >
              Connect
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;