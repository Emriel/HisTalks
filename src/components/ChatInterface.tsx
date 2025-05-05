import React, { useState, useRef, useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import ChatMessage from './ChatMessage';
import { ArrowLeft, Send, Mic, MicOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const ChatInterface = () => {
  const { t } = useTranslation();
  const { messages, sendMessage, selectedCharacter, resetCharacter } = useChatContext();
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleBack = () => {
    resetCharacter();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    setIsLoading(true);
    await sendMessage(inputValue);
    setInputValue('');
    setIsLoading(false);
  };

  const toggleVoiceInput = () => {
    // In a real implementation, this would connect to the Web Speech API
    setIsListening(!isListening);
  };

  const getCharacterTranslationKey = (name: string) => {
    return name
      .toLowerCase()
      // Remove parentheses and their contents
      .replace(/\([^)]*\)/g, '')
      // Replace hyphens with underscores
      .replace(/-/g, '_')
      // Replace spaces with underscores
      .replace(/\s+/g, '_')
      // Replace Turkish characters
      .replace(/[ç]/g, 'c')
      .replace(/[ğ]/g, 'g')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ş]/g, 's')
      .replace(/[ü]/g, 'u')
      // Remove any remaining special characters
      .replace(/[^a-z0-9_]/g, '')
      // Remove multiple consecutive underscores
      .replace(/_+/g, '_')
      // Remove leading and trailing underscores
      .replace(/^_|_$/g, '');
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#693d14] text-white p-4 flex items-center">
        <button 
          onClick={handleBack}
          className="mr-4 text-white hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          <img 
            src={selectedCharacter?.image} 
            alt={selectedCharacter?.name} 
            className="h-10 w-10 rounded-full object-cover border-2 border-amber-400"
          />
          <div className="ml-3">
            <h2 className="font-serif font-bold">{selectedCharacter?.name}</h2>
            <p className="text-xs opacity-80">
              {selectedCharacter && t(`characters.${getCharacterTranslationKey(selectedCharacter.name)}.era`)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 bg-slate-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
            <img 
              src={selectedCharacter?.image} 
              alt={selectedCharacter?.name} 
              className="h-20 w-20 rounded-full object-cover border-2 border-amber-400 mb-4"
            />
            <h3 className="text-xl font-serif font-medium text-blue-900 mb-2">
              {t('chat.begin_conversation')} {selectedCharacter?.name}
            </h3>
            <p className="max-w-md">
              {t('chat.start_message')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('chat.input_placeholder')}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#693d14] focus:border-[#693d14]"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2 rounded-full ${
              isListening ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
            } hover:bg-gray-200 transition-colors`}
            title={t(isListening ? 'chat.voice_input.stop' : 'chat.voice_input.start')}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button
            type="submit"
            disabled={isLoading || inputValue.trim() === ''}
            className="p-2 bg-[#693d14] text-white rounded-lg hover:bg-[#8b5a2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;