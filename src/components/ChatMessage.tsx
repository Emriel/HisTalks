import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          message.sender === 'user'
            ? 'bg-[#693d14] text-white'
            : 'bg-slate-100 text-slate-800'
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