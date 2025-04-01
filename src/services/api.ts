
// This would normally connect to a backend API
// For now, we'll use mock data and simulated responses

type AppointmentStatus = "scheduled" | "pending" | "cancelled";

export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  { id: "1", patientName: "John Doe", date: "2023-06-15", time: "10:00 AM", status: "scheduled" },
  { id: "2", patientName: "Jane Smith", date: "2023-06-16", time: "11:30 AM", status: "scheduled" },
  { id: "3", patientName: "Robert Johnson", date: "2023-06-17", time: "2:00 PM", status: "pending" },
  { id: "4", patientName: "Emily Davis", date: "2023-06-18", time: "3:30 PM", status: "pending" },
  { id: "5", patientName: "Michael Brown", date: "2023-06-19", time: "9:00 AM", status: "cancelled" },
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
