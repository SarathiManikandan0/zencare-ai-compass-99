
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
import StatCard from "@/components/StatCard";
import { Calendar, XCircle, Clock } from "lucide-react";
import { getAppointments, getAppointmentStats, updateAppointmentStatus, Appointment } from "@/services/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    scheduled: 0,
    pending: 0,
    cancelled: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [appointmentsData, statsData] = await Promise.all([
          getAppointments(),
          getAppointmentStats(),
        ]);
        setAppointments(appointmentsData);
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, status: "scheduled" | "pending" | "cancelled") => {
    try {
      await updateAppointmentStatus(id, status);
      // Update local state
      setAppointments(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      );
      // Refetch stats
      const statsData = await getAppointmentStats();
      setStats(statsData);
      
      toast.success(`Appointment status updated to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update appointment status");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">ZENCARE</h1>
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
        
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Recent Appointments</h2>
          </div>
          
          <div className="p-4">
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
                ) : appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patientName}</TableCell>
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
      </main>
    </div>
  );
};

export default AdminDashboard;
