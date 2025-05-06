import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative text-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1 text-sm font-medium hover:text-amber-400 focus:outline-none"
      >
        <span>{t('language')}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-[#4d290f] border border-[#693d14] rounded shadow-md z-50">
          <button
            onClick={() => changeLanguage('en')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              i18n.language === 'en' ? 'text-amber-400 font-semibold' : 'text-white'
            } hover:bg-[#5a3411]`}
          >
            {t('english')}
          </button>
          <button
            onClick={() => changeLanguage('tr')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              i18n.language === 'tr' ? 'text-amber-400 font-semibold' : 'text-white'
            } hover:bg-[#5a3411]`}
          >
            {t('turkish')}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
