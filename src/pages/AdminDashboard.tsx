
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import StatCard from "@/components/StatCard";
import AppointmentCharts from "@/components/AppointmentCharts";
import PriorityAlerts from "@/components/PriorityAlerts";
import TaskManager from "@/components/TaskManager";
import PatientDetailsModal from "@/components/PatientDetailsModal";
import { Calendar, XCircle, Clock, Search } from "lucide-react";
import { 
  getAppointments, 
  getAppointmentStats, 
  updateAppointmentStatus, 
  getPatientByName,
  getWeeklyAppointmentData,
  getAppointmentDistributionData,
  getPriorityAlerts,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  contactPatient,
  scheduleUrgentAppointment,
  Appointment,
  Patient,
  Task,
  Alert
} from "@/services/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // State for data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    scheduled: 0,
    pending: 0,
    cancelled: 0,
  });
  const [weeklyData, setWeeklyData] = useState<{date: string; count: number}[]>([]);
  const [distributionData, setDistributionData] = useState<{name: string; value: number; color: string}[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // State for UI
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientModalOpen, setPatientModalOpen] = useState(false);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          appointmentsData, 
          statsData, 
          weeklyAppointments,
          distributionData,
          alertsData,
          tasksData
        ] = await Promise.all([
          getAppointments(),
          getAppointmentStats(),
          getWeeklyAppointmentData(),
          getAppointmentDistributionData(),
          getPriorityAlerts(),
          getTasks()
        ]);
        
        setAppointments(appointmentsData);
        setFilteredAppointments(appointmentsData);
        setStats(statsData);
        setWeeklyData(weeklyAppointments);
        setDistributionData(distributionData);
        setAlerts(alertsData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter appointments based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(app => 
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAppointments(filtered);
    }
  }, [searchQuery, appointments]);

  // Handle appointment status change
  const handleStatusChange = async (id: string, status: "scheduled" | "pending" | "cancelled") => {
    try {
      await updateAppointmentStatus(id, status);
      // Update local state
      setAppointments(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      );
      setFilteredAppointments(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      );
      // Refetch stats and distribution data
      const [statsData, newDistribution] = await Promise.all([
        getAppointmentStats(),
        getAppointmentDistributionData()
      ]);
      setStats(statsData);
      setDistributionData(newDistribution);
      
      toast.success(`Appointment status updated to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update appointment status");
    }
  };

  // Handle viewing patient details
  const handleViewPatient = async (patientName: string) => {
    try {
      const patient = await getPatientByName(patientName);
      if (patient) {
        setSelectedPatient(patient);
        setPatientModalOpen(true);
      } else {
        toast.error("Patient not found");
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
      toast.error("Failed to load patient information");
    }
  };

  // Handle patient alerts
  const handleContactPatient = async (patientId: string) => {
    try {
      await contactPatient(patientId);
      toast.success("Patient contact initiated");
    } catch (error) {
      console.error("Error contacting patient:", error);
      toast.error("Failed to initiate patient contact");
    }
  };

  const handleScheduleUrgent = async (patientId: string) => {
    try {
      await scheduleUrgentAppointment(patientId);
      toast.success("Urgent appointment scheduled");
    } catch (error) {
      console.error("Error scheduling urgent appointment:", error);
      toast.error("Failed to schedule urgent appointment");
    }
  };

  // Handle task management
  const handleAddTask = async (description: string) => {
    try {
      const newTask = await addTask(description);
      setTasks(prev => [...prev, newTask]);
      toast.success("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, completed);
      setTasks(prev => 
        prev.map(task => task.id === id ? { ...task, completed } : task)
      );
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success("Task removed");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ZENCARE</h1>
          </div>
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <div>
            <Button variant="outline" asChild>
              <Link to="/">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome 👋</h1>
          <p className="text-gray-600">Start the day with managing new appointments</p>
        </div>
        
        {/* Stats and Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Scheduled appointments"
            value={stats.scheduled}
            icon={<Calendar />}
          />
          <StatCard
            title="Pending appointments"
            value={stats.pending}
            icon={<Clock />}
          />
          <StatCard
            title="Cancelled appointments"
            value={stats.cancelled}
            icon={<XCircle />}
          />
        </div>
        
        {/* Analytics Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AppointmentCharts 
            weeklyData={weeklyData} 
            statsData={distributionData}
          />
          
          {/* Priority Alerts Section */}
          <div className="col-span-1">
            <PriorityAlerts 
              alerts={alerts}
              onContactPatient={handleContactPatient}
              onScheduleUrgent={handleScheduleUrgent}
            />
          </div>
        </div>
        
        {/* Task Manager and Appointments Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1">
            <TaskManager 
              tasks={tasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Appointments</h2>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="p-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : filteredAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          {searchQuery ? "No matching appointments found" : "No appointments found"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            <button
                              onClick={() => handleViewPatient(appointment.patientName)}
                              className="text-blue-600 hover:underline"
                            >
                              {appointment.patientName}
                            </button>
                          </TableCell>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                appointment.status === "scheduled"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {appointment.status !== "scheduled" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStatusChange(appointment.id, "scheduled")}
                                >
                                  Schedule
                                </Button>
                              )}
                              {appointment.status !== "cancelled" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStatusChange(appointment.id, "cancelled")}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Patient Details Modal */}
      <PatientDetailsModal
        patient={selectedPatient}
        isOpen={patientModalOpen}
        onClose={() => setPatientModalOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;
