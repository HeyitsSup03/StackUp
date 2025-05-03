import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Full-stack developer with 5 years of experience. Looking for a technical co-founder for my SaaS idea.',
    skills: ['JavaScript', 'React', 'Node.js', 'AWS'],
    interests: ['SaaS', 'B2B', 'Productivity Tools'],
    links: {
      linkedin: 'https://linkedin.com/in/alexjohnson',
      github: 'https://github.com/alexj',
      portfolio: 'https://alexjohnson.dev'
    },
    location: 'San Francisco, CA',
    projectIdeas: [
      {
        id: '101',
        title: 'AI-Powered Task Manager',
        description: 'A task management tool that uses AI to prioritize and suggest the best times to complete tasks.',
        stage: 'prototype',
        tags: ['AI', 'Productivity', 'SaaS']
      }
    ],
    lookingFor: ['Technical Co-founder', 'UX Designer']
  },
  {
    id: '2',
    name: 'Sophia Chen',
    email: 'sophia@example.com',
    password: 'password123',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Product manager with experience at Google and Airbnb. Looking for a technical co-founder to build a travel tech platform.',
    skills: ['Product Management', 'Market Research', 'UX Design', 'Growth Strategy'],
    interests: ['Travel Tech', 'Marketplace', 'Mobile Apps'],
    links: {
      linkedin: 'https://linkedin.com/in/sophiachen',
      github: 'https://github.com/sophiac',
    },
    location: 'New York, NY',
    projectIdeas: [
      {
        id: '102',
        title: 'Local Experience Marketplace',
        description: 'A platform connecting travelers with local guides for authentic experiences.',
        stage: 'idea',
        tags: ['Travel', 'Marketplace', 'Mobile']
      }
    ],
    lookingFor: ['Technical Co-founder', 'Mobile Developer']
  },
  {
    id: '3',
    name: 'Marcus Williams',
    email: 'marcus@example.com',
    password: 'password123',
    profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'UX/UI designer with a passion for creating intuitive digital experiences. Seeking a technical partner for a health tech venture.',
    skills: ['UX Design', 'UI Design', 'Figma', 'User Research'],
    interests: ['Health Tech', 'Mobile Apps', 'Wearables'],
    links: {
      linkedin: 'https://linkedin.com/in/marcuswilliams',
      portfolio: 'https://marcusdesigns.co'
    },
    location: 'Austin, TX',
    projectIdeas: [
      {
        id: '103',
        title: 'Mental Wellness App',
        description: 'An app that helps users track and improve their mental wellbeing through guided exercises and tracking.',
        stage: 'mvp',
        tags: ['Health', 'Wellness', 'Mobile']
      }
    ],
    lookingFor: ['React Native Developer', 'Backend Developer']
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    password: 'password123',
    profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Machine learning engineer specializing in NLP. Looking for business-minded co-founders for an AI education platform.',
    skills: ['Python', 'Machine Learning', 'NLP', 'TensorFlow'],
    interests: ['EdTech', 'AI', 'B2B'],
    links: {
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      github: 'https://github.com/emilyr',
    },
    location: 'Boston, MA',
    projectIdeas: [
      {
        id: '104',
        title: 'AI Writing Coach',
        description: 'An AI-powered platform that helps students improve their writing skills through personalized feedback.',
        stage: 'prototype',
        tags: ['AI', 'Education', 'NLP']
      }
    ],
    lookingFor: ['Business Development', 'Frontend Developer']
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david@example.com',
    password: 'password123',
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Serial entrepreneur with two successful exits. Mentoring and investing in early-stage startups in fintech.',
    skills: ['Business Strategy', 'Fundraising', 'Growth Marketing', 'Leadership'],
    interests: ['FinTech', 'Blockchain', 'Investment'],
    links: {
      linkedin: 'https://linkedin.com/in/davidkim',
    },
    location: 'Miami, FL',
    projectIdeas: [
      {
        id: '105',
        title: 'Personal Finance Platform',
        description: 'A platform that helps millennials manage debt, invest, and plan for their financial future.',
        stage: 'growth',
        tags: ['FinTech', 'Personal Finance', 'SaaS']
      }
    ],
    lookingFor: ['CTO', 'Full-stack Developer']
  }
];