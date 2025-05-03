import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { User } from '../../types';
import { X, Check } from 'lucide-react';

interface SwipeCardProps {
  profile: User;
  onLike: () => void;
  onPass: () => void;
  className?: string;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  onLike,
  onPass,
  className = ''
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-150, 0, 150], [1, 1, 1]);
  
  const likeOpacity = useTransform(x, [0, 125], [0, 1]);
  const passOpacity = useTransform(x, [-125, 0], [1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      onLike();
    } else if (info.offset.x < -100) {
      onPass();
    }
  };

  return (
    <motion.div
      className={`absolute w-full h-full ${className}`}
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-xl">
        {/* Like/Pass Indicators */}
        <motion.div 
          className="absolute top-8 right-8 z-10 bg-green-500 text-white rounded-full p-2 border-4 border-white transform rotate-12"
          style={{ opacity: likeOpacity }}
        >
          <Check size={40} strokeWidth={3} />
        </motion.div>
        
        <motion.div 
          className="absolute top-8 left-8 z-10 bg-red-500 text-white rounded-full p-2 border-4 border-white transform -rotate-12"
          style={{ opacity: passOpacity }}
        >
          <X size={40} strokeWidth={3} />
        </motion.div>
        
        {/* User Image */}
        <div className="absolute top-0 left-0 right-0 h-2/3">
          <img 
            src={profile.profilePicture}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        </div>
        
        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-sm text-gray-200">{profile.location}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700 line-clamp-3">{profile.bio}</p>
            
            <div className="mt-3">
              <h3 className="text-sm text-gray-500 uppercase">Skills</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {profile.skills.slice(0, 4).map(skill => (
                  <span 
                    key={skill} 
                    className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                    +{profile.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-3">
              <h3 className="text-sm text-gray-500 uppercase">Looking For</h3>
              <div className="flex flex-wrap gap-1 mt-1">
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
            
            {profile.projectIdeas.length > 0 && (
              <div className="mt-3">
                <h3 className="text-sm text-gray-500 uppercase">Project Ideas</h3>
                <div className="mt-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {profile.projectIdeas[0].title}
                    </span>
                    <span className="px-2 py-0.5 bg-black text-white text-xs rounded-full">
                      {profile.projectIdeas[0].stage}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;