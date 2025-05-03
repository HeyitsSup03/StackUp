import React, { useState, useRef, useEffect } from 'react';
import { Match, User, Message } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { formatTime } from '../../utils/date';
import { Send } from 'lucide-react';

interface ChatWindowProps {
  match: Match;
  users: User[];
  onSendMessage: (matchId: string, text: string) => void;
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  match,
  users,
  onSendMessage,
  className = ''
}) => {
  const { currentUser } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!currentUser) return null;
  
  const otherUserId = match.users.find(id => id !== currentUser.id);
  const otherUser = users.find(user => user.id === otherUserId);
  
  if (!otherUser) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    onSendMessage(match.id, newMessage);
    setNewMessage('');
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [match.messages]);

  const renderMessages = () => {
    // Group messages by date
    const messagesByDate: { [key: string]: Message[] } = {};
    
    match.messages.forEach(message => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!messagesByDate[date]) {
        messagesByDate[date] = [];
      }
      messagesByDate[date].push(message);
    });
    
    return Object.entries(messagesByDate).map(([date, messages]) => (
      <div key={date}>
        <div className="text-center my-3">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
            {date === new Date().toLocaleDateString() ? 'Today' : date}
          </span>
        </div>
        
        {messages.map(message => {
          const isCurrentUser = message.senderId === currentUser.id;
          const sender = isCurrentUser ? currentUser : otherUser;
          
          return (
            <div
              key={message.id}
              className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isCurrentUser && (
                <img
                  src={sender.profilePicture}
                  alt={sender.name}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              )}
              
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  isCurrentUser
                    ? 'bg-black text-white rounded-tr-none'
                    : 'bg-gray-100 text-black rounded-tl-none'
                }`}
              >
                <p>{message.text}</p>
                <div
                  className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {isCurrentUser && (
                <img
                  src={sender.profilePicture}
                  alt={sender.name}
                  className="w-8 h-8 rounded-full ml-2 object-cover"
                />
              )}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="border-b pb-3 mb-4">
        <div className="flex items-center">
          <img
            src={otherUser.profilePicture}
            alt={otherUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-semibold">{otherUser.name}</h3>
            <p className="text-sm text-gray-500">{otherUser.location}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 px-2">
        {match.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 mb-2">No messages yet</p>
            <p className="text-sm text-gray-400">
              Start the conversation with {otherUser.name}
            </p>
          </div>
        ) : (
          renderMessages()
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Message ${otherUser.name}...`}
          className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={newMessage.trim() === ''}
          className="bg-black text-white p-3 rounded-r-md hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;