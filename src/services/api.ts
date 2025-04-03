
// This would normally connect to a backend API
// For now, we'll use mock data and simulated responses

type AppointmentStatus = "scheduled" | "pending" | "cancelled";

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  diagnosis: string[];
  medications: string[];
  allergies: string[];
  lastAppointment: string;
  nextAppointment: string | null;
  totalVisits: number;
  treatmentHistory: { date: string; description: string }[];
  notes: { date: string; author: string; content: string }[];
  moodData?: { date: string; value: number }[];
  status?: "active" | "inactive";
  priority?: "high" | "medium" | "low";
}

export interface Task {
  id: string;
  description: string;
  completed: boolean;
  date: string;
}

export interface Alert {
  id: string;
  patientName: string;
  patientId: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  { id: "1", patientId: "p1", patientName: "John Doe", date: "2023-06-15", time: "10:00 AM", status: "scheduled" },
  { id: "2", patientId: "p2", patientName: "Jane Smith", date: "2023-06-16", time: "11:30 AM", status: "scheduled" },
  { id: "3", patientId: "p3", patientName: "Robert Johnson", date: "2023-06-17", time: "2:00 PM", status: "pending" },
  { id: "4", patientId: "p4", patientName: "Emily Davis", date: "2023-06-18", time: "3:30 PM", status: "pending" },
  { id: "5", patientId: "p5", patientName: "Michael Brown", date: "2023-06-19", time: "9:00 AM", status: "cancelled" },
];

