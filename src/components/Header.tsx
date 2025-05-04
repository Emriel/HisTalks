import React from 'react';
import { useChatContext } from '../context/ChatContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { selectedCharacter, resetCharacter } = useChatContext();
  
  return (
    <header className="bg-[#693d14] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={resetCharacter}
        >
          <img src="/logo5.png" alt="HisTalks Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-serif font-bold">HisTalks</h1>
        </div>
        <div className="flex-1 flex justify-center">
          <LanguageSwitcher />
        </div>
        <div className="w-32">
          {selectedCharacter && (
            <div className="hidden md:block text-sm opacity-80">
              Conversing with <span className="font-semibold">{selectedCharacter.name}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;