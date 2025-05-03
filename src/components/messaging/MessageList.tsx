import React from 'react';
import { Match, User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from '../../utils/date';
import { ArrowRight } from 'lucide-react';

interface MessageListProps {
  matches: Match[];
  users: User[];
  onSelectMatch: (matchId: string) => void;
  className?: string;
}

const MessageList: React.FC<MessageListProps> = ({
  matches,
  users,
  onSelectMatch,
  className = ''
}) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  // Sort matches by most recent message
  const sortedMatches = [...matches].sort((a, b) => {
    const aLastMessage = a.messages[a.messages.length - 1];
    const bLastMessage = b.messages[b.messages.length - 1];
    
    if (!aLastMessage && !bLastMessage) return b.timestamp - a.timestamp;
    if (!aLastMessage) return 1;
    if (!bLastMessage) return -1;
    
    return bLastMessage.timestamp - aLastMessage.timestamp;
  });

  return (
    <div className={`${className}`}>
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      
      {sortedMatches.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No matches yet.</p>
          <p className="text-gray-500 mt-2">
            Start connecting with potential co-founders!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedMatches.map(match => {
            const otherUserId = match.users.find(id => id !== currentUser.id);
            const otherUser = users.find(user => user.id === otherUserId);
            
            if (!otherUser) return null;
            
            const lastMessage = match.messages[match.messages.length - 1];
            const unreadMessages = match.messages.filter(
              msg => msg.senderId !== currentUser.id && !msg.read
            ).length;
            
            return (
              <div
                key={match.id}
                className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all hover:shadow-sm"
                onClick={() => onSelectMatch(match.id)}
              >
                <div className="flex items-center">
                  <img
                    src={otherUser.profilePicture}
                    alt={otherUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{otherUser.name}</h3>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate max-w-[200px]">
                        {lastMessage ? lastMessage.text : 'Start a conversation'}
                      </p>
                      
                      {unreadMessages > 0 ? (
                        <span className="bg-black text-white text-xs rounded-full px-2 py-1 ml-2">
                          {unreadMessages}
                        </span>
                      ) : (
                        <ArrowRight size={16} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MessageList;