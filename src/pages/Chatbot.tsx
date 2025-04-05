
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConsultationModal from "@/components/ConsultationModal";
import Navbar from "@/components/Navbar";

const Chatbot = () => {
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const handleConsultNow = () => {
    setShowConsultationModal(false);
    // Consultation confirmation is now handled by the modal directly
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Ask The AI About Your Health Issue
        </h1>
        
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col" style={{ height: "75vh" }}>
          <div className="p-4 bg-gray-50 border-b flex items-center">
            <div className="font-semibold">ZenCare-AI</div>
          </div>
          
          <div className="flex-grow h-full">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/9pbcWOAM3YiSjvOJg9LGn"
              width="100%"
              style={{ height: "100%", minHeight: "60vh" }}
              frameBorder="0"
              title="ZenCare AI Chatbot"
            />
          </div>
          
          <div className="p-2 border-t">
            <div className="text-xs text-center text-gray-500">
              
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex gap-4">
          <Button variant="secondary" asChild>
            <Link to="/">Return to Home Page</Link>
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
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
