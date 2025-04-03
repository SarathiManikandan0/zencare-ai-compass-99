
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  messages: Message[];
}

interface SupportGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockedGroups: SupportGroup[] = [
  {
    id: "anxiety",
    name: "Anxiety Support Group",
    description: "A safe space to discuss anxiety and share coping strategies.",
    memberCount: 24,
    messages: [
      {
        id: "1",
        author: "User178",
        content: "I've been trying deep breathing exercises when I feel anxious. Anyone else find this helpful?",
        timestamp: "10:30 AM"
      },
      {
        id: "2",
        author: "User342",
        content: "Yes! Deep breathing has been a game-changer for me. I also use the 5-4-3-2-1 grounding technique.",
        timestamp: "10:35 AM"
      }
    ]
  },
  {
    id: "depression",
    name: "Depression Support Group",
    description: "Connect with others who understand depression and share your journey.",
    memberCount: 18,
    messages: [
      {
        id: "1",
        author: "User219",
        content: "Having a really difficult day today. Just wanted to check in with everyone.",
        timestamp: "11:15 AM"
      },
      {
        id: "2",
        author: "User587",
        content: "I'm sorry you're having a tough day. We're here for you. What helps me is making a list of small wins for the day.",
        timestamp: "11:20 AM"
      }
    ]
  },
  {
    id: "stress",
    name: "Stress Management Group",
    description: "Learn and share strategies for managing daily stress and burnout.",
    memberCount: 15,
    messages: []
  },
  {
    id: "mindfulness",
    name: "Mindfulness Practice Group",
    description: "Practice mindfulness together and discuss its benefits for mental health.",
    memberCount: 12,
    messages: []
  }
];

const SupportGroupsModal: React.FC<SupportGroupsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<SupportGroup | null>(null);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() && selectedGroup) {
      // In a real app, this would send to a backend
      console.log(`Message sent to ${selectedGroup.name}: ${message}`);
      setMessage("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl h-[80vh] max-h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>{selectedGroup ? selectedGroup.name : "Support Groups"}</DialogTitle>
          <DialogDescription>
            {selectedGroup 
              ? selectedGroup.description 
              : "Join a group to connect with others who understand what you're going through."}
          </DialogDescription>
        </DialogHeader>
        
        {!selectedGroup ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto flex-grow py-4">
            {mockedGroups.map((group) => (
              <Card 
                key={group.id} 
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => setSelectedGroup(group)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                  <p className="text-xs text-muted-foreground">{group.memberCount} members</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <Button 
              variant="ghost" 
              className="w-fit mb-4"
              onClick={() => setSelectedGroup(null)}
            >
              ← Back to groups
            </Button>
            
            <ScrollArea className="flex-grow mb-4 border rounded-md p-4 h-[300px]">
              {selectedGroup.messages.length > 0 ? (
                <div className="space-y-4">
                  {selectedGroup.messages.map((msg) => (
                    <div key={msg.id} className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{msg.author}</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm mt-1">{msg.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No messages yet. Be the first to share!
                </div>
              )}
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                Send
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SupportGroupsModal;
