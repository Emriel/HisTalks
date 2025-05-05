import React, { createContext, useContext, useState, useCallback } from 'react';
import { Character, Message } from '../types';
import { getAIResponse } from '../utils/api';
import { useTranslation } from 'react-i18next';

interface ChatContextType {
  selectedCharacter: Character | null;
  messages: Message[];
  selectCharacter: (character: Character) => void;
  resetCharacter: () => void;
  sendMessage: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { t } = useTranslation();

  const getCharacterTranslationKey = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\([^)]*\)/g, '')
      .replace(/-/g, '_')
      .replace(/\s+/g, '_')
      .replace(/[ç]/g, 'c')
      .replace(/[ğ]/g, 'g')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ş]/g, 's')
      .replace(/[ü]/g, 'u')
      .replace(/[^a-z0-9_]/g, '')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  };

  const selectCharacter = useCallback((character: Character) => {
    setSelectedCharacter(character);
    const translationKey = getCharacterTranslationKey(character.name);
    setMessages([
      {
        id: '1',
        sender: 'ai',
        senderName: character.name,
        text: t(`characters.${translationKey}.greeting`),
        timestamp: new Date(),
      },
    ]);
  }, [t]);

  const resetCharacter = useCallback(() => {
    setSelectedCharacter(null);
    setMessages([]);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!selectedCharacter) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'You',
      text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Get AI response
    try {
      const response = await getAIResponse(text, selectedCharacter);
      
      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        senderName: selectedCharacter.name,
        text: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        senderName: selectedCharacter.name,
        text: "I apologize, but I'm having trouble understanding. Could you rephrase your question?",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [selectedCharacter]);

  const value = {
    selectedCharacter,
    messages,
    selectCharacter,
    resetCharacter,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};