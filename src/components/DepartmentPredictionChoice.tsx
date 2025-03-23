'use client';

import React from 'react';
import { Language, translations } from '@/translations';

interface Props {
  onChoice: (wantsPrediction: boolean) => void;
  isExistingPatient?: boolean;
  patientName?: string;
  language: Language;
  onNext: () => void;
}

export default function DepartmentPredictionChoice({ onChoice, isExistingPatient, patientName, language, onNext }: Props) {
  const t = translations[language];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {isExistingPatient ? `${t.welcome}, ${patientName}!` : t.departmentHelp}
      </h2>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <p className="text-lg text-gray-700 mb-6">
          {t.needDepartmentHelp}
        </p>
        
        <div className="space-y-4">
          <div className="p-6 border border-blue-100 rounded-lg bg-blue-50">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              {t.getDepartmentAssistance}
            </h3>
            <p className="text-blue-700 mb-4">
              {t.recommendationNote}
            </p>
            <ul className="text-blue-600 text-sm text-left list-disc list-inside mb-4">
              <li>{t.departments}</li>
              <li>{t.recommendedDepartment}</li>
              <li>{t.canAskLater}</li>
            </ul>
            <button
              onClick={() => {
                onChoice(true);
                onNext();
              }}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t.yesNeedHelp}
            </button>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t.noKnowDepartment}
            </h3>
            <p className="text-gray-600 mb-4">
              {t.proceedToDepartment}
            </p>
            <ul className="text-gray-500 text-sm text-left list-disc list-inside mb-4">
              <li>{t.departments}</li>
              <li>{t.department}</li>
              <li>{t.specialization}</li>
            </ul>
            <button
              onClick={() => {
                onChoice(false);
                onNext();
              }}
              className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t.noKnowDepartment}
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        {t.canAskLater}
      </p>
    </div>
  );
} 