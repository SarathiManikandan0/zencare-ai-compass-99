
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to ZenCare</h1>
        <h2 className="text-3xl text-gray-400 mb-8">Revolutionizing Healthcare</h2>
        <p className="max-w-2xl mx-auto text-gray-400 mb-12">
          At ZenCare, we are revolutionizing the way healthcare is managed
          through cutting-edge AI technology. Our solutions are designed to
          enhance patient care, streamline operations, and provide actionable
          insights for better decision-making. Explore how ZenCare can light the
          way to a more efficient and effective healthcare experience.
        </p>
        <div className="space-y-4 w-full max-w-md">
          <Button 
            className="w-full text-lg py-6 bg-zencare-gradient hover:opacity-90"
            asChild
          >
            <Link to="/chatbot">
              Talk to ZENCARE-AI
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-lg py-6"
            asChild
          >
            <Link to="/login">
              Access Your Dashboard
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
