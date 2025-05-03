import React, { useState } from 'react';
import { FilterOptions } from '../../types';
import MultiSelect from '../common/MultiSelect';
import Input from '../common/Input';
import Button from '../common/Button';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterOptions;
  onUpdateFilters: (filters: FilterOptions) => void;
  className?: string;
}

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js',
  'Python', 'Java', 'C#', 'Ruby', 'Go', 'Rust', 'PHP', 'Swift',
  'Kotlin', 'Flutter', 'React Native', 'AWS', 'Azure', 'GCP',
  'Docker', 'Kubernetes', 'CI/CD', 'DevOps', 'Product Management',
  'Business Development', 'Sales', 'Marketing', 'UX Design', 'UI Design',
  'Data Science', 'Machine Learning', 'Blockchain', 'Growth Hacking'
];

const interestOptions = [
  'SaaS', 'E-commerce', 'Fintech', 'Healthtech', 'Edtech', 'AI',
  'Machine Learning', 'Blockchain', 'Cryptocurrency', 'Mobile Apps',
  'Enterprise Software', 'Consumer Apps', 'Marketplace', 'Social Media',
  'Gaming', 'AR/VR', 'IoT', 'Sustainability', 'Clean Tech', 'Travel Tech'
];

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onUpdateFilters,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  const handleApplyFilters = () => {
    onUpdateFilters(localFilters);
    setIsOpen(false);
  };
  
  const handleClearFilters = () => {
    const emptyFilters: FilterOptions = {
      skills: [],
      interests: [],
      location: '',
      projectStage: []
    };
    setLocalFilters(emptyFilters);
    onUpdateFilters(emptyFilters);
    setIsOpen(false);
  };
  
  const getTotalActiveFilters = () => {
    return (
      filters.skills.length +
      filters.interests.length +
      (filters.location ? 1 : 0) +
      filters.projectStage.length
    );
  };
  
  return (
    <div className={`${className}`}>
      <button
        onClick={toggleOpen}
        className={`flex items-center px-4 py-2 border ${
          getTotalActiveFilters() > 0
            ? 'border-black bg-black text-white'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        } rounded-md transition-colors`}
      >
        <Filter size={18} className="mr-2" />
        <span>Filters</span>
        {getTotalActiveFilters() > 0 && (
          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
            getTotalActiveFilters() > 0
              ? 'bg-white text-black'
              : 'bg-gray-200 text-gray-700'
          }`}>
            {getTotalActiveFilters()}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end" onClick={() => setIsOpen(false)}>
          <div 
            className="bg-white h-full w-full md:w-96 overflow-auto p-6 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Skills</h3>
                <MultiSelect
                  options={skillOptions}
                  selectedOptions={localFilters.skills}
                  onChange={(selected) => setLocalFilters(prev => ({ ...prev, skills: selected }))}
                  placeholder="Select skills"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Interests</h3>
                <MultiSelect
                  options={interestOptions}
                  selectedOptions={localFilters.interests}
                  onChange={(selected) => setLocalFilters(prev => ({ ...prev, interests: selected }))}
                  placeholder="Select interests"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Location</h3>
                <Input
                  value={localFilters.location}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State/Country"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Project Stage</h3>
                <div className="flex flex-wrap gap-2">
                  {['idea', 'prototype', 'mvp', 'growth'].map(stage => (
                    <button
                      key={stage}
                      type="button"
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        localFilters.projectStage.includes(stage)
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        setLocalFilters(prev => {
                          if (prev.projectStage.includes(stage)) {
                            return {
                              ...prev,
                              projectStage: prev.projectStage.filter(s => s !== stage)
                            };
                          } else {
                            return {
                              ...prev,
                              projectStage: [...prev.projectStage, stage]
                            };
                          }
                        });
                      }}
                    >
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                onClick={handleApplyFilters}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;