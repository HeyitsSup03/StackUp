import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProfiles } from '../../context/ProfileContext';
import { useAuth } from '../../context/AuthContext';
import MessageList from '../../components/messaging/MessageList';
import ChatWindow from '../../components/messaging/ChatWindow';

const MessagesPage: React.FC = () => {
  const { matchId } = useParams<{ matchId?: string }>();
  const { profiles, matches, sendMessage } = useProfiles();
  const { currentUser } = useAuth();
  
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(matchId || null);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  const selectedMatch = selectedMatchId
    ? matches.find(m => m.id === selectedMatchId)
    : null;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
          <div className="bg-white p-4 border-r border-gray-200 md:col-span-1">
            <MessageList
              matches={matches}
              users={profiles}
              onSelectMatch={setSelectedMatchId}
            />
          </div>
          
          <div className="bg-white p-4 md:col-span-2 lg:col-span-3 h-full">
            {selectedMatch ? (
              <ChatWindow
                match={selectedMatch}
                users={profiles}
                onSendMessage={sendMessage}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-xl font-semibold mb-2">Select a Conversation</h2>
                <p className="text-gray-600">
                  Choose a match from the list to start chatting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;