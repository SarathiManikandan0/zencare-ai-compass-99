
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, PlayCircle, Dumbbell } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  type: "Article" | "Video" | "Exercise";
  content: string;
  description: string;
  category: string;
}

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data - in a real app, this would come from an API
const mockedResources: Resource[] = [
  {
    id: "1",
    title: "Understanding Anxiety",
    type: "Article",
    content: "Anxiety is a normal and often healthy emotion. However, when a person regularly feels disproportionate levels of anxiety, it might become a medical disorder. Anxiety disorders form a category of mental health diagnoses that lead to excessive nervousness, fear, apprehension, and worry...",
    description: "Learn about the causes and symptoms of anxiety disorders.",
    category: "Anxiety"
  },
  {
    id: "2",
    title: "5-Minute Mindfulness Meditation",
    type: "Video",
    content: "https://www.youtube.com/embed/inpok4MKVLM",
    description: "A short guided meditation to help you relax and center yourself.",
    category: "Mindfulness"
  },
  {
    id: "3",
    title: "Deep Breathing Technique",
    type: "Exercise",
    content: "1. Sit comfortably with your back straight.\n2. Breathe in through your nose for 4 counts.\n3. Hold your breath for 2 counts.\n4. Exhale through your mouth for 6 counts.\n5. Repeat for 5 minutes.",
    description: "A simple breathing exercise to reduce stress and anxiety.",
    category: "Stress"
  },
  {
    id: "4",
    title: "Signs of Depression",
    type: "Article",
    content: "Depression is a common and serious medical illness that negatively affects how you feel, the way you think and how you act. It can lead to a variety of emotional and physical problems...",
    description: "Recognize the signs and symptoms of depression.",
    category: "Depression"
  },
  {
    id: "5",
    title: "Progressive Muscle Relaxation",
    type: "Video",
    content: "https://www.youtube.com/embed/86HUcX8ZtAk",
    description: "Learn how to relax your muscles to reduce physical tension.",
    category: "Stress"
  },
];

const ResourcesModal: React.FC<ResourcesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [category, setCategory] = useState<string>("all");

  const filteredResources = category === "all" 
    ? mockedResources 
    : mockedResources.filter(resource => resource.category.toLowerCase() === category.toLowerCase());

  const categories = ["all", ...Array.from(new Set(mockedResources.map(r => r.category.toLowerCase())))];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl h-[80vh] max-h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {selectedResource ? selectedResource.title : "Mental Health Resources"}
          </DialogTitle>
          <DialogDescription>
            {selectedResource 
              ? `${selectedResource.type} - ${selectedResource.description}`
              : "Explore articles, videos, and exercises to support your mental health journey."}
          </DialogDescription>
        </DialogHeader>
        
        {!selectedResource ? (
          <div className="flex flex-col h-full">
            <Tabs defaultValue="all" className="flex-grow" onValueChange={setCategory}>
              <TabsList className="mb-4">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="capitalize">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={category} className="flex-grow overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
                  {filteredResources.map((resource) => (
                    <Card 
                      key={resource.id} 
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => setSelectedResource(resource)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          {resource.type === "Article" && <BookOpen className="h-4 w-4 text-blue-500" />}
                          {resource.type === "Video" && <PlayCircle className="h-4 w-4 text-red-500" />}
                          {resource.type === "Exercise" && <Dumbbell className="h-4 w-4 text-green-500" />}
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </div>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">View {resource.type}</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <Button 
              variant="ghost" 
              className="w-fit mb-4"
              onClick={() => setSelectedResource(null)}
            >
              ← Back to resources
            </Button>
            
            <ScrollArea className="flex-grow border rounded-md p-6">
              {selectedResource.type === "Article" && (
                <div className="prose prose-sm max-w-none">
                  <p>{selectedResource.content}</p>
                </div>
              )}
              
              {selectedResource.type === "Video" && (
                <div className="aspect-video w-full">
                  <iframe 
                    src={selectedResource.content}
                    title={selectedResource.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
              {selectedResource.type === "Exercise" && (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-line bg-secondary p-4 rounded-md">
                    {selectedResource.content}
                  </pre>
                  <div className="mt-4">
                    <Button>Mark as Completed</Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResourcesModal;
