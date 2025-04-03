
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

interface Goal {
  id: string;
  title: string;
  target: string;
  progress: number;
}

interface GoalSetterProps {
  goals: Goal[];
  onAddGoal: (title: string, target: string) => void;
  onUpdateProgress: (id: string, progress: number) => void;
  onDeleteGoal: (id: string) => void;
}

const GoalSetter: React.FC<GoalSetterProps> = ({
  goals,
  onAddGoal,
  onUpdateProgress,
  onDeleteGoal
}) => {
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const handleAddGoal = () => {
    if (newGoalTitle.trim() && newGoalTarget.trim()) {
      onAddGoal(newGoalTitle.trim(), newGoalTarget.trim());
      setNewGoalTitle("");
      setNewGoalTarget("");
      setIsAddingGoal(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            <span>My Goals</span>
          </CardTitle>
          <Sheet open={isAddingGoal} onOpenChange={setIsAddingGoal}>
            <SheetTrigger asChild>
              <Button size="sm" className="h-8 bg-zencare-purple hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-1" />
                New Goal
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Set a New Goal</SheetTitle>
                <SheetDescription>
                  Creating clear goals can help you track your progress and stay motivated.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="goalTitle">What do you want to achieve?</Label>
                  <Input
                    id="goalTitle"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="e.g., Practice mindfulness meditation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goalTarget">Target (frequency or measure)</Label>
                  <Input
                    id="goalTarget"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(e.target.value)}
                    placeholder="e.g., 3 times this week"
                  />
                </div>
                <Button 
                  className="w-full mt-4 bg-zencare-purple hover:bg-purple-700"
                  onClick={handleAddGoal}
                  disabled={!newGoalTitle.trim() || !newGoalTarget.trim()}
                >
                  Add Goal
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No goals set yet. Create your first goal to get started!
            </div>
          ) : (
            goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onUpdateProgress={onUpdateProgress}
                onDelete={onDeleteGoal}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (id: string, progress: number) => void;
  onDelete: (id: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdateProgress, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [progressValue, setProgressValue] = useState(goal.progress);

  const handleSaveProgress = () => {
    onUpdateProgress(goal.id, progressValue);
    setIsUpdating(false);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="font-medium">{goal.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{goal.target}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onDelete(goal.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <Progress value={goal.progress} />

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {goal.progress}% complete
            </div>
            
            {!isUpdating ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsUpdating(true)}
              >
                Update Progress
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={progressValue}
                  onChange={(e) => setProgressValue(Number(e.target.value))}
                  className="w-16 h-8"
                  min={0}
                  max={100}
                />
                <Button 
                  size="sm"
                  onClick={handleSaveProgress}
                  className="h-8 bg-zencare-purple hover:bg-purple-700"
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalSetter;
