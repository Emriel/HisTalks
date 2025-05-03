import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-white border border-gray-200 shadow-sm rounded-bl-none'
        }`}
      >
        {!isUser && (
          <div className="font-serif font-medium text-blue-900 mb-1">
            {message.senderName}
          </div>
        )}
        <div className={isUser ? 'text-white' : 'text-slate-800'}>
          {message.text}
        </div>
        <div className={`text-xs mt-1 text-right ${isUser ? 'text-blue-200' : 'text-slate-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;