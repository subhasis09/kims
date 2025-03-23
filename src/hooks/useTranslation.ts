import { useState, useEffect } from 'react';
import { Language, translations, type Translation } from '@/translations';
import { translateText, translateObject } from '@/services/translationService';

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('english');
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[language];

  return {
    language,
    setLanguage,
    t,
    isLoading
  };
} 