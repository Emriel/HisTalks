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
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#693d14] focus:border-[#693d14]"
      >
        <span className="text-gray-700">{t('language')}</span>
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={() => changeLanguage('en')}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
              i18n.language === 'en' ? 'bg-[#693d14] text-white' : 'text-gray-700'
            }`}
          >
            {t('english')}
          </button>
          <button
            onClick={() => changeLanguage('tr')}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
              i18n.language === 'tr' ? 'bg-[#693d14] text-white' : 'text-gray-700'
            }`}
          >
            {t('turkish')}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 