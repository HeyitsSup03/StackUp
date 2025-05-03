import React, { useState } from 'react';
import { User, ProjectIdea } from '../../types';
import Input from '../common/Input';
import MultiSelect from '../common/MultiSelect';
import Button from '../common/Button';
import { Trash2, Plus } from 'lucide-react';

interface ProfileEditorProps {
  profile: User;
  onSave: (updatedProfile: User) => void;
  className?: string;
}

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js',
  'Python', 'Java', 'C#', 'Ruby', 'Go', 'Rust', 'PHP', 'Swift',
  'Kotlin', 'Flutter', 'React Native', 'AWS', 'Azure', 'GCP',
  'Docker', 'Kubernetes', 'CI/CD', 'DevOps', 'Product Management',
  'Business Development', 'Sales', 'Marketing', 'UX Design', 'UI Design',
  'Data Science', 'Machine Learning', 'Blockchain', 'Growth Hacking',
  'Content Creation', 'SEO', 'Market Research', 'Finance', 'Fundraising'
];

const interestOptions = [
  'SaaS', 'E-commerce', 'Fintech', 'Healthtech', 'Edtech', 'AI',
  'Machine Learning', 'Blockchain', 'Cryptocurrency', 'Mobile Apps',
  'Enterprise Software', 'Consumer Apps', 'Marketplace', 'Social Media',
  'Gaming', 'AR/VR', 'IoT', 'Sustainability', 'Clean Tech', 'Travel Tech',
  'Food Tech', 'Real Estate Tech', 'Legal Tech', 'Security', 'B2B', 'B2C',
  'D2C', 'Remote Work', 'Productivity Tools', 'Creator Economy'
];

const projectStages = ['idea', 'prototype', 'mvp', 'growth'];

const ProjectIdeaEditor: React.FC<{
  projectIdea: ProjectIdea;
  onChange: (updated: ProjectIdea) => void;
  onDelete: () => void;
}> = ({ projectIdea, onChange, onDelete }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Project Details</h4>
        <button
          type="button"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <Input
        label="Project Title"
        value={projectIdea.title}
        onChange={(e) => onChange({ ...projectIdea, title: e.target.value })}
        required
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={projectIdea.description}
          onChange={(e) => onChange({ ...projectIdea, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
          rows={3}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Stage
        </label>
        <select
          value={projectIdea.stage}
          onChange={(e) => onChange({
            ...projectIdea,
            stage: e.target.value as 'idea' | 'prototype' | 'mvp' | 'growth'
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
        >
          {projectStages.map(stage => (
            <option key={stage} value={stage}>
              {stage.charAt(0).toUpperCase() + stage.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <MultiSelect
        label="Tags"
        options={[...interestOptions, ...skillOptions]}
        selectedOptions={projectIdea.tags}
        onChange={(selected) => onChange({ ...projectIdea, tags: selected })}
        placeholder="Select tags for your project"
      />
    </div>
  );
};

const ProfileEditor: React.FC<ProfileEditorProps> = ({
  profile,
  onSave,
  className = ''
}) => {
  const [formData, setFormData] = useState<User>({ ...profile });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, bio: e.target.value }));
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      links: { ...prev.links, [name]: value }
    }));
  };

  const handleProjectChange = (index: number, updated: ProjectIdea) => {
    const newProjects = [...formData.projectIdeas];
    newProjects[index] = updated;
    setFormData(prev => ({ ...prev, projectIdeas: newProjects }));
  };

  const handleProjectDelete = (index: number) => {
    const newProjects = formData.projectIdeas.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, projectIdeas: newProjects }));
  };

  const handleAddProject = () => {
    const newProject: ProjectIdea = {
      id: `project_${Date.now()}`,
      title: '',
      description: '',
      stage: 'idea',
      tags: []
    };
    
    setFormData(prev => ({
      ...prev,
      projectIdeas: [...prev.projectIdeas, newProject]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <Input
        label="Profile Picture URL"
        name="profilePicture"
        value={formData.profilePicture}
        onChange={handleInputChange}
        placeholder="https://example.com/image.jpg"
      />
      
      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        placeholder="City, State/Country"
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={handleBioChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
          rows={4}
          placeholder="Tell people about yourself, your background, and what you're looking for"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LinkedIn"
            name="linkedin"
            value={formData.links.linkedin || ''}
            onChange={handleLinkChange}
            placeholder="https://linkedin.com/in/username"
          />
          <Input
            label="GitHub"
            name="github"
            value={formData.links.github || ''}
            onChange={handleLinkChange}
            placeholder="https://github.com/username"
          />
          <Input
            label="Portfolio/Website"
            name="portfolio"
            value={formData.links.portfolio || ''}
            onChange={handleLinkChange}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Skills & Interests</h3>
        <MultiSelect
          label="Skills"
          options={skillOptions}
          selectedOptions={formData.skills}
          onChange={(selected) => setFormData(prev => ({ ...prev, skills: selected }))}
          className="mb-4"
        />
        
        <MultiSelect
          label="Interests"
          options={interestOptions}
          selectedOptions={formData.interests}
          onChange={(selected) => setFormData(prev => ({ ...prev, interests: selected }))}
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">What I'm Looking For</h3>
        <MultiSelect
          options={[
            'Technical Co-founder', 'Business Co-founder', 'CTO', 'CEO', 
            'Frontend Developer', 'Backend Developer', 'Full-stack Developer',
            'Mobile Developer', 'UX Designer', 'UI Designer', 'Product Manager',
            'Marketing Expert', 'Sales Expert', 'Business Development',
            'Financial Advisor', 'Mentor', 'Investor', 'Advisor'
          ]}
          selectedOptions={formData.lookingFor}
          onChange={(selected) => setFormData(prev => ({ ...prev, lookingFor: selected }))}
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Project Ideas</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddProject}
            className="flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Project
          </Button>
        </div>
        
        {formData.projectIdeas.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-md">
            <p className="text-gray-500">No projects added yet. Add a project to showcase your ideas.</p>
          </div>
        ) : (
          formData.projectIdeas.map((project, index) => (
            <ProjectIdeaEditor
              key={project.id}
              projectIdea={project}
              onChange={(updated) => handleProjectChange(index, updated)}
              onDelete={() => handleProjectDelete(index)}
            />
          ))
        )}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Save Profile
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditor;