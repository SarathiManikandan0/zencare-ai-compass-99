
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Patient } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, NotebookIcon } from "lucide-react";

interface PatientDetailsModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({
  patient,
  isOpen,
  onClose
}) => {
  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{patient.name}</DialogTitle>
          <DialogDescription>
            Patient ID: {patient.id} | Age: {patient.age}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="trends">Mood Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Email:</span> {patient.email}</div>
                    <div><span className="font-medium">Phone:</span> {patient.phone}</div>
                    <div><span className="font-medium">Address:</span> {patient.address}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Last Visit:</span> {patient.lastAppointment}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Next Visit:</span> {patient.nextAppointment || "None scheduled"}
                    </div>
                    <div>
                      <span className="font-medium">Total Visits:</span> {patient.totalVisits}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Diagnosis:</span> {patient.diagnosis.join(", ")}</div>
                  <div><span className="font-medium">Medications:</span> {patient.medications.join(", ")}</div>
                  <div><span className="font-medium">Allergies:</span> {patient.allergies.join(", ") || "None"}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Treatment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.treatmentHistory.map((treatment, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="font-medium text-sm">{treatment.date}</div>
                      <div className="text-sm mt-1">{treatment.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Session Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.notes.map((note, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="font-medium text-sm">{note.date} - {note.author}</div>
                      <div className="text-sm mt-1">{note.content}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Mood Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  {patient.moodData && patient.moodData.length > 0 ? (
                    <div className="w-full h-full">
                      {/* Placeholder for mood chart - will be implemented with recharts */}
                      <div className="text-center text-muted-foreground">
                        Mood data visualization would display here
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      No mood data available for this patient
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;
