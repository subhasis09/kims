'use client';

import React, { useState } from 'react';
import { Language, translations } from '@/translations';
import VoicePhoneInput from './VoicePhoneInput';

interface LandingPageProps {
  onExistingPatient: (phone: string) => void;
  onNewPatient: () => void;
  onLanguageSelect: (language: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExistingPatient,
  onNewPatient,
  onLanguageSelect,
}) => {
  const [isExistingPatient, setIsExistingPatient] = useState<boolean | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    onLanguageSelect(language);
  };

  const t = selectedLanguage ? translations[selectedLanguage] : translations.english;

  // Always show language selection first
  if (!selectedLanguage) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Select Language / भाषा चुनें / ଭାଷା ବାଛନ୍ତୁ
        </h1>
        <div className="space-y-4 w-full max-w-md">
          <button
            onClick={() => handleLanguageSelect('english')}
            className="w-full p-4 bg-white border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageSelect('hindi')}
            className="w-full p-4 bg-white border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            हिंदी
          </button>
          <button
            onClick={() => handleLanguageSelect('odia')}
            className="w-full p-4 bg-white border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            ଓଡ଼ିଆ
          </button>
        </div>
      </div>
    );
  }

  // After language is selected, show patient type selection
  if (isExistingPatient === null) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-6">
        <button
          onClick={() => setSelectedLanguage(null)}
          className="self-start mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t.back}
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {t.welcome}
        </h1>
        <div className="space-y-4 w-full max-w-md">
          <button
            onClick={() => setIsExistingPatient(true)}
            className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {t.existingPatient}
          </button>
          <button
            onClick={() => setIsExistingPatient(false)}
            className="w-full p-4 bg-white border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            {t.newPatient}
          </button>
        </div>
      </div>
    );
  }

  // Show phone input for existing patients
  if (isExistingPatient) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-6">
        <button
          onClick={() => setIsExistingPatient(null)}
          className="self-start mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t.back}
        </button>
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            {t.enterPhone}
          </h2>
          <VoicePhoneInput onPhoneSubmit={onExistingPatient} language={selectedLanguage} />
        </div>
      </div>
    );
  }

  // If not existing patient, trigger new patient flow
  onNewPatient();
  return null;
}; 