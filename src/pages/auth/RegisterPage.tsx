import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import MultiSelect from '../../components/common/MultiSelect';

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 
  'UX Design', 'UI Design', 'Product Management', 'Business Development',
  'Marketing', 'Sales', 'Data Science', 'Machine Learning'
];

const interestOptions = [
  'SaaS', 'E-commerce', 'Fintech', 'Healthtech', 'Edtech', 'AI',
  'Mobile Apps', 'Blockchain', 'Sustainability', 'Social Media'
];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: '',
    location: '',
    skills: [] as string[],
    interests: [] as string[],
    lookingFor: [] as string[]
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        ...formData,
        links: {},
        projectIdeas: []
      };
      
      const success = await register(userData);
      if (success) {
        navigate('/browse');
      } else {
        setError('Registration failed. Email might already be in use.');
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="mt-2 text-gray-600">
            Join StackUp to find your perfect co-founder
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <Input
              label="Profile Picture URL"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State/Country"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                placeholder="Tell people about yourself, your background, and what you're looking for"
              />
            </div>
            
            <MultiSelect
              label="Skills"
              options={skillOptions}
              selectedOptions={formData.skills}
              onChange={(selected) => setFormData(prev => ({ ...prev, skills: selected }))}
              placeholder="Select your skills"
            />
            
            <MultiSelect
              label="Interests"
              options={interestOptions}
              selectedOptions={formData.interests}
              onChange={(selected) => setFormData(prev => ({ ...prev, interests: selected }))}
              placeholder="Select your interests"
            />
            
            <MultiSelect
              label="Looking For"
              options={[
                'Technical Co-founder', 'Business Co-founder', 'CTO', 'CEO', 
                'Developer', 'Designer', 'Product Manager', 'Marketing Expert'
              ]}
              selectedOptions={formData.lookingFor}
              onChange={(selected) => setFormData(prev => ({ ...prev, lookingFor: selected }))}
              placeholder="Select what you're looking for"
            />
            
            <Button 
              type="submit" 
              fullWidth 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-black hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;