'use client';

import React, { useState, useEffect } from 'react';
import { departments, doctors, type Doctor } from '@/types/database';

interface DepartmentRecommendationProps {
  symptoms: string;
  onReset: () => void;
  onSave?: (data: { department: string; doctor: string }) => void;
}

type Department = typeof departments[number];

// Define department mapping with symptoms keywords
const departmentMapping = [
  {
    department: 'Cardiology',
    keywords: ['chest pain', 'heart', 'palpitation', 'blood pressure', 'hypertension', 'cardiac'],
    description: 'Deals with disorders of the heart and blood vessels.',
    location: 'Block A, 2nd Floor',
  },
  {
    department: 'Neurology',
    keywords: ['headache', 'migraine', 'seizure', 'brain', 'nerve', 'numbness', 'paralysis', 'stroke'],
    description: 'Specializes in disorders of the nervous system, including the brain and spinal cord.',
    location: 'Block B, 3rd Floor',
  },
  {
    department: 'Orthopedics',
    keywords: ['bone', 'joint', 'fracture', 'sprain', 'arthritis', 'knee', 'back pain', 'shoulder', 'hip'],
    description: 'Focuses on conditions involving the musculoskeletal system.',
    location: 'Block C, Ground Floor',
  },
  {
    department: 'Gastroenterology',
    keywords: ['stomach', 'abdomen', 'digestive', 'liver', 'vomiting', 'nausea', 'diarrhea', 'constipation'],
    description: 'Specializes in digestive system disorders.',
    location: 'Block A, 1st Floor',
  },
  {
    department: 'Pulmonology',
    keywords: ['lung', 'breathing', 'cough', 'asthma', 'respiratory', 'shortness of breath', 'pneumonia', 'tuberculosis'],
    description: 'Deals with diseases of the respiratory tract.',
    location: 'Block B, 1st Floor',
  },
  {
    department: 'Dermatology',
    keywords: ['skin', 'rash', 'itching', 'acne', 'eczema', 'psoriasis', 'allergy'],
    description: 'Specializes in conditions affecting the skin, hair, and nails.',
    location: 'Block D, 2nd Floor',
  },
  {
    department: 'ENT (Ear, Nose, and Throat)',
    keywords: ['ear', 'nose', 'throat', 'hearing', 'sinus', 'tonsil', 'voice'],
    description: 'Focuses on disorders of the ear, nose, throat, and related structures of the head and neck.',
    location: 'Block C, 1st Floor',
  },
  {
    department: 'Ophthalmology',
    keywords: ['eye', 'vision', 'glasses', 'cataract', 'glaucoma', 'blindness'],
    description: 'Specializes in eye and vision care.',
    location: 'Block D, 1st Floor',
  },
  {
    department: 'General Medicine',
    keywords: ['fever', 'cold', 'flu', 'infection', 'weakness', 'fatigue', 'general checkup'],
    description: 'Provides primary healthcare and treats a wide range of conditions.',
    location: 'Block A, Ground Floor',
  },
];

