
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import ConsultationModal from "@/components/ConsultationModal";
import LoginQuestionsModal from "@/components/LoginQuestionsModal";
import SupportGroupsModal from "@/components/SupportGroupsModal";
import ResourcesModal from "@/components/ResourcesModal";
import UserTaskManager from "@/components/UserTaskManager";
import GoalSetter from "@/components/GoalSetter";
import ThemeToggle from "@/components/ThemeToggle";
import { getTasks, addTask, updateTask, deleteTask } from "@/services/api";

// For mock data visualization
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const moodData = [
  { day: "Mon", mood: 3 },
  { day: "Tue", mood: 2 },
  { day: "Wed", mood: 4 },
  { day: "Thu", mood: 3 },
  { day: "Fri", mood: 5 },
  { day: "Sat", mood: 4 },
  { day: "Sun", mood: 3 },
];

const recommendations = [
  {
    id: 1,
    title: "5-Minute Mindfulness Meditation",
    type: "Exercise",
    description: "A quick meditation to center yourself and reduce anxiety.",
  },
  {
    id: 2,
    title: "Understanding Anxiety",
    type: "Article",
    description: "Learn about the causes and symptoms of anxiety disorders.",
  },
  {
    id: 3,
    title: "Deep Breathing Techniques",
    type: "Exercise",
    description: "Simple breathing exercises to help manage stress and panic.",
  },
];

const initialGoals = [
  {
    id: "1",
    title: "Practice mindfulness meditation",
    target: "3 times this week",
    progress: 66,
  },
  {
    id: "2",
    title: "Journal about feelings",
    target: "Daily",
    progress: 85,
  },
  {
    id: "3",
    title: "Take a 30-minute walk",
    target: "5 times this week",
    progress: 40,
  },
];

const UserDashboard = () => {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showLoginQuestionsModal, setShowLoginQuestionsModal] = useState(true);
  const [showSupportGroupsModal, setShowSupportGroupsModal] = useState(false);
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [goals, setGoals] = useState(initialGoals);

  useEffect(() => {
    // Fetch tasks when the component mounts
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    
    fetchTasks();
  }, []);

  const handleMoodSelect = (mood: number) => {
    setCurrentMood(mood);
    // In a real app, this would send the mood data to a backend service
    console.log("Mood logged:", mood);
  };

  const handleConsultNow = () => {
    // This would handle the consultation scheduling
    setShowConsultationModal(false);
    // For demo purposes, just log that the consultation was requested
    console.log("Consultation requested");
  };

  const handleLoginQuestions = (mood: number, challenges: string) => {
    console.log("Login mood:", mood, "Challenges:", challenges);
    setCurrentMood(mood);
  };

  const handleAddTask = async (description: string) => {
    try {
      const newTask = await addTask(description);
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, completed);
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddGoal = (title: string, target: string) => {
    const newGoal = {
      id: Date.now().toString(),
      title,
      target,
      progress: 0
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const handleUpdateGoalProgress = (id: string, progress: number) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.id === id ? { ...goal, progress } : goal
      )
    );
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground">ZENCARE</h1>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Your Mental Health Dashboard</h2>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link to="/">Logout</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mood Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#8a2be2"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">How are you feeling today?</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((mood) => (
                    <Button
                      key={mood}
                      variant={currentMood === mood ? "default" : "outline"}
                      className={currentMood === mood ? "bg-zencare-purple" : ""}
                      onClick={() => handleMoodSelect(mood)}
                    >
                      {mood === 1 && "Very Low"}
                      {mood === 2 && "Low"}
                      {mood === 3 && "Neutral"}
                      {mood === 4 && "Good"}
                      {mood === 5 && "Excellent"}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-zencare-purple hover:bg-purple-700"
                asChild
              >
                <Link to="/chatbot">
                  Talk to ZENCARE-AI
                </Link>
              </Button>
              
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => setShowConsultationModal(true)}
              >
                Schedule Consultation
              </Button>
              
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => setShowSupportGroupsModal(true)}
              >
                Join Support Group
              </Button>
              
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => setShowResourcesModal(true)}
              >
                Mental Health Resources
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UserTaskManager 
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
          
          <GoalSetter 
            goals={goals}
            onAddGoal={handleAddGoal}
            onUpdateProgress={handleUpdateGoalProgress}
            onDeleteGoal={handleDeleteGoal}
          />
        </div>
        
        <Tabs defaultValue="recommendations">
          <TabsList className="mb-4">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground">{rec.type}</p>
                      <p className="mt-2">{rec.description}</p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => setShowResourcesModal(true)}
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="community">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-medium mb-4">Join a Support Group</h3>
                <p className="mb-6">
                  Connect with others who understand what you're going through.
                  Our support groups are moderated by mental health professionals
                  and provide a safe space for sharing and healing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowSupportGroupsModal(true)}
                  >
                    Anxiety Support Group
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowSupportGroupsModal(true)}
                  >
                    Depression Support Group
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowSupportGroupsModal(true)}
                  >
                    Stress Management Group
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowSupportGroupsModal(true)}
                  >
                    Mindfulness Practice Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <ConsultationModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
        onConsult={handleConsultNow}
      />
      
      <LoginQuestionsModal
        isOpen={showLoginQuestionsModal}
        onClose={() => setShowLoginQuestionsModal(false)}
        onSubmit={handleLoginQuestions}
      />
      
      <SupportGroupsModal
        isOpen={showSupportGroupsModal}
        onClose={() => setShowSupportGroupsModal(false)}
      />
      
      <ResourcesModal
        isOpen={showResourcesModal}
        onClose={() => setShowResourcesModal(false)}
      />
    </div>
  );
};

export default UserDashboard;
