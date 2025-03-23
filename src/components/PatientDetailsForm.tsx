import React, { useState } from 'react';
import type { Language } from '@/translations';
import { translations, type Translation } from '@/translations';

interface PatientDetailsFormProps {
  onNext: (data: {
    name: string;
    age: string;
    phone: string;
    symptoms: string;
    language: Language;
  }) => void;
  onPrev: () => void;
}

const PatientDetailsForm: React.FC<PatientDetailsFormProps> = ({
  onNext,
  onPrev,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    symptoms: '',
    language: 'en' as Language,
  });

  const t = translations[formData.language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">{t.patientDetails}</h2>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded-md"
          placeholder={t.enterPatientName}
          required
        />
      </div>
      
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">{t.age}</label>
        <input
          id="age"
          type="text"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full p-2 border rounded-md"
          placeholder={t.enterPatientAge}
          required
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-2 border rounded-md"
          placeholder={t.enterPhoneNumber}
          required
        />
      </div>
      
      <div>
        <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">{t.symptoms}</label>
        <textarea
          id="symptoms"
          value={formData.symptoms}
          onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
          className="w-full p-2 border rounded-md"
          placeholder={t.describeSymptoms}
          rows={4}
          required
        />
      </div>
      
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">{t.language}</label>
        <select
          id="language"
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value as Language })}
          className="w-full p-2 border rounded-md"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="od">ଓଡ଼ିଆ</option>
        </select>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onPrev}
          className="btn bg-gray-200 hover:bg-gray-300"
        >
          {t.back}
        </button>
        
        <button
          type="submit"
          className="btn btn-primary"
        >
          {t.next}
        </button>
      </div>
    </form>
  );
};

export default PatientDetailsForm; 