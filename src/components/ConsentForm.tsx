'use client';

import React, { useState } from 'react';
import { Language, translations } from '@/translations';

interface Props {
  language: Language;
  onNext: () => void;
  onBack: () => void;
}

export default function ConsentForm({ language, onNext, onBack }: Props) {
  const [hasConsented, setHasConsented] = useState(false);
  const t = translations[language];

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center text-gray-900">{t.generalConsent}</h2>

      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700">
          {t.generalConsentText}
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="consent"
                type="checkbox"
                checked={hasConsented}
                onChange={(e) => setHasConsented(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="consent" className="text-sm font-medium text-gray-700">
                {t.consentCheckbox}
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {t.back}
          </button>
          <button
            onClick={onNext}
            disabled={!hasConsented}
            className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium ${
              hasConsented
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t.proceed}
          </button>
        </div>
      </div>
    </div>
  );
} 