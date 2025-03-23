'use client';

import React from 'react';
import type { Doctor } from '@/data/doctors';
import { Language, translations } from '@/translations';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  doctor: Doctor;
  patientName: string;
  paymentId: string;
  onStartOver: () => void;
  language: Language;
}

export default function SuccessPage({ language, doctor, patientName, paymentId, onStartOver }: Props) {
  const t = translations[language];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.bookingSuccess}</h2>
        <p className="text-gray-600 mb-6">{t.bookingConfirmation}</p>
        
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">{t.appointmentDetails}</h3>
          <div className="space-y-3 text-left">
            <div>
              <span className="font-medium">{t.patientDetails}:</span> {patientName}
            </div>
            <div>
              <span className="font-medium">{t.doctor}:</span> {doctor.name}
            </div>
            <div>
              <span className="font-medium">{t.department}:</span> {doctor.department.charAt(0).toUpperCase() + doctor.department.slice(1)}
            </div>
            <div>
              <span className="font-medium">{t.appointmentDate}:</span> {doctor.availability.join(', ')}
            </div>
            <div>
              <span className="font-medium">{t.paymentId}:</span> {paymentId}
            </div>
            <div>
              <span className="font-medium">{t.amount}:</span> ₹{doctor.consultationFee}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onStartOver}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {t.done}
          </button>
        </div>
      </div>
    </div>
  );
} 