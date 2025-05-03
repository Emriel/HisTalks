import React, { useState, useRef, useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import ChatMessage from './ChatMessage';
import { ArrowLeft, Send, Mic, MicOff } from 'lucide-react';

const ChatInterface = () => {
  const { messages, sendMessage, selectedCharacter, resetCharacter } = useChatContext();
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 flex items-center">
        <button 
          onClick={resetCharacter} 
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
            <p className="text-xs opacity-80">{selectedCharacter?.era}</p>
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
              Begin Your Conversation with {selectedCharacter?.name}
            </h3>
            <p className="max-w-md">
              Ask a question, engage in debate, or simply say hello to start an immersive conversation with this historical figure.
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

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button 
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-full ${
              isListening 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Ask ${selectedCharacter?.name} a question...`}
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={isLoading || inputValue.trim() === ''}
            className={`p-2.5 rounded-full bg-blue-600 text-white ${
              isLoading || inputValue.trim() === '' 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;