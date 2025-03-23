'use client';

import React, { useState } from 'react';
import type { Language } from '@/translations';
import { translations, type Translation } from '@/translations';

interface PatientData {
  name: string;
  age: string;
  phone: string;
  symptoms: string;
  language: Language;
}

interface PatientInfoProps {
  patientData: PatientData;
  onPrev: () => void;
  onNext: () => void;
  onEdit: (data: Partial<PatientData>) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({
  patientData,
  onPrev,
  onNext,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const t = translations[patientData.language];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">{t.confirmPatientInfo}</h2>
      
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
            <input
              id="edit-name"
              type="text"
              value={patientData.name}
              onChange={(e) => onEdit({ name: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder={t.enterPatientName}
            />
          </div>
          
          <div>
            <label htmlFor="edit-age" className="block text-sm font-medium text-gray-700 mb-1">{t.age}</label>
            <input
              id="edit-age"
              type="text"
              value={patientData.age}
              onChange={(e) => onEdit({ age: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder={t.enterPatientAge}
            />
          </div>
          
          <div>
            <label htmlFor="edit-phone" className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
            <input
              id="edit-phone"
              type="tel"
              value={patientData.phone}
              onChange={(e) => onEdit({ phone: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder={t.enterPhoneNumber}
            />
          </div>
          
          <div>
            <label htmlFor="edit-symptoms" className="block text-sm font-medium text-gray-700 mb-1">{t.symptoms}</label>
            <textarea
              id="edit-symptoms"
              value={patientData.symptoms}
              onChange={(e) => onEdit({ symptoms: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder={t.describeSymptoms}
              rows={4}
            />
          </div>
          
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="btn btn-primary w-full"
          >
            {t.saveChanges}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500">{t.name}</h3>
              <p className="text-lg font-medium">{patientData.name}</p>
            </div>
            
            <div className="card bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500">{t.age}</h3>
              <p className="text-lg font-medium">{patientData.age}</p>
            </div>
            
            <div className="card bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500">{t.phone}</h3>
              <p className="text-lg font-medium">{patientData.phone}</p>
            </div>
            
            <div className="card bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500">{t.language}</h3>
              <p className="text-lg font-medium capitalize">{patientData.language}</p>
            </div>
          </div>
          
          <div className="card bg-gray-50">
            <h3 className="text-sm font-medium text-gray-500">{t.symptoms}</h3>
            <p className="text-lg">{patientData.symptoms}</p>
          </div>
          
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn bg-gray-200 hover:bg-gray-300 w-full"
          >
            {t.editInformation}
          </button>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onPrev}
          className="btn bg-gray-200 hover:bg-gray-300"
        >
          {t.back}
        </button>
        
        <button
          type="button"
          onClick={onNext}
          className="btn btn-primary"
        >
          {t.proceedToDepartment}
        </button>
      </div>
    </div>
  );
};

export default PatientInfo; 