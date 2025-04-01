
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Survey = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    mentalHealthExperience: "",
    stressLevel: "",
    sleepQuality: "",
    additionalInfo: "",
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit survey data (would connect to API in real app)
    console.log("Survey submitted:", formData);
    toast.success("Thank you for completing the survey!");
    // Reset form
    setFormData({
      name: "",
      email: "",
      age: "",
      gender: "",
      mentalHealthExperience: "",
      stressLevel: "",
      sleepQuality: "",
      additionalInfo: "",
    });
    setCurrentStep(1);
  };
  
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <div className="flex-grow container max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2 text-white text-center">Mental Health Survey</h1>
        <p className="text-gray-400 mb-8 text-center">
          Help us understand your needs better so we can provide personalized support.
        </p>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Step {currentStep} of {totalSteps}</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Mental Health Experience"}
              {currentStep === 3 && "Additional Information"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Gender</Label>
                    <RadioGroup 
                      value={formData.gender} 
                      onValueChange={(value) => handleRadioChange("gender", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Have you experienced mental health challenges before?</Label>
                    <RadioGroup 
                      value={formData.mentalHealthExperience} 
                      onValueChange={(value) => handleRadioChange("mentalHealthExperience", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="exp-yes" />
                        <Label htmlFor="exp-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="exp-no" />
                        <Label htmlFor="exp-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="notsure" id="exp-notsure" />
                        <Label htmlFor="exp-notsure">Not sure</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>How would you rate your current stress level?</Label>
                    <RadioGroup 
                      value={formData.stressLevel} 
                      onValueChange={(value) => handleRadioChange("stressLevel", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="stress-low" />
                        <Label htmlFor="stress-low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="stress-moderate" />
                        <Label htmlFor="stress-moderate">Moderate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="stress-high" />
                        <Label htmlFor="stress-high">High</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>How would you rate your sleep quality?</Label>
                    <RadioGroup 
                      value={formData.sleepQuality} 
                      onValueChange={(value) => handleRadioChange("sleepQuality", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="good" id="sleep-good" />
                        <Label htmlFor="sleep-good">Good</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fair" id="sleep-fair" />
                        <Label htmlFor="sleep-fair">Fair</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="poor" id="sleep-poor" />
                        <Label htmlFor="sleep-poor">Poor</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="additionalInfo">Is there anything else you'd like to share?</Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={5}
                      value={formData.additionalInfo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={nextStep}
                className="bg-zencare-purple hover:bg-purple-700"
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-zencare-purple hover:bg-purple-700"
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
