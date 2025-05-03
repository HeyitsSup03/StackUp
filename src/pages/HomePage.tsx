import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Code, Rocket, Users, MessageSquare } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Build Your Future with the Right Co-Founder
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Because finding a Co-founder<br />should not be harder to find a Date.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="lg">Browse Profiles</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How StackUp Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Users size={48} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Add your skills, interests, and project ideas to find the perfect match for your startup journey.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Rocket size={48} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with Co-founders</h3>
              <p className="text-gray-600">
                Swipe through potential co-founders and connect with those who share your vision and complement your skills.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <MessageSquare size={48} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Start the Conversation</h3>
              <p className="text-gray-600">
                Message your matches to discuss your ideas and see if you're the right fit for building something amazing together.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="John Smith"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">John Smith</h3>
                  <p className="text-sm text-gray-500">CTO at TechFlow</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I met my co-founder on StackUp and within 6 months we secured our first round of funding. The platform made it easy to find someone whose skills complemented mine perfectly."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">Co-founder at HealthTech Solutions</p>
                </div>
              </div>
              <p className="text-gray-700">
                "After struggling to find a technical co-founder through my network, I turned to StackUp. The filtering system helped me connect with developers who were passionate about healthcare technology."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to find your co-founder?</h2>
          <p className="text-xl mb-8">
            Join thousands of entrepreneurs and developers who have found their perfect match.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="min-w-48">
              Create Your Profile
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Code size={24} className="text-black" />
              <span className="ml-2 text-lg font-bold">StackUp</span>
            </div>
            
            <div className="text-sm text-gray-500">
              © 2025 StackUp. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;