const DepartmentRecommendation: React.FC<DepartmentRecommendationProps> = ({
  symptoms,
  onReset,
  onSave,
}) => {
  const [recommendedDepartments, setRecommendedDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  
  useEffect(() => {
    // Simulate analysis delay
    const timer = setTimeout(() => {
      const results = analyzeSymptoms(symptoms);
      setRecommendedDepartments(results);
      if (results.length === 1) {
        setSelectedDepartment(results[0].name);
      }
      setIsAnalyzing(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [symptoms]);

  useEffect(() => {
    if (selectedDepartment) {
      const deptDoctors = doctors.filter(doc => doc.department === selectedDepartment)
        .map(doc => ({
          ...doc,
          availability: {
            days: [...doc.availability.days],
            timeSlots: [...doc.availability.timeSlots]
          }
        }));
      setAvailableDoctors(deptDoctors);
      if (deptDoctors.length === 1) {
        setSelectedDoctor(deptDoctors[0].id);
      }
    } else {
      setAvailableDoctors([]);
      setSelectedDoctor('');
    }
  }, [selectedDepartment]);
  
  const analyzeSymptoms = (symptomText: string): Department[] => {
    const lowerCaseSymptoms = symptomText.toLowerCase();
    
    // Find matching departments based on keywords
    const matches = departments.filter(dept => {
      const keywords = getKeywordsForDepartment(dept.name);
      return keywords.some(keyword => lowerCaseSymptoms.includes(keyword));
    });
    
    // If no matches, return General Medicine as default
    if (matches.length === 0) {
      const defaultDept = departments.find(dept => dept.name === 'General Medicine');
      return defaultDept ? [defaultDept] : [];
    }
    
    return matches;
  };

  const getKeywordsForDepartment = (department: string): string[] => {
    switch (department) {
      case 'Cardiology':
        return ['chest pain', 'heart', 'palpitation', 'blood pressure', 'hypertension', 'cardiac'];
      case 'Neurology':
        return ['headache', 'migraine', 'seizure', 'brain', 'nerve', 'numbness', 'paralysis', 'stroke'];
      case 'Orthopedics':
        return ['bone', 'joint', 'fracture', 'sprain', 'arthritis', 'knee', 'back pain', 'shoulder', 'hip'];
      case 'Gastroenterology':
        return ['stomach', 'abdomen', 'digestive', 'liver', 'vomiting', 'nausea', 'diarrhea', 'constipation'];
      case 'Pulmonology':
        return ['lung', 'breathing', 'cough', 'asthma', 'respiratory', 'shortness of breath', 'pneumonia'];
      case 'Dermatology':
        return ['skin', 'rash', 'itching', 'acne', 'eczema', 'psoriasis', 'allergy'];
      case 'ENT':
        return ['ear', 'nose', 'throat', 'hearing', 'sinus', 'tonsil', 'voice'];
      default:
        return ['fever', 'cold', 'flu', 'infection', 'weakness', 'fatigue', 'general checkup'];
    }
  };
  
  const handleDepartmentSelect = (deptName: string) => {
    setSelectedDepartment(deptName);
  };

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };

  const handleSave = () => {
    if (onSave && selectedDepartment && selectedDoctor) {
      onSave({
        department: selectedDepartment,
        doctor: selectedDoctor,
      });
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Department Recommendation</h2>
      
      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg">Analyzing symptoms...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="card bg-blue-50 border border-blue-200">
            <h3 className="text-lg font-medium text-blue-800">Based on your symptoms:</h3>
            <p className="text-gray-700 italic mt-2">"{symptoms}"</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Department:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedDepartments.map((dept, index) => (
                <button
                  key={index}
                  onClick={() => handleDepartmentSelect(dept.name)}
                  className={`card border-2 transition-all ${
                    selectedDepartment === dept.name
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{dept.name}</h4>
                      <p className="text-gray-700 mt-1">{dept.description}</p>
                      <p className="text-gray-600 mt-3">
                        <span className="font-medium">Location:</span> {dept.location}
                      </p>
                    </div>
                    {selectedDepartment === dept.name && (
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Selected
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedDepartment && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Doctor:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor.id)}
                    className={`card border-2 transition-all ${
                      selectedDoctor === doctor.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{doctor.name}</h4>
                        <p className="text-gray-700 mt-1">{doctor.specialization}</p>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Available:</span>{' '}
                            {doctor.availability.days.join(', ')}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Time:</span>{' '}
                            {doctor.availability.timeSlots.join(', ')}
                          </p>
                        </div>
                      </div>
                      {selectedDoctor === doctor.id && (
                        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Selected
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600">
              Please proceed to the selected department for further evaluation. 
              Your registration has been completed successfully.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={onReset}
              className="btn btn-secondary"
            >
              Register New Patient
            </button>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={!selectedDepartment || !selectedDoctor}
                className="btn btn-primary"
              >
                Save Selection
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="btn btn-outline"
              >
                Print Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentRecommendation; 