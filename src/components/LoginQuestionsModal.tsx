
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";

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
          <DialogTitle className="text-xl font-bold">Welcome back to ZENCARE</DialogTitle>
          <DialogDescription>
            Please take a moment to check in with us about how you're feeling today.
          </DialogDescription>
        </DialogHeader>
        <motion.div 
          className="space-y-6 py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h3 className="text-sm font-medium mb-3">How are you feeling today?</h3>
            <ToggleGroup type="single" value={mood?.toString()} onValueChange={(value) => setMood(parseInt(value))}>
              {[1, 2, 3, 4, 5].map((value) => (
                <ToggleGroupItem
                  key={value}
                  value={value.toString()}
                  className={mood === value ? "bg-zencare-purple text-white" : ""}
                >
                  {value === 1 && "Very Low"}
                  {value === 2 && "Low"}
                  {value === 3 && "Neutral"}
                  {value === 4 && "Good"}
                  {value === 5 && "Excellent"}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mood !== null ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-sm font-medium mb-3">Did you face any challenges since your last login?</h3>
            <Textarea
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Share your thoughts here..."
              className="min-h-[120px]"
            />
          </motion.div>
        </motion.div>
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
