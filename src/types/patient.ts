import type { Language } from '@/translations';

export interface PatientData {
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
} 