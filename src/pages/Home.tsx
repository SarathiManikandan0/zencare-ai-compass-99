import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  const featuresOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const featuresY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white" ref={containerRef}>
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        <motion.section 
          className="h-screen flex flex-col items-center justify-center px-4 text-center"
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
        >
          <h1 className="text-7xl font-bold mb-6">Ask ZenCare AI Anything</h1>
          <p className="max-w-2xl mx-auto text-gray-400 mb-12 text-xl">
            Your personalized mental health companion powered by artificial intelligence
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
          </div>
        </motion.section>

        <motion.section 
          className="min-h-screen py-20 px-4"
          style={{ opacity: featuresOpacity, y: featuresY }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Personalized Patient Care Plans"
                description="Utilize AI to analyze patient data and create personalized care plans for improved health outcomes."
              />
              
              <FeatureCard 
                title="Predictive Maintenance for Medical Equipment"
                description="Predict maintenance needs of medical equipment using AI analysis to minimize downtime and ensure efficient operations."
                highlighted
              />
              
              <FeatureCard 
                title="Telemedicine Integration"
                description="Enable remote consultations and virtual care delivery with AI-driven real-time symptom analysis and triage."
              />
              
              <FeatureCard 
                title="Health Monitoring Wearables Integration"
                description="Integrate wearable devices for continuous health monitoring and early detection of health issues using AI analytics."
              />
              
              <FeatureCard 
                title="Social Determinants of Health Analysis"
                description="Analyze social determinants of health data to provide personalized interventions and collaborate with community organizations for support programs."
              />
              
              <FeatureCard 
                title="Health Behavior Prediction and Intervention"
                description="Predict health behaviors using AI models and integrate behavioral nudges for promoting healthy habits."
              />
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-black py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            <nav className="flex space-x-6">
              <Link to="/" className="text-gray-400 hover:text-white">About us</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              <Link to="/" className="text-gray-400 hover:text-white">Jobs</Link>
              <Link to="/" className="text-gray-400 hover:text-white">Press kit</Link>
            </nav>
            
            <div className="flex space-x-6">
              <SocialIcon icon="twitter" />
              <SocialIcon icon="youtube" />
              <SocialIcon icon="facebook" />
            </div>
            
            <p className="text-gray-500 text-sm">
              Copyright © 2024 - All right reserved by ZenCare
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description, highlighted = false }) => {
  return (
    <motion.div 
      className={`bg-black border border-gray-800 rounded-lg p-6 h-full flex flex-col ${
        highlighted ? 'ring-2 ring-purple-500' : ''
      }`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 flex-grow">{description}</p>
    </motion.div>
  );
};

const SocialIcon = ({ icon }) => {
  return (
    <a 
      href="#" 
      className="text-gray-400 hover:text-white transition-colors"
      aria-label={icon}
    >
      <div className="w-6 h-6">
        {icon === "twitter" && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        )}
        {icon === "youtube" && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        )}
        {icon === "facebook" && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )}
      </div>
    </a>
  );
};

export default Home;
