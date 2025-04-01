
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import ConsultationModal from "@/components/ConsultationModal";

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

const goals = [
  {
    id: 1,
    title: "Practice mindfulness meditation",
    target: "3 times this week",
    progress: 66,
  },
  {
    id: 2,
    title: "Journal about feelings",
    target: "Daily",
    progress: 85,
  },
  {
    id: 3,
    title: "Take a 30-minute walk",
    target: "5 times this week",
    progress: 40,
  },
];

const UserDashboard = () => {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">ZENCARE</h1>
          </div>
          <h2 className="text-xl font-semibold">Your Mental Health Dashboard</h2>
          <div>
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
                <div className="flex space-x-4">
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
              >
                Join Support Group
              </Button>
              
              <Button 
                className="w-full"
                variant="outline"
              >
                Mental Health Resources
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="recommendations">
          <TabsList className="mb-4">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{rec.title}</h3>
                      <p className="text-sm text-gray-500">{rec.type}</p>
                      <p className="mt-2">{rec.description}</p>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{goal.title}</h3>
                      <span className="text-sm text-gray-500">{goal.target}</span>
                    </div>
                    <Progress value={goal.progress} />
                    <div className="text-right text-sm text-gray-500">
                      {goal.progress}% complete
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-center">
              <Button variant="outline">Set New Goal</Button>
            </div>
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
                  <Button variant="outline">Anxiety Support Group</Button>
                  <Button variant="outline">Depression Support Group</Button>
                  <Button variant="outline">Stress Management Group</Button>
                  <Button variant="outline">Mindfulness Practice Group</Button>
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
    </div>
  );
};

export default UserDashboard;