// Mock data for patients
const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "John Doe",
    age: 35,
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    diagnosis: ["Major Depressive Disorder", "Generalized Anxiety Disorder"],
    medications: ["Sertraline 50mg", "Lorazepam 0.5mg (as needed)"],
    allergies: ["Penicillin"],
    lastAppointment: "2023-05-30",
    nextAppointment: "2023-06-15",
    totalVisits: 8,
    treatmentHistory: [
      { date: "2023-05-30", description: "Therapy session - Discussed work stressors and coping strategies" },
      { date: "2023-05-15", description: "Medication review - Increased Sertraline to 50mg" },
      { date: "2023-04-28", description: "Initial assessment - Diagnosed with MDD and GAD" }
    ],
    notes: [
      { date: "2023-05-30", author: "Dr. Smith", content: "Patient reports improved sleep but still experiencing anxiety in social situations. Continuing with current treatment plan." },
      { date: "2023-05-15", author: "Dr. Smith", content: "Patient reports minimal improvement. Increasing Sertraline dosage and recommending daily mindfulness practice." },
      { date: "2023-04-28", author: "Dr. Smith", content: "Initial visit. Patient presents with symptoms of depression and anxiety ongoing for 6 months. Starting medication and weekly therapy." }
    ],
    moodData: [
      { date: "2023-05-30", value: 6 },
      { date: "2023-05-23", value: 5 },
      { date: "2023-05-16", value: 4 },
      { date: "2023-05-09", value: 3 },
      { date: "2023-05-02", value: 2 },
      { date: "2023-04-25", value: 3 }
    ]
  },
  {
    id: "p2",
    name: "Jane Smith",
    age: 28,
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Somewhere, USA",
    diagnosis: ["Post-Traumatic Stress Disorder", "Insomnia"],
    medications: ["Prazosin 2mg", "Trazodone 50mg"],
    allergies: [],
    lastAppointment: "2023-06-01",
    nextAppointment: "2023-06-16",
    totalVisits: 12,
    treatmentHistory: [
      { date: "2023-06-01", description: "Therapy session - EMDR treatment for trauma processing" },
      { date: "2023-05-18", description: "Therapy session - Continued EMDR treatment" },
      { date: "2023-05-04", description: "Medication review - Added Trazodone for insomnia" }
    ],
    notes: [
      { date: "2023-06-01", author: "Dr. Johnson", content: "Patient showing good progress with EMDR. Nightmares decreasing in frequency." },
      { date: "2023-05-18", author: "Dr. Johnson", content: "Patient engaged well in EMDR session. Still experiencing sleep disturbances but less severe." },
      { date: "2023-05-04", author: "Dr. Johnson", content: "Patient reports continued insomnia despite Prazosin. Adding Trazodone to treatment plan." }
    ],
    moodData: [
      { date: "2023-06-01", value: 7 },
      { date: "2023-05-25", value: 6 },
      { date: "2023-05-18", value: 5 },
      { date: "2023-05-11", value: 4 },
      { date: "2023-05-04", value: 3 }
    ]
  },
  {
    id: "p3",
    name: "Robert Johnson",
    age: 42,
    email: "robert.johnson@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine St, Elsewhere, USA",
    diagnosis: ["Bipolar Disorder Type II"],
    medications: ["Lamotrigine 200mg", "Quetiapine 50mg"],
    allergies: ["Sulfa drugs"],
    lastAppointment: "2023-05-25",
    nextAppointment: "2023-06-17",
    totalVisits: 15,
    treatmentHistory: [
      { date: "2023-05-25", description: "Medication management - Stable on current regimen" },
      { date: "2023-04-27", description: "Therapy session - Discussed triggers for hypomanic episodes" },
      { date: "2023-03-30", description: "Medication adjustment - Increased Lamotrigine to 200mg" }
    ],
    notes: [
      { date: "2023-05-25", author: "Dr. Garcia", content: "Patient stable. No significant mood episodes in past month. Continuing with current medications." },
      { date: "2023-04-27", author: "Dr. Garcia", content: "Patient identified work deadlines as trigger for hypomanic symptoms. Developed plan to manage stress during these periods." },
      { date: "2023-03-30", author: "Dr. Garcia", content: "Patient experiencing mild breakthrough depressive symptoms. Increasing Lamotrigine dose gradually." }
    ],
    moodData: [
      { date: "2023-05-25", value: 6 },
      { date: "2023-05-18", value: 7 },
      { date: "2023-05-11", value: 8 },
      { date: "2023-05-04", value: 6 },
      { date: "2023-04-27", value: 5 }
    ]
  },
  {
    id: "p4",
    name: "Emily Davis",
    age: 23,
    email: "emily.davis@example.com",
    phone: "(555) 789-0123",
    address: "101 Maple Dr, Anywhere, USA",
    diagnosis: ["Social Anxiety Disorder", "Panic Disorder"],
    medications: ["Escitalopram 20mg", "Propranolol 10mg (as needed)"],
    allergies: [],
    lastAppointment: "2023-05-28",
    nextAppointment: "2023-06-18",
    totalVisits: 6,
    treatmentHistory: [
      { date: "2023-05-28", description: "Therapy session - Exposure therapy for social situations" },
      { date: "2023-05-14", description: "Therapy session - Cognitive behavioral techniques for panic attacks" },
      { date: "2023-04-30", description: "Initial assessment - Diagnosed with Social Anxiety and Panic Disorder" }
    ],
    notes: [
      { date: "2023-05-28", author: "Dr. Wilson", content: "Patient successfully completed exposure exercise at small gathering. Continuing to work on cognitive restructuring." },
      { date: "2023-05-14", author: "Dr. Wilson", content: "Patient reports two panic attacks this week. Reviewed breathing techniques and introduced thought challenging worksheets." },
      { date: "2023-04-30", author: "Dr. Wilson", content: "Initial assessment. Patient experiencing significant social anxiety and panic attacks for past year. Starting medication and weekly CBT." }
    ],
    moodData: [
      { date: "2023-05-28", value: 5 },
      { date: "2023-05-21", value: 4 },
      { date: "2023-05-14", value: 3 },
      { date: "2023-05-07", value: 3 },
      { date: "2023-04-30", value: 2 }
    ]
  },
  {
    id: "p5",
    name: "Michael Brown",
    age: 31,
    email: "michael.brown@example.com",
    phone: "(555) 234-5678",
    address: "202 Elm Blvd, Someplace, USA",
    diagnosis: ["Attention-Deficit/Hyperactivity Disorder", "Adjustment Disorder"],
    medications: ["Methylphenidate 20mg"],
    allergies: ["Latex"],
    lastAppointment: "2023-05-22",
    nextAppointment: "2023-06-19",
    totalVisits: 4,
    treatmentHistory: [
      { date: "2023-05-22", description: "Medication review - Adjusted timing of ADHD medication" },
      { date: "2023-05-08", description: "Therapy session - Organizational strategies for ADHD management" },
      { date: "2023-04-24", description: "Initial assessment - Diagnosed with ADHD and Adjustment Disorder" }
    ],
    notes: [
      { date: "2023-05-22", author: "Dr. Thompson", content: "Patient reports medication wearing off too early. Adjusted to split dosing schedule for better afternoon coverage." },
      { date: "2023-05-08", author: "Dr. Thompson", content: "Introduced time management techniques and recommended digital tools for organization. Patient engaged and motivated." },
      { date: "2023-04-24", author: "Dr. Thompson", content: "Initial assessment. Patient struggling with focus, organization, and adjustment to new job. Starting medication and supportive therapy." }
    ],
    moodData: [
      { date: "2023-05-22", value: 6 },
      { date: "2023-05-15", value: 5 },
      { date: "2023-05-08", value: 4 },
      { date: "2023-05-01", value: 4 },
      { date: "2023-04-24", value: 3 }
    ]
  }
];

