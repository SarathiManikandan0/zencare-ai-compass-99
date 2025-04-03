
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, Calendar, ExternalLink } from "lucide-react";

export interface AlertItem {
  id: string;
  patientName: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

interface PriorityAlertsProps {
  alerts: AlertItem[];
  onContactPatient: (patientId: string) => void;
  onScheduleUrgent: (patientId: string) => void;
}

const PriorityAlerts: React.FC<PriorityAlertsProps> = ({ 
  alerts, 
  onContactPatient, 
  onScheduleUrgent 
}) => {
  // Helper function to get priority badge class
  const getPriorityClass = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span>Priority Alerts</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No priority alerts at this time
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{alert.patientName}</div>
                    <div className="text-sm text-muted-foreground">{alert.date}</div>
                    <div className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(alert.priority)}`}>
                        {alert.priority} priority
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => window.open(`#patient/${alert.id}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-sm">{alert.reason}</div>
                <div className="mt-3 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs" 
                    onClick={() => onContactPatient(alert.id)}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => onScheduleUrgent(alert.id)}
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Schedule Urgent
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriorityAlerts;
