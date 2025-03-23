import { Patient } from '@/types/database';

const STORAGE_KEY = 'kiims_patients';

export const patientService = {
  getAllPatients(): Patient[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addPatient(patient: Omit<Patient, 'id' | 'registrationDate' | 'status'>): Patient {
    const patients = this.getAllPatients();
    const newPatient: Patient = {
      ...patient,
      id: `PAT${Date.now()}`,
      registrationDate: new Date().toISOString(),
      status: 'registered'
    };
    
    patients.push(newPatient);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    return newPatient;
  },

  updatePatient(id: string, updates: Partial<Patient>): Patient | null {
    const patients = this.getAllPatients();
    const index = patients.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    const updatedPatient = {
      ...patients[index],
      ...updates
    };
    
    patients[index] = updatedPatient;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    return updatedPatient;
  },

  getPatientById(id: string): Patient | null {
    const patients = this.getAllPatients();
    return patients.find(p => p.id === id) || null;
  },

  searchPatients(query: string): Patient[] {
    const patients = this.getAllPatients();
    const lowerQuery = query.toLowerCase();
    
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(lowerQuery) ||
      patient.phone.includes(query) ||
      patient.symptoms.toLowerCase().includes(lowerQuery)
    );
  },

  getPatientsByDepartment(department: string): Patient[] {
    const patients = this.getAllPatients();
    return patients.filter(p => p.assignedDepartment === department);
  },

  getPatientsByDoctor(doctorId: string): Patient[] {
    const patients = this.getAllPatients();
    return patients.filter(p => p.assignedDoctor === doctorId);
  },

  getTodaysPatients(): Patient[] {
    const patients = this.getAllPatients();
    const today = new Date().toISOString().split('T')[0];
    
    return patients.filter(patient => 
      patient.registrationDate.startsWith(today)
    );
  }
}; 