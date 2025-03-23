export interface Doctor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  experience: number;
  availability: string[];
  consultationFee: number;
}

export interface Department {
  id: string;
  nameKey: string;
  descriptionKey: string;
  commonSymptoms: string[];
}

export const departments: Department[] = [
  {
    id: 'cardiology',
    nameKey: 'cardiologyDept',
    descriptionKey: 'cardiologyDesc',
    commonSymptoms: [
      'chestPain', 'shortnessOfBreath', 'fever', 'dizziness', 'fatigue',
      'nausea', 'vomiting', 'generalDiscomfort', 'headache', 'backPain',
      'jointPain', 'stomachPain', 'cold', 'cough', 'weightChanges',
      'rash', 'itching'
    ]
  },
  {
    id: 'orthopedics',
    nameKey: 'orthopedicsDept',
    descriptionKey: 'orthopedicsDesc',
    commonSymptoms: [
      'jointPain', 'backPain', 'headache', 'fever', 'generalDiscomfort',
      'fatigue', 'dizziness', 'weightChanges'
    ]
  },
  {
    id: 'neurology',
    nameKey: 'neurologyDept',
    descriptionKey: 'neurologyDesc',
    commonSymptoms: [
      'headache', 'dizziness', 'fever', 'nausea', 'vomiting',
      'fatigue', 'generalDiscomfort', 'weightChanges'
    ]
  },
  {
    id: 'pediatrics',
    nameKey: 'pediatricsDept',
    descriptionKey: 'pediatricsDesc',
    commonSymptoms: [
      'fever', 'cough', 'cold', 'stomachPain', 'rash',
      'vomiting', 'diarrhea', 'headache', 'fatigue', 'generalDiscomfort',
      'looseMotion'
    ]
  },
  {
    id: 'dermatology',
    nameKey: 'dermatologyDept',
    descriptionKey: 'dermatologyDesc',
    commonSymptoms: [
      'rash', 'itching', 'fever', 'generalDiscomfort'
    ]
  },
  {
    id: 'ent',
    nameKey: 'entDept',
    descriptionKey: 'entDesc',
    commonSymptoms: [
      'fever', 'headache', 'cold', 'cough', 'generalDiscomfort',
      'dizziness', 'nausea', 'vomiting'
    ]
  },
  {
    id: 'ophthalmology',
    nameKey: 'ophthalmologyDept',
    descriptionKey: 'ophthalmologyDesc',
    commonSymptoms: [
      'headache', 'fever', 'generalDiscomfort', 'dizziness'
    ]
  },
  {
    id: 'gastroenterology',
    nameKey: 'gastroenterologyDept',
    descriptionKey: 'gastroenterologyDesc',
    commonSymptoms: [
      'stomachPain', 'nausea', 'vomiting', 'diarrhea', 'constipation',
      'looseMotion', 'fever', 'generalDiscomfort', 'weightChanges'
    ]
  },
  {
    id: 'pulmonology',
    nameKey: 'pulmonologyDept',
    descriptionKey: 'pulmonologyDesc',
    commonSymptoms: [
      'cough', 'shortnessOfBreath', 'fever', 'chestPain', 'generalDiscomfort',
      'fatigue', 'weightChanges'
    ]
  },
  {
    id: 'endocrinology',
    nameKey: 'endocrinologyDept',
    descriptionKey: 'endocrinologyDesc',
    commonSymptoms: [
      'fatigue', 'weightChanges', 'generalDiscomfort', 'fever', 'headache',
      'dizziness'
    ]
  },
  {
    id: 'psychiatry',
    nameKey: 'psychiatryDept',
    descriptionKey: 'psychiatryDesc',
    commonSymptoms: [
      'headache', 'fatigue', 'generalDiscomfort', 'dizziness'
    ]
  },
  {
    id: 'gynecology',
    nameKey: 'gynecologyDept',
    descriptionKey: 'gynecologyDesc',
    commonSymptoms: [
      'fever', 'stomachPain', 'nausea', 'vomiting', 'headache',
      'fatigue', 'generalDiscomfort', 'weightChanges'
    ]
  },
  {
    id: 'general-medicine',
    nameKey: 'generalMedicineDept',
    descriptionKey: 'generalMedicineDesc',
    commonSymptoms: [
      'fever', 'headache', 'cough', 'cold', 'stomachPain',
      'nausea', 'vomiting', 'diarrhea', 'constipation', 'looseMotion',
      'jointPain', 'backPain', 'fatigue', 'dizziness', 'rash',
      'itching', 'generalDiscomfort', 'weightChanges'
    ]
  }
];

