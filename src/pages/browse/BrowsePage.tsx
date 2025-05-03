import React, { useState } from 'react';
import { useProfiles } from '../../context/ProfileContext';
import SwipeCard from '../../components/browse/SwipeCard';
import FilterPanel from '../../components/browse/FilterPanel';
import { User } from '../../types';
import { AnimatePresence } from 'framer-motion';

const BrowsePage: React.FC = () => {
  const {
    filteredProfiles,
    currentProfileIndex,
    filters,
    likeProfile,
    passProfile,
    updateFilters
  } = useProfiles();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Browse Co-founders</h1>
          <FilterPanel
            filters={filters}
            onUpdateFilters={updateFilters}
          />
        </div>
        
        <div className="w-full h-[70vh] relative">
          {filteredProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-8 text-center shadow-md">
              <h2 className="text-xl font-semibold mb-2">No matches found</h2>
              <p className="text-gray-600">
                Try adjusting your filters to see more potential co-founders.
              </p>
            </div>
          ) : currentProfileIndex >= filteredProfiles.length ? (
            <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-8 text-center shadow-md">
              <h2 className="text-xl font-semibold mb-2">No more profiles</h2>
              <p className="text-gray-600">
                You've seen all potential co-founders matching your criteria.
                Check back later for new profiles!
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredProfiles.slice(currentProfileIndex, currentProfileIndex + 3).map((profile, index) => (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  onLike={() => likeProfile(profile.id)}
                  onPass={passProfile}
                  className={index === 0 ? 'z-30' : index === 1 ? 'z-20 scale-[0.98] opacity-60' : 'z-10 scale-[0.96] opacity-30'}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
        
        {filteredProfiles.length > 0 && currentProfileIndex < filteredProfiles.length && (
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={passProfile}
              className="w-16 h-16 flex items-center justify-center bg-white text-red-500 rounded-full shadow-md transition-transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <button
              onClick={() => likeProfile(filteredProfiles[currentProfileIndex].id)}
              className="w-16 h-16 flex items-center justify-center bg-black text-white rounded-full shadow-md transition-transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;