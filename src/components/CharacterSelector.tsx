import React, { useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Search, ChevronDown, X } from 'lucide-react';
import { historicalFigures, categories } from '../data/characters';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const CharacterSelector = () => {
  const { selectCharacter } = useChatContext();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 9;

  const filteredCharacters = historicalFigures.filter(character => {
    const matchesSearch = 
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.era.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(character.category);
    return matchesSearch && matchesCategory;
  });

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);
  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const removeCategory = (categoryId: string) => {
    setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    setCurrentPage(1);
  };

  const getCharacterTranslationKey = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[ç]/g, 'c')
      .replace(/[ğ]/g, 'g')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ş]/g, 's')
      .replace(/[ü]/g, 'u');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 mt-6">
        <h2 className="text-3xl font-serif font-bold text-[#693d14] mb-3">
          {t('converse_with_history')}
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {t('select_historical_figure')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#693d14] focus:border-[#693d14]"
            placeholder={t('search_placeholder')}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-48 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#693d14] focus:border-[#693d14]"
            >
              <span className="text-gray-700">
                {selectedCategories.length === 0 ? t('all_categories') : `${selectedCategories.length} ${t('selected')}`}
              </span>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {categories.filter(cat => cat.id !== 'all').map((category) => (
                  <div
                    key={category.id}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => {}}
                      className="h-4 w-4 text-[#693d14] rounded border-gray-300 focus:ring-[#693d14]"
                    />
                    <span className="ml-2 text-gray-700">{t(`category.${category.id}`)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map(categoryId => {
            const category = categories.find(c => c.id === categoryId);
            return (
              <div
                key={categoryId}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
              >
                <span>{t(`category.${category?.id}`)}</span>
                <button
                  onClick={() => removeCategory(categoryId)}
                  className="hover:text-blue-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCharacters.map((character) => (
          <div
            key={character.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            onClick={() => selectCharacter(character)}
          >
            <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${character.image})` }}></div>
            <div className="p-4">
              <h3 className="text-xl font-serif font-bold text-[#693d14]">{character.name}</h3>
              <p className="text-sm text-slate-500 mb-2">{character.era}</p>
              <p className="text-sm text-slate-700">
                {t(`characters.${getCharacterTranslationKey(character.name)}.shortBio`)}
              </p>
            </div>
            <div className="p-4 pt-0 flex justify-end">
              <button className="text-amber-600 font-medium text-sm hover:text-amber-800 transition-colors">
                {t('start_conversation')} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t('previous')}
          </button>
          <span className="text-gray-600">
            {t('page')} {currentPage} {t('of')} {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {t('next')}
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterSelector;