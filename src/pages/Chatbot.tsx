
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ConsultationModal from "@/components/ConsultationModal";
import { getAIResponse } from "@/services/api";
import Navbar from "@/components/Navbar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! What can I help you with?",
      sender: "ai",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Start loading
    setIsLoading(true);
    
    try {
      // Get AI response
      const aiResponse = await getAIResponse(message);
      
      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConsultNow = () => {
    // This would handle the consultation scheduling
    setShowConsultationModal(false);
    // For now, just add a confirmation message
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: "Thank you for requesting a consultation. A specialist will contact you shortly to schedule your appointment.",
      sender: "ai",
    };
    setMessages((prev) => [...prev, confirmationMessage]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-zencare-gradient">
          Ask The AI About Your Health Issue
        </h1>
        
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[70vh]">
          <div className="p-4 bg-gray-50 border-b flex items-center">
            <div className="font-semibold">ZenCare-AI</div>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.text}
                sender={msg.sender}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            <div className="text-xs text-center mt-2 text-gray-500">
              Powered By Chatbase.co
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex gap-4">
          <Button variant="secondary" asChild>
            <Link to="/">Return to Home Page</Link>
          </Button>
          <Button 
            className="bg-zencare-purple hover:bg-purple-700"
            onClick={() => setShowConsultationModal(true)}
          >
            Need a Healthcare Consultation?
          </Button>
        </div>
      </div>
      
      <ConsultationModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
        onConsult={handleConsultNow}
      />
    </div>
  );
};

export default Chatbot;
