import React from 'react';
import { useChatContext } from '../context/ChatContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher'; // 👈 dil menüsü eklendi

const Header = () => {
  const { t } = useTranslation();
  const { selectedCharacter, resetCharacter } = useChatContext();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-[#693d14] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          onClick={resetCharacter}
        >
          <img src="/logo5.png" alt="HisTalks Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-serif font-bold">HisTalks</h1>
        </Link>

        <div className="w-32">
          {selectedCharacter && (
            <div className="hidden md:block text-sm opacity-80">
              {t('chat.conversing_with')}{' '}
              <span className="font-semibold">{selectedCharacter.name}</span>
            </div>
          )}
        </div>

        <nav className="flex space-x-4 items-center">
          {/* Dil menüsü */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Kullanıcı adı */}
          {isAuthenticated && user && (
            <span className="text-sm text-white bg-white/20 rounded px-2 py-1">
              {user.username}
            </span>
          )}

          {/* Auth durumuna göre butonlar */}
          {!isAuthenticated ? (
            <>
              <Link to="/signin" className="text-sm font-medium text-white hover:text-amber-400">
                {t('signin.submit')}
              </Link>
              <Link to="/signup" className="text-sm font-medium text-white hover:text-amber-400">
                {t('signup.submit')}
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-white hover:text-amber-400"
            >
              {t('logout.submit') || 'Sign Out'}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
