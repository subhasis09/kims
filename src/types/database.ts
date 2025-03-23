export interface Doctor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  availability: {
    days: string[];
    timeSlots: string[];
  };
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  symptoms: string;
  registrationDate: string;
  language: string;
  assignedDoctor?: string;
  assignedDepartment?: string;
  status: 'registered' | 'in-consultation' | 'completed';
}

export const departments = [
  {
    name: 'Cardiology',
    description: 'Deals with disorders of the heart and blood vessels.',
    location: 'Block A, 2nd Floor',
  },
  {
    name: 'Neurology',
    description: 'Specializes in disorders of the nervous system.',
    location: 'Block B, 3rd Floor',
  },
  {
    name: 'Orthopedics',
    description: 'Focuses on conditions involving the musculoskeletal system.',
    location: 'Block C, Ground Floor',
  },
  {
    name: 'Gastroenterology',
    description: 'Specializes in digestive system disorders.',
    location: 'Block A, 1st Floor',
  },
  {
    name: 'Pulmonology',
    description: 'Deals with diseases of the respiratory tract.',
    location: 'Block B, 1st Floor',
  },
  {
    name: 'Dermatology',
    description: 'Specializes in conditions affecting the skin.',
    location: 'Block D, 2nd Floor',
  },
  {
    name: 'ENT',
    description: 'Focuses on ear, nose, throat disorders.',
    location: 'Block C, 1st Floor',
  },
  {
    name: 'General Medicine',
    description: 'Provides primary healthcare services.',
    location: 'Block A, Ground Floor',
  },
] as const;

export const doctors = [
  {
    id: 'doc1',
    name: 'Dr. Rajesh Kumar',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['09:00-13:00', '15:00-18:00'],
    },
  },
  {
    id: 'doc2',
    name: 'Dr. Priya Singh',
    department: 'Neurology',
    specialization: 'Neurophysiology',
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['10:00-14:00', '16:00-19:00'],
    },
  },
  {
    id: 'doc3',
    name: 'Dr. Amit Patel',
    department: 'Orthopedics',
    specialization: 'Joint Replacement',
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday'],
      timeSlots: ['09:00-13:00', '15:00-18:00'],
    },
  },
  {
    id: 'doc4',
    name: 'Dr. Sneha Reddy',
    department: 'General Medicine',
    specialization: 'Internal Medicine',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      timeSlots: ['09:00-17:00'],
    },
  },
] as const; 