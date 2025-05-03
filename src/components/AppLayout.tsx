import React from 'react';
import CharacterSelector from './CharacterSelector';
import ChatInterface from './ChatInterface';
import { useChatContext } from '../context/ChatContext';

const AppLayout = () => {
  const { selectedCharacter } = useChatContext();

  return (
    <main className="flex-grow container mx-auto p-4">
      {!selectedCharacter ? (
        <CharacterSelector />
      ) : (
        <ChatInterface />
      )}
    </main>
  );
};

export default AppLayout;