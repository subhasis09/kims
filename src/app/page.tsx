'use client';

import React, { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import VoiceRegistration from '@/components/VoiceRegistration';
import DoctorsList from '@/components/DoctorsList';
import PaymentPage from '@/components/PaymentPage';
import SuccessPage from '@/components/SuccessPage';
import SymptomsInput from '@/components/SymptomsInput';
import PredictionPreference from '@/components/PredictionPreference';
import ConsentForm from '@/components/ConsentForm';
import { Doctor } from '@/data/doctors';
import { Language, translations } from '@/translations';
import DepartmentPredictionChoice from '@/components/DepartmentPredictionChoice';

type Step = 'landing' | 'registration' | 'symptoms' | 'prediction-preference' | 'prediction-choice' | 'doctor-selection' | 'consent' | 'payment' | 'success';

interface PatientData {
  title: 'MR' | 'MRS' | 'MS' | 'OTHERS';
  name: string;
  guardianName: string;
  dateOfBirth: string;
  age: string | number;
  gender: 'MALE' | 'FEMALE' | 'OTHERS';
  bloodGroup: string;
  address: string;
  district: string;
  state: string;
  pinCode: string;
  country: string;
  phone: string;
  alternativePhone: string;
  doctorToConsult: string;
  unit: string;
  referringDoctor: string;
  email: string;
  nationality: string;
  religion: string;
  emergencyContact: string;
  language: Language;
  mrn?: string;
  isExisting?: boolean;
  symptoms?: string;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [symptoms, setSymptoms] = useState('');
  const [needsPredictionHelp, setNeedsPredictionHelp] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    title: 'MR',
    name: '',
    guardianName: '',
    dateOfBirth: '',
    age: '',
    gender: 'MALE',
    bloodGroup: '',
    address: '',
    district: '',
    state: '',
    pinCode: '',
    country: '',
    phone: '',
    alternativePhone: '',
    doctorToConsult: '',
    unit: '',
    referringDoctor: '',
    email: '',
    nationality: '',
    religion: '',
    emergencyContact: '',
    language: 'english' as Language,
    mrn: '',
    isExisting: false
  });
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [paymentId, setPaymentId] = useState<string>('');

  const t = translations[patientData.language];

  const handleExistingPatient = async (phone: string) => {
    // Here you would typically fetch patient data from your backend
    // For now, we'll simulate finding an existing patient
    const mockPatientData: PatientData = {
      ...patientData,
      title: 'MR',
      name: 'John Doe',
      guardianName: 'James Doe',
      dateOfBirth: '1988-01-01',
      age: '35',
      gender: 'MALE',
      bloodGroup: 'O+',
      address: '123 Main St',
      district: 'Bhubaneswar',
      state: 'Odisha',
      pinCode: '751024',
      country: 'India',
      phone: phone,
      alternativePhone: '',
      doctorToConsult: '',
      unit: '',
      referringDoctor: '',
      email: 'john.doe@example.com',
      nationality: 'Indian',
      religion: '',
      emergencyContact: '',
      mrn: 'MRN123456',
      isExisting: true
    };
    
    setPatientData(mockPatientData);
    setCurrentStep('prediction-preference');
  };

  const handleNewPatient = () => {
    setCurrentStep('registration');
  };

  const handlePatientDataUpdate = (data: Partial<PatientData>) => {
    setPatientData(prev => ({ ...prev, ...data }));
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep('consent');
  };

  const handlePaymentComplete = (id: string) => {
    setPaymentId(id);
    setCurrentStep('success');
  };

  const handleStartOver = () => {
    setCurrentStep('landing');
    setSymptoms('');
    setNeedsPredictionHelp(false);
    setSelectedDoctor(null);
    setPaymentId('');
    setPatientData({
      title: 'MR',
      name: '',
      guardianName: '',
      dateOfBirth: '',
      age: '',
      gender: 'MALE',
      bloodGroup: '',
      address: '',
      district: '',
      state: '',
      pinCode: '',
      country: '',
      phone: '',
      alternativePhone: '',
      doctorToConsult: '',
      unit: '',
      referringDoctor: '',
      email: '',
      nationality: '',
      religion: '',
      emergencyContact: '',
      language: 'english' as Language,
      mrn: '',
      isExisting: false
    });
  };

  const handlePredictionPreference = (wantsHelp: boolean) => {
    setNeedsPredictionHelp(wantsHelp);
    if (wantsHelp) {
      setCurrentStep('symptoms');
    } else {
      setCurrentStep('doctor-selection');
    }
  };

  const handlePredictionChoice = (choice: boolean) => {
    setCurrentStep('doctor-selection');
  };

  // Progress indicator steps
  const steps = [
    { id: 'registration', label: t.patientRegistration, hidden: patientData.isExisting },
    { id: 'prediction-preference', label: t.departmentHelp },
    { id: 'symptoms', label: t.symptoms, hidden: !needsPredictionHelp },
    { id: 'prediction-choice', label: t.predictionChoice, hidden: !needsPredictionHelp },
    { id: 'doctor-selection', label: t.selectDoctor },
    { id: 'consent', label: t.generalConsent },
    { id: 'payment', label: t.payment },
    { id: 'success', label: t.confirmation }
  ];

  // Modify the current step index to skip registration for existing patients
  const currentStepIndex = steps.findIndex(step => {
    if (step.hidden) {
      return false;
    }
    return step.id === currentStep;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {currentStep !== 'landing' && currentStep !== 'success' && (
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps
              .filter(step => !step.hidden)
              .map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index <= currentStepIndex
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span
                      className={`ml-2 text-sm ${
                        index <= currentStepIndex ? 'text-blue-500' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.filter(s => !s.hidden).length - 1 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        index < currentStepIndex ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      )}

      {currentStep === 'landing' && (
        <LandingPage
          onExistingPatient={handleExistingPatient}
          onNewPatient={handleNewPatient}
          onLanguageSelect={(lang: Language) => handlePatientDataUpdate({ language: lang })}
        />
      )}

      {currentStep === 'registration' && !patientData.isExisting && (
        <VoiceRegistration
          patientData={patientData}
          onDataUpdate={handlePatientDataUpdate}
          onNext={() => setCurrentStep('prediction-preference')}
        />
      )}

      {currentStep === 'prediction-preference' && (
        <PredictionPreference
          onChoice={handlePredictionPreference}
          isExistingPatient={patientData.isExisting}
          patientName={patientData.name}
          language={patientData.language}
        />
      )}

      {currentStep === 'symptoms' && (
        <SymptomsInput
          symptoms={symptoms}
          onSymptomsChange={setSymptoms}
          language={patientData.language}
          onNext={() => setCurrentStep('doctor-selection')}
        />
      )}

      {currentStep === 'prediction-choice' && (
        <DepartmentPredictionChoice
          onChoice={handlePredictionChoice}
          isExistingPatient={patientData.isExisting}
          patientName={patientData.name}
          language={patientData.language}
          onNext={() => setCurrentStep('doctor-selection')}
        />
      )}

      {currentStep === 'doctor-selection' && (
        <DoctorsList
          onDoctorSelect={handleDoctorSelect}
          patientSymptoms={needsPredictionHelp ? symptoms : undefined}
          showRecommendations={false}
          onBack={() => setCurrentStep(needsPredictionHelp ? 'symptoms' : 'prediction-preference')}
          language={patientData.language}
        />
      )}

      {currentStep === 'consent' && selectedDoctor && (
        <ConsentForm
          language={patientData.language}
          onNext={() => setCurrentStep('payment')}
          onBack={() => setCurrentStep('doctor-selection')}
        />
      )}

      {currentStep === 'payment' && selectedDoctor && (
        <PaymentPage
          doctor={selectedDoctor}
          onPaymentComplete={handlePaymentComplete}
          onBack={() => setCurrentStep('consent')}
          language={patientData.language}
        />
      )}

      {currentStep === 'success' && selectedDoctor && (
        <SuccessPage
          doctor={selectedDoctor}
          patientName={patientData.name}
          paymentId={paymentId}
          onStartOver={handleStartOver}
          language={patientData.language}
        />
      )}
    </main>
  );
} 