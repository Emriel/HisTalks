import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-6 bg-[#693d14] text-white text-sm mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          {t('footer.copyright', { year: currentYear })}
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-amber-400 transition-colors">{t('footer.about')}</a>
          <a href="#" className="hover:text-amber-400 transition-colors">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-amber-400 transition-colors">{t('footer.terms')}</a>
          <a href="#" className="hover:text-amber-400 transition-colors">{t('footer.contact')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;