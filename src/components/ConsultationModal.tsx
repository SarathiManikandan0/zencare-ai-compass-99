
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsult: () => void;
}

// Generate time slots from 9 AM to 5 PM
const timeSlots = Array.from({ length: 17 }, (_, i) => {
  const hour = Math.floor((i + 18) / 2); // Start at 9 AM (9 + 0/2)
  const minute = i % 2 === 0 ? "00" : "30";
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${hour12}:${minute} ${ampm}`;
});

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onConsult,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !date || !time || !reason) {
      toast.error("Please fill out all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onConsult();
      toast.success("Consultation request submitted successfully");
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setName("");
        setEmail("");
        setDate(undefined);
        setTime(undefined);
        setReason("");
      }, 2000);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule a Consultation</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a consultation with one of our mental health professionals.
          </DialogDescription>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-center">Request Confirmed</h3>
            <p className="text-center text-muted-foreground mt-2">
              Your consultation has been scheduled for{" "}
              <span className="font-medium">
                {date && format(date, "MMMM d, yyyy")} at {time}
              </span>
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <Select onValueChange={setTime}>
                  <SelectTrigger className={cn(!time && "text-muted-foreground")}>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Consultation</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us a bit about what you'd like to discuss..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {!isSuccess && (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-zencare-purple hover:bg-purple-700"
            >
              {isSubmitting ? "Submitting..." : "Schedule Consultation"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