export const doctors: Doctor[] = [
  {
    id: 'dr-sharma',
    name: 'Dr. Sharma',
    department: 'cardiology',
    specialization: 'Interventional Cardiology',
    experience: 15,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1500
  },
  {
    id: 'dr-verma',
    name: 'Dr. Verma',
    department: 'cardiology',
    specialization: 'Clinical Cardiology',
    experience: 12,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1200
  },
  {
    id: 'dr-patel',
    name: 'Dr. Patel',
    department: 'orthopedics',
    specialization: 'Joint Replacement',
    experience: 12,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1300
  },
  {
    id: 'dr-mehta',
    name: 'Dr. Mehta',
    department: 'orthopedics',
    specialization: 'Sports Medicine',
    experience: 10,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1100
  },
  {
    id: 'dr-gupta',
    name: 'Dr. Gupta',
    department: 'neurology',
    specialization: 'Neurological Surgery',
    experience: 18,
    availability: ['Monday', 'Tuesday', 'Thursday'],
    consultationFee: 2000
  },
  {
    id: 'dr-joshi',
    name: 'Dr. Joshi',
    department: 'neurology',
    specialization: 'Clinical Neurology',
    experience: 14,
    availability: ['Wednesday', 'Friday', 'Saturday'],
    consultationFee: 1800
  },
  {
    id: 'dr-singh',
    name: 'Dr. Singh',
    department: 'pediatrics',
    specialization: 'Pediatric Care',
    experience: 10,
    availability: ['Wednesday', 'Friday', 'Saturday'],
    consultationFee: 1000
  },
  {
    id: 'dr-kaur',
    name: 'Dr. Kaur',
    department: 'pediatrics',
    specialization: 'Neonatal Care',
    experience: 8,
    availability: ['Monday', 'Tuesday', 'Thursday'],
    consultationFee: 900
  },
  {
    id: 'dr-kumar',
    name: 'Dr. Kumar',
    department: 'dermatology',
    specialization: 'Cosmetic Dermatology',
    experience: 8,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1200
  },
  {
    id: 'dr-shah',
    name: 'Dr. Shah',
    department: 'dermatology',
    specialization: 'Clinical Dermatology',
    experience: 11,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1400
  },
  {
    id: 'dr-reddy',
    name: 'Dr. Reddy',
    department: 'ent',
    specialization: 'ENT Surgery',
    experience: 14,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1600
  },
  {
    id: 'dr-rao',
    name: 'Dr. Rao',
    department: 'ent',
    specialization: 'Pediatric ENT',
    experience: 9,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1300
  },
  {
    id: 'dr-kapoor',
    name: 'Dr. Kapoor',
    department: 'ophthalmology',
    specialization: 'Cataract Surgery',
    experience: 16,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1400
  },
  {
    id: 'dr-malhotra',
    name: 'Dr. Malhotra',
    department: 'ophthalmology',
    specialization: 'Retina Specialist',
    experience: 13,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1600
  },
  {
    id: 'dr-chatterjee',
    name: 'Dr. Chatterjee',
    department: 'gastroenterology',
    specialization: 'Digestive Disorders',
    experience: 14,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1500
  },
  {
    id: 'dr-banerjee',
    name: 'Dr. Banerjee',
    department: 'gastroenterology',
    specialization: 'Hepatology',
    experience: 12,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1400
  },
  {
    id: 'dr-desai',
    name: 'Dr. Desai',
    department: 'pulmonology',
    specialization: 'Respiratory Medicine',
    experience: 15,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1600
  },
  {
    id: 'dr-iyer',
    name: 'Dr. Iyer',
    department: 'pulmonology',
    specialization: 'Sleep Medicine',
    experience: 11,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1300
  },
  {
    id: 'dr-nair',
    name: 'Dr. Nair',
    department: 'endocrinology',
    specialization: 'Diabetes Management',
    experience: 17,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1800
  },
  {
    id: 'dr-menon',
    name: 'Dr. Menon',
    department: 'endocrinology',
    specialization: 'Thyroid Disorders',
    experience: 13,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1600
  },
  {
    id: 'dr-khanna',
    name: 'Dr. Khanna',
    department: 'psychiatry',
    specialization: 'Adult Psychiatry',
    experience: 16,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 2000
  },
  {
    id: 'dr-bose',
    name: 'Dr. Bose',
    department: 'psychiatry',
    specialization: 'Child Psychiatry',
    experience: 12,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1800
  },
  {
    id: 'dr-roy',
    name: 'Dr. Roy',
    department: 'gynecology',
    specialization: 'Obstetrics',
    experience: 18,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1700
  },
  {
    id: 'dr-sen',
    name: 'Dr. Sen',
    department: 'gynecology',
    specialization: 'Reproductive Medicine',
    experience: 14,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1500
  },
  {
    id: 'dr-mishra',
    name: 'Dr. Mishra',
    department: 'general-medicine',
    specialization: 'Internal Medicine',
    experience: 20,
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 1200
  },
  {
    id: 'dr-agarwal',
    name: 'Dr. Agarwal',
    department: 'general-medicine',
    specialization: 'Family Medicine',
    experience: 15,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1000
  }
]; 