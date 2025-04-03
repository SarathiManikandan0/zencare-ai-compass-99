
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
import { Textarea } from "@/components/ui/textarea";

interface LoginQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: number, challenges: string) => void;
}

const LoginQuestionsModal: React.FC<LoginQuestionsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [mood, setMood] = useState<number | null>(null);
  const [challenges, setChallenges] = useState("");

  const handleSubmit = () => {
    if (mood !== null) {
      onSubmit(mood, challenges);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome back to ZENCARE</DialogTitle>
          <DialogDescription>
            Please take a moment to check in with us about how you're feeling today.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-sm font-medium mb-3">How are you feeling today?</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  variant={mood === value ? "default" : "outline"}
                  className={mood === value ? "bg-zencare-purple" : ""}
                  onClick={() => setMood(value)}
                >
                  {value === 1 && "Very Low"}
                  {value === 2 && "Low"}
                  {value === 3 && "Neutral"}
                  {value === 4 && "Good"}
                  {value === 5 && "Excellent"}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Did you face any challenges since your last login?</h3>
            <Textarea
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Share your thoughts here..."
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Skip
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={mood === null}
            className="bg-zencare-purple hover:bg-purple-700"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginQuestionsModal;
