
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsult: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onConsult,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Schedule your consultation with{" "}
            <span className="font-semibold">our specialists</span> today! 🎉
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex overflow-hidden rounded-lg">
            <img
              src="/lovable-uploads/7dad4d1d-d6ef-4051-8170-c78e7114db0f.png"
              alt="Healthcare consultations"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="p-1">🏥</span>
              <span>Virtual Consultations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-1">👨‍⚕️</span>
              <span>Experienced Specialists</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-1">⏱️</span>
              <span>Quick Appointments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-1">🔄</span>
              <span>Comprehensive Care</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-1">👤</span>
              <span>Personalized Treatment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-1">📞</span>
              <span>Follow-up Support</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex space-x-2 justify-center sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onConsult} 
            className="bg-zencare-purple hover:bg-purple-700 text-white"
          >
            Consult Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
