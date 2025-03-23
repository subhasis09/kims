'use client';

import React from 'react';
import { PatientData } from '@/types/patient';
import { translations, Language } from '@/translations';

interface Props {
  patientData: PatientData;
  onEdit: () => void;
  onConfirm: () => void;
  onStartOver: () => void;
}

export default function ConfirmationPage({ patientData, onEdit, onConfirm, onStartOver }: Props) {
  const t = translations[patientData.language];

  const renderField = (label: string, value: string | number | undefined) => {
    if (!value) return null;
    return (
      <div className="mb-4">
        <span className="font-medium text-gray-700">{label}: </span>
        <span className="text-gray-900">{value}</span>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {t.confirmationTitle}
      </h1>
      <p className="text-gray-600 mb-8">
        {t.confirmationMessage}
      </p>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t.patientDetails}
        </h2>
        {renderField(t.fullName, patientData.name)}
        {renderField(t.guardianName, patientData.guardianName)}
        {renderField(t.age, patientData.age)}
        {renderField(t.gender, patientData.gender)}
        {renderField(t.bloodGroup, patientData.bloodGroup)}
        {renderField(t.phone, patientData.phone)}
        {renderField(t.alternativePhone, patientData.alternativePhone)}
        {renderField(t.email, patientData.email)}
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t.addressDetails}
        </h2>
        {renderField(t.address, patientData.address)}
        {renderField(t.district, patientData.district)}
        {renderField(t.state, patientData.state)}
        {renderField(t.pinCode, patientData.pinCode)}
        {renderField(t.country, patientData.country)}
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t.appointmentDetails}
        </h2>
        {renderField(t.doctor, patientData.doctorToConsult)}
        {renderField(t.unit, patientData.unit)}
        {renderField(t.referringDoctor, patientData.referringDoctor)}
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button
          onClick={onEdit}
          className="flex-1 py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
        >
          {t.editInformation}
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {t.confirmAndProceed}
        </button>
        <button
          onClick={onStartOver}
          className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          {t.startOver}
        </button>
      </div>
    </div>
  );
} 