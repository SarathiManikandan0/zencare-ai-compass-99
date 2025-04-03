
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckCheck, Plus, X } from "lucide-react";

interface Task {
  id: string;
  description: string;
  completed: boolean;
  date: string;
}

interface UserTaskManagerProps {
  tasks: Task[];
  onAddTask: (task: string) => void;
  onToggleTask: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

const UserTaskManager: React.FC<UserTaskManagerProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask
}) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask.trim());
      setNewTask("");
    }
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          <div className="flex items-center gap-2">
            <CheckCheck className="h-5 w-5 text-blue-500" />
            <span>My To-Do List</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {activeTasks.length === 0 && completedTasks.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No tasks yet. Add one above!
            </div>
          ) : (
            <>
              {activeTasks.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Active Tasks</h3>
                  <div className="space-y-2">
                    {activeTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between border rounded-md p-2"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={(checked) => onToggleTask(task.id, !!checked)}
                          />
                          <span className="text-sm">{task.description}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{task.date}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {completedTasks.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Completed Tasks</h3>
                  <div className="space-y-2">
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between border rounded-md p-2 bg-muted line-through text-muted-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={(checked) => onToggleTask(task.id, !!checked)}
                          />
                          <span className="text-sm">{task.description}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{task.date}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTaskManager;
