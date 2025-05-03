export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Note: In production, we would never store plaintext passwords
  profilePicture: string;
  bio: string;
  skills: string[];
  interests: string[];
  links: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  location: string;
  projectIdeas: ProjectIdea[];
  lookingFor: string[];
}

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  stage: 'idea' | 'prototype' | 'mvp' | 'growth';
  tags: string[];
}

export interface Match {
  id: string;
  users: [string, string]; // IDs of the two users
  timestamp: number;
  messages: Message[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  read: boolean;
}

export interface FilterOptions {
  skills: string[];
  interests: string[];
  location: string;
  projectStage: string[];
}