export interface Appointment {
  id: string
  patientName: string
  birthDate: Date
  age: number
  gender: string
  maritalStatus: string
  phone: string
  commercialPhone: string | null
  address: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  emergencyContact: string
  education: string
  profession: string
  clinicalDiagnosis: string | null
  symptoms: string[] | null
  symptomsDescription: string | null
  hasInsurance: boolean
  insuranceDescription: string | null
  selectedDate: Date
  selectedTime: string
  createdAt: Date
  updatedAt: Date
  userId: string | null
  status: string
}
