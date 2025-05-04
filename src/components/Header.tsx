import React from 'react';
import { BookOpen } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const Header = () => {
  const { selectedCharacter } = useChatContext();
  
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-amber-400" />
          <h1 className="text-2xl font-serif font-bold">HisTalks</h1>
        </div>
        {selectedCharacter && (
          <div className="hidden md:block text-sm opacity-80">
            Conversing with <span className="font-semibold">{selectedCharacter.name}</span>
          </div>
        )}
        <nav className="flex space-x-4">
          <a href="/signin" className="text-sm font-medium text-white hover:text-amber-400">Giriş Yap</a>
          <a href="/signup" className="text-sm font-medium text-white hover:text-amber-400">Kayıt Ol</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;