// Mock data for weekly appointment counts
const mockWeeklyData = [
  { date: "Mon", count: 3 },
  { date: "Tue", count: 5 },
  { date: "Wed", count: 2 },
  { date: "Thu", count: 4 },
  { date: "Fri", count: 6 },
  { date: "Sat", count: 1 },
  { date: "Sun", count: 0 },
];

// Mock data for priority alerts
const mockAlerts: Alert[] = [
  {
    id: "a1",
    patientId: "p3",
    patientName: "Robert Johnson",
    reason: "Missed 2 consecutive appointments",
    priority: "high",
    date: "2023-06-10"
  },
  {
    id: "a2",
    patientId: "p4",
    patientName: "Emily Davis",
    reason: "Reported increased anxiety symptoms",
    priority: "medium",
    date: "2023-06-12"
  },
  {
    id: "a3",
    patientId: "p1",
    patientName: "John Doe",
    reason: "Medication refill needed",
    priority: "low",
    date: "2023-06-14"
  }
];

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: "t1",
    description: "Follow up with John Doe about medication side effects",
    completed: false,
    date: "2023-06-15"
  },
  {
    id: "t2",
    description: "Review Emily Davis's anxiety assessment results",
    completed: false,
    date: "2023-06-16"
  },
  {
    id: "t3",
    description: "Prepare monthly patient progress report",
    completed: true,
    date: "2023-06-10"
  },
  {
    id: "t4",
    description: "Call pharmacy about Robert Johnson's prescription",
    completed: false,
    date: "2023-06-17"
  }
];

// Mock API functions

export const getAppointments = async (): Promise<Appointment[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAppointments), 500);
  });
};

export const getAppointmentStats = async () => {
  // Count appointments by status
  const scheduled = mockAppointments.filter(a => a.status === "scheduled").length;
  const pending = mockAppointments.filter(a => a.status === "pending").length;
  const cancelled = mockAppointments.filter(a => a.status === "cancelled").length;
  
  return { scheduled, pending, cancelled };
};

export const updateAppointmentStatus = async (id: string, status: AppointmentStatus): Promise<Appointment> => {
  // Find and update the appointment
  const appointment = mockAppointments.find(a => a.id === id);
  if (!appointment) {
    throw new Error("Appointment not found");
  }
  
  appointment.status = status;
  
  return appointment;
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  // Find the patient
  const patient = mockPatients.find(p => p.id === id);
  if (!patient) {
    return null;
  }
  
  return patient;
};

