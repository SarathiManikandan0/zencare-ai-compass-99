
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Video, Dumbbell } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  type: "article" | "video" | "exercise";
  description: string;
  content?: string;
  url?: string;
  duration?: string;
}

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resources: Resource[] = [
  {
    id: "a1",
    title: "Understanding Anxiety Disorders",
    type: "article",
    description: "Learn about the different types of anxiety disorders and their symptoms.",
    content: "Anxiety disorders are the most common mental health conditions, affecting millions of people worldwide. They include generalized anxiety disorder, panic disorder, social anxiety disorder, and specific phobias. While it's normal to feel anxious occasionally, anxiety disorders involve excessive fear or worry that interferes with daily activities...",
  },
  {
    id: "a2",
    title: "The Science of Depression",
    type: "article",
    description: "Explore the biological, psychological, and social factors that contribute to depression.",
    content: "Depression is more than just feeling sad. It's a complex mental health condition influenced by biological factors (brain chemistry, genetics), psychological factors (personality, coping skills), and social factors (life experiences, trauma, stress)...",
  },
  {
    id: "v1",
    title: "5-Minute Mindfulness Meditation",
    type: "video",
    description: "A short guided meditation to help you relax and center yourself.",
    url: "https://example.com/mindfulness-video",
    duration: "5:20",
  },
  {
    id: "v2",
    title: "Understanding Cognitive Behavioral Therapy",
    type: "video",
    description: "An introduction to CBT and how it can help manage mental health conditions.",
    url: "https://example.com/cbt-video",
    duration: "12:45",
  },
  {
    id: "e1",
    title: "Deep Breathing Exercise",
    type: "exercise",
    description: "Learn deep breathing techniques to reduce anxiety and stress.",
    content: "1. Find a comfortable position sitting or lying down.\n2. Place one hand on your chest and the other on your stomach.\n3. Breathe in slowly through your nose for 4 counts, feeling your stomach expand.\n4. Hold your breath for 1-2 seconds.\n5. Exhale slowly through your mouth for 6 counts.\n6. Repeat for 5-10 minutes.",
  },
  {
    id: "e2",
    title: "Progressive Muscle Relaxation",
    type: "exercise",
    description: "A technique to reduce physical tension and promote relaxation.",
    content: "1. Start by tensing the muscles in your toes for 5 seconds.\n2. Release the tension and notice how your muscles feel when relaxed.\n3. Work your way up through your body, tensing and relaxing each muscle group.\n4. Focus on the feelings of relaxation throughout your body.",
  },
];

const ResourcesModal: React.FC<ResourcesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  const handleViewResource = (resource: Resource) => {
    setSelectedResource(resource);
    if (!recentlyViewed.includes(resource.id)) {
      setRecentlyViewed(prev => [resource.id, ...prev].slice(0, 3));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl h-[80vh] max-h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {selectedResource ? selectedResource.title : "Mental Health Resources"}
          </DialogTitle>
          <DialogDescription>
            {selectedResource 
              ? `${selectedResource.type.charAt(0).toUpperCase() + selectedResource.type.slice(1)} • ${selectedResource.description}` 
              : "Explore articles, videos, and exercises to support your mental health journey."}
          </DialogDescription>
        </DialogHeader>
        
        {!selectedResource ? (
          <Tabs defaultValue="all" className="flex-grow flex flex-col">
            <TabsList>
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="exercises">Exercises</TabsTrigger>
              {recentlyViewed.length > 0 && (
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="all" className="flex-grow">
              <ScrollArea className="h-[450px] pr-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {resources.map(resource => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      onView={handleViewResource} 
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="articles" className="flex-grow">
              <ScrollArea className="h-[450px] pr-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {resources.filter(r => r.type === "article").map(resource => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      onView={handleViewResource} 
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="videos" className="flex-grow">
              <ScrollArea className="h-[450px] pr-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {resources.filter(r => r.type === "video").map(resource => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      onView={handleViewResource} 
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="exercises" className="flex-grow">
              <ScrollArea className="h-[450px] pr-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {resources.filter(r => r.type === "exercise").map(resource => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      onView={handleViewResource} 
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            {recentlyViewed.length > 0 && (
              <TabsContent value="recent" className="flex-grow">
                <ScrollArea className="h-[450px] pr-4">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {resources
                      .filter(r => recentlyViewed.includes(r.id))
                      .map(resource => (
                        <ResourceCard 
                          key={resource.id} 
                          resource={resource} 
                          onView={handleViewResource} 
                        />
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            )}
          </Tabs>
        ) : (
          <div className="flex flex-col h-full">
            <Button 
              variant="ghost" 
              className="w-fit mb-4"
              onClick={() => setSelectedResource(null)}
            >
              ← Back to resources
            </Button>
            
            <ScrollArea className="flex-grow pr-4">
              {selectedResource.type === "article" && (
                <div className="prose max-w-none">
                  <p className="text-lg">{selectedResource.content}</p>
                </div>
              )}
              
              {selectedResource.type === "video" && (
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Video className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Video player placeholder</span>
                  </div>
                  <p className="text-muted-foreground">Duration: {selectedResource.duration}</p>
                </div>
              )}
              
              {selectedResource.type === "exercise" && (
                <div className="space-y-6">
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Instructions:</h3>
                    <div className="whitespace-pre-line">{selectedResource.content}</div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button className="bg-zencare-purple hover:bg-purple-700">
                      Mark as Completed
                    </Button>
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

interface ResourceCardProps {
  resource: Resource;
  onView: (resource: Resource) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onView }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {resource.type === "article" && <Book className="h-4 w-4 text-blue-500" />}
            {resource.type === "video" && <Video className="h-4 w-4 text-red-500" />}
            {resource.type === "exercise" && <Dumbbell className="h-4 w-4 text-green-500" />}
            <CardTitle className="text-lg">{resource.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{resource.description}</p>
        {resource.type === "video" && resource.duration && (
          <p className="text-xs text-muted-foreground mb-4">Duration: {resource.duration}</p>
        )}
        <Button 
          variant="outline" 
          className="ml-auto"
          onClick={() => onView(resource)}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResourcesModal;
