import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' ? 'bg-black text-white' : 'bg-gray-200'
        }`}
      >
        {t('english')}
      </button>
      <button
        onClick={() => changeLanguage('tr')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'tr' ? 'bg-black text-white' : 'bg-gray-200'
        }`}
      >
        {t('turkish')}
      </button>
    </div>
  );
};

export default LanguageSwitcher; 