export const getPatientByName = async (patientName: string): Promise<Patient | null> => {
  // Find patient by appointment
  const appointment = mockAppointments.find(a => a.patientName === patientName);
  if (!appointment) {
    return null;
  }
  
  const patient = mockPatients.find(p => p.id === appointment.patientId);
  return patient || null;
};

export const getWeeklyAppointmentData = async () => {
  return mockWeeklyData;
};

export const getAppointmentDistributionData = async () => {
  const stats = await getAppointmentStats();
  
  return [
    { name: "Scheduled", value: stats.scheduled, color: "#10b981" },
    { name: "Pending", value: stats.pending, color: "#f59e0b" },
    { name: "Cancelled", value: stats.cancelled, color: "#ef4444" }
  ];
};

export const getPriorityAlerts = async () => {
  return mockAlerts;
};

export const getTasks = async () => {
  return mockTasks;
};

export const addTask = async (description: string): Promise<Task> => {
  const newTask: Task = {
    id: `t${mockTasks.length + 1}`,
    description,
    completed: false,
    date: new Date().toISOString().split('T')[0]
  };
  
  mockTasks.push(newTask);
  return newTask;
};

export const updateTask = async (id: string, completed: boolean): Promise<Task> => {
  const task = mockTasks.find(t => t.id === id);
  if (!task) {
    throw new Error("Task not found");
  }
  
  task.completed = completed;
  return task;
};

export const deleteTask = async (id: string): Promise<void> => {
  const index = mockTasks.findIndex(t => t.id === id);
  if (index !== -1) {
    mockTasks.splice(index, 1);
  }
};

export const contactPatient = async (patientId: string): Promise<boolean> => {
  // Simulate contacting a patient (in a real app, this might send an email/SMS)
  console.log(`Contacting patient with ID: ${patientId}`);
  return true;
};

export const scheduleUrgentAppointment = async (patientId: string): Promise<boolean> => {
  // Simulate scheduling an urgent appointment
  console.log(`Scheduling urgent appointment for patient with ID: ${patientId}`);
  return true;
};

// Simulated chat responses from AI
export const getAIResponse = async (message: string): Promise<string> => {
  // Simulate API call to AI service
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple response logic based on keywords
      if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
        resolve("Hello! I'm ZENCARE, your friendly AI mental health support assistant. I'm here to listen and help you with any thoughts or feelings you might be experiencing. How can I assist you today?");
      } else if (
        message.toLowerCase().includes("mental health") || 
        message.toLowerCase().includes("support") ||
        message.toLowerCase().includes("take care")
      ) {
        resolve("Yes, that's right! I'm here to provide support for your mental health. I can listen to what you're going through, offer mindfulness exercises, self-care suggestions, and help you manage your feelings. Whatever you need, I'm here for you. How are you feeling?");
      } else if (
        message.toLowerCase().includes("sad") || 
        message.toLowerCase().includes("depressed") ||
        message.toLowerCase().includes("anxious") ||
        message.toLowerCase().includes("worry")
      ) {
        resolve("I'm sorry to hear you're feeling this way. It's completely normal to experience these emotions sometimes. Would you like to try a quick mindfulness exercise, or perhaps talk more about what's causing these feelings?");
      } else if (
        message.toLowerCase().includes("suicide") || 
        message.toLowerCase().includes("kill myself") ||
        message.toLowerCase().includes("end my life")
      ) {
        resolve("I'm really concerned about what you're sharing. These thoughts are serious, and it's important you speak with a mental health professional right away. Please call the National Suicide Prevention Lifeline at 988, or text HOME to 741741 to reach the Crisis Text Line. Would you like me to help you schedule an emergency consultation with one of our specialists?");
      } else {
        resolve("I appreciate you sharing that with me. How are you feeling about this situation, and is there a specific way I can support you right now? I'm here to listen and help in any way I can.");
      }
    }, 1000);
  });
};
