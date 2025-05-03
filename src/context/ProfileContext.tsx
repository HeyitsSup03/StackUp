import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Match, FilterOptions } from '../types';
import { mockUsers } from '../data/mockUsers';
import { useAuth } from './AuthContext';

interface ProfileContextType {
  profiles: User[];
  matches: Match[];
  filteredProfiles: User[];
  currentProfileIndex: number;
  filters: FilterOptions;
  likeProfile: (profileId: string) => void;
  passProfile: () => void;
  updateFilters: (newFilters: Partial<FilterOptions>) => void;
  sendMessage: (matchId: string, text: string) => void;
  getMessages: (matchId: string) => Match['messages'];
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState<User[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<User[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState<Match[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    skills: [],
    interests: [],
    location: '',
    projectStage: []
  });

  useEffect(() => {
    // Load profiles excluding current user
    if (currentUser) {
      setProfiles(mockUsers.filter(user => user.id !== currentUser.id));
    } else {
      setProfiles(mockUsers);
    }
  }, [currentUser]);

  useEffect(() => {
    // Apply filters
    let result = [...profiles];
    
    if (filters.skills.length > 0) {
      result = result.filter(profile => 
        profile.skills.some(skill => filters.skills.includes(skill))
      );
    }
    
    if (filters.interests.length > 0) {
      result = result.filter(profile => 
        profile.interests.some(interest => filters.interests.includes(interest))
      );
    }
    
    if (filters.location) {
      result = result.filter(profile => 
        profile.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.projectStage.length > 0) {
      result = result.filter(profile => 
        profile.projectIdeas.some(idea => filters.projectStage.includes(idea.stage))
      );
    }
    
    setFilteredProfiles(result);
    setCurrentProfileIndex(0);
  }, [profiles, filters]);

  const likeProfile = (profileId: string) => {
    if (!currentUser) return;
    
    // Check if already matched
    const existingMatch = matches.find(match => 
      match.users.includes(currentUser.id) && match.users.includes(profileId)
    );
    
    if (!existingMatch) {
      // Create a new match
      const newMatch: Match = {
        id: `match_${Date.now()}`,
        users: [currentUser.id, profileId],
        timestamp: Date.now(),
        messages: []
      };
      
      setMatches(prev => [...prev, newMatch]);
    }
    
    // Move to next profile
    setCurrentProfileIndex(prev => 
      prev < filteredProfiles.length - 1 ? prev + 1 : prev
    );
  };

  const passProfile = () => {
    setCurrentProfileIndex(prev => 
      prev < filteredProfiles.length - 1 ? prev + 1 : prev
    );
  };

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const sendMessage = (matchId: string, text: string) => {
    if (!currentUser) return;
    
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: Date.now(),
      read: false
    };
    
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, messages: [...match.messages, newMessage] }
        : match
    ));
  };

  const getMessages = (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    return match ? match.messages : [];
  };

  const value = {
    profiles,
    matches,
    filteredProfiles,
    currentProfileIndex,
    filters,
    likeProfile,
    passProfile,
    updateFilters,
    sendMessage,
    getMessages
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};