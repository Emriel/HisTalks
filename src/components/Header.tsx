import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const { selectedCharacter, resetCharacter } = useChatContext();
  
  return (
    <header className="bg-[#693d14] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" 
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          onClick={resetCharacter}
        >
          <img src="/logo5.png" alt="HisTalks Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-serif font-bold">HisTalks</h1>
        </Link>
        <div className="w-32">
          {selectedCharacter && (
            <div className="hidden md:block text-sm opacity-80">
              {t('chat.conversing_with')} <span className="font-semibold">{selectedCharacter.name}</span>
            </div>
          )}
        </div>
        <nav className="flex space-x-4">
          <Link to="/signin" className="text-sm font-medium text-white hover:text-amber-400">{t('signin.submit')}</Link>
          <Link to="/signup" className="text-sm font-medium text-white hover:text-amber-400">{t('signup.submit')}</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;