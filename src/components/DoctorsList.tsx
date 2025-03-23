'use client';

import React, { useState, useEffect } from 'react';
import { departments, doctors, type Department, type Doctor } from '@/data/doctors';
import { Language, translations, type Translation } from '@/translations';

interface Props {
  onDoctorSelect: (doctor: Doctor) => void;
  patientSymptoms?: string;
  showRecommendations?: boolean;
  onBack: () => void;
  language: Language;
}

export default function DoctorsList({ 
  onDoctorSelect, 
  patientSymptoms, 
  showRecommendations,
  onBack,
  language
}: Props) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [recommendedDepartment, setRecommendedDepartment] = useState<string | null>(null);
  const t = translations[language];

  // Predict department based on symptoms only if user wants recommendations
  useEffect(() => {
    if (patientSymptoms && !selectedDepartment && showRecommendations) {
      const symptomsLower = patientSymptoms.toLowerCase();
      
      // Score each department based on matching symptoms
      const departmentScores = departments.map(dept => {
        let score = 0;
        
        // Check each common symptom
        dept.commonSymptoms.forEach(symptom => {
          if (symptomsLower.includes(symptom.toLowerCase())) {
            score += 2;
          }
        });

        // Additional weight for department-specific keywords
        const keywords = {
          cardiology: ['heart', 'chest', 'cardiac', 'blood pressure'],
          orthopedics: ['bone', 'joint', 'fracture', 'muscle'],
          neurology: ['brain', 'nerve', 'headache', 'migraine'],
          pediatrics: ['child', 'baby', 'infant', 'growth'],
          dermatology: ['skin', 'rash', 'acne', 'allergy'],
          ent: ['ear', 'nose', 'throat', 'sinus'],
          ophthalmology: ['eye', 'vision', 'sight', 'retina'],
          gastroenterology: ['stomach', 'liver', 'digestion', 'bowel'],
          pulmonology: ['lung', 'breathing', 'respiratory', 'cough'],
          endocrinology: ['hormone', 'thyroid', 'diabetes', 'growth'],
          psychiatry: ['mental', 'anxiety', 'depression', 'behavior'],
          gynecology: ['pregnancy', 'menstrual', 'uterus', 'ovary']
        };

        if (keywords[dept.id as keyof typeof keywords]) {
          keywords[dept.id as keyof typeof keywords].forEach(keyword => {
            if (symptomsLower.includes(keyword)) {
              score += 3;
            }
          });
        }

        return { department: dept.id, score };
      });

      // Get the department with the highest score
      const bestMatch = departmentScores.sort((a, b) => b.score - a.score)[0];
      
      // If no department has a significant match (score > 2), default to general medicine
      if (bestMatch.score > 2) {
        setRecommendedDepartment(bestMatch.department);
        setSelectedDepartment(bestMatch.department);
      } else {
        // Default to general medicine for unrecognized or general symptoms
        setRecommendedDepartment('general-medicine');
        setSelectedDepartment('general-medicine');
      }
    }
  }, [patientSymptoms, showRecommendations]);

  const filteredDoctors = selectedDepartment
    ? doctors.filter(doctor => doctor.department === selectedDepartment)
    : doctors;

  const handleDepartmentClick = (departmentId: string) => {
    setSelectedDepartment(departmentId === selectedDepartment ? null : departmentId);
  };

  // Translate doctor names and specializations based on language
  const getTranslatedDoctorName = (name: string) => {
    // In a real application, you would have a mapping of doctor names in different languages
    // For now, we'll just return the original name
    return name;
  };

  const getTranslatedSpecialization = (specialization: string) => {
    // In a real application, you would have a mapping of specializations in different languages
    // For now, we'll just return the original specialization
    return specialization;
  };

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t.back}
      </button>

      {/* Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(dept => (
          <div
            key={dept.id}
            onClick={() => handleDepartmentClick(dept.id)}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedDepartment === dept.id
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-white border-2 border-gray-200 hover:border-blue-300'
            } ${
              recommendedDepartment === dept.id && showRecommendations
                ? 'ring-2 ring-green-500'
                : ''
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{t[dept.nameKey as keyof Translation]}</h3>
            <p className="text-gray-600 text-sm">{t[dept.descriptionKey as keyof Translation]}</p>
            {recommendedDepartment === dept.id && showRecommendations && (
              <span className="inline-block mt-2 text-sm text-green-600 font-medium">
                ✓ {t.recommendedDeptLabel}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Doctors */}
      {selectedDepartment && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{t.availableDoctors}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoctors.map(doctor => (
              <div
                key={doctor.id}
                onClick={() => onDoctorSelect(doctor)}
                className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer"
              >
                <h3 className="font-semibold">{getTranslatedDoctorName(doctor.name)}</h3>
                <p className="text-sm text-gray-600">{getTranslatedSpecialization(doctor.specialization)}</p>
                <p className="text-sm text-gray-600">
                  {t.experience}: {doctor.experience} {t.years}
                </p>
                <p className="text-sm text-gray-600">
                  {t.consultationFee}: ₹{doctor.consultationFee}
                </p>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">{t.availability}:</p>
                  <p className="text-sm">{doctor.availability.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 