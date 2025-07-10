import React from 'react';
import { Languages } from 'lucide-react';
import { Language } from '../types/speech';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
}

const languages: Language[] = [
  { code: 'th-TH', name: 'ไทย', flag: '🇹🇭' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 text-gray-300 mb-2">
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium">ภาษา / Language</span>
      </div>
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-gray-800">
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};