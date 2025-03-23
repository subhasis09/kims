'use client';

import React, { useEffect, useState } from 'react';
import { departments, type Department } from '@/data/doctors';

interface Props {
  symptoms: string;
  onDepartmentSelect: (departmentId: string) => void;
}

export default function DepartmentPrediction({ symptoms, onDepartmentSelect }: Props) {
  const [predictedDepartment, setPredictedDepartment] = useState<Department | null>(null);

  useEffect(() => {
    const matchDepartment = () => {
      if (!symptoms) {
        setPredictedDepartment(null);
        return;
      }

      const symptomWords = symptoms.toLowerCase().split(/[\s,]+/).filter(word => word.length > 2);
      const departmentScores = departments.map(dept => {
        let score = 0;

        // Check each symptom in the department
        dept.commonSymptoms.forEach(symptom => {
          const symptomKeywords = symptom.toLowerCase().split(/\s+/);
          
          // Check if any of the patient's symptoms match this department's symptom
          symptomWords.forEach(word => {
            if (symptomKeywords.includes(word)) {
              score += 2; // Exact match
            } else if (symptomKeywords.some(keyword => keyword.includes(word) || word.includes(keyword))) {
              score += 1; // Partial match
            }
          });
        });

        // Additional weight for specific keywords
        const departmentKeywords: { [key: string]: string[] } = {
          cardiology: ['heart', 'chest', 'cardiac', 'blood pressure', 'palpitation'],
          orthopedics: ['bone', 'joint', 'fracture', 'sprain', 'muscle'],
          neurology: ['brain', 'nerve', 'seizure', 'migraine', 'paralysis'],
          pediatrics: ['child', 'baby', 'infant', 'vaccination', 'growth'],
          dermatology: ['skin', 'rash', 'acne', 'allergy', 'itching'],
          ent: ['ear', 'nose', 'throat', 'sinus', 'hearing']
        };

        if (departmentKeywords[dept.id]) {
          departmentKeywords[dept.id].forEach(keyword => {
            if (symptoms.toLowerCase().includes(keyword)) {
              score += 3; // Strong match
            }
          });
        }
        
        return { department: dept, score };
      });

      const bestMatch = departmentScores
        .sort((a, b) => b.score - a.score)
        .find(item => item.score > 2); // Only recommend if score is significant

      setPredictedDepartment(bestMatch?.department || null);

      console.log("Symptoms:", symptoms);
      console.log("Department Scores:", departmentScores);
      console.log("Best Match:", bestMatch);
    };

    if (symptoms) {
      matchDepartment();
    } else {
      setPredictedDepartment(null);
    }
  }, [symptoms]);

  if (!symptoms || !predictedDepartment) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Recommended Department</h3>
      <div
        className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-lg text-blue-600">{predictedDepartment.name}</h4>
            <p className="text-gray-600 text-sm mt-1">{predictedDepartment.description}</p>
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">Common symptoms:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {predictedDepartment.commonSymptoms.map((symptom) => (
                  <span
                    key={symptom}
                    className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => onDepartmentSelect(predictedDepartment.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
} 