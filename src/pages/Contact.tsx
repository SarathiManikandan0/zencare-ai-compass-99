
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit contact form (would connect to API in real app)
    console.log("Contact form submitted:", formData);
    toast.success("Your message has been sent. We'll get back to you soon!");
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <div className="flex-grow container max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2 text-white text-center">Contact Us</h1>
        <p className="text-gray-400 mb-8 text-center">
          Have questions or need support? Reach out to our team.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Find us through the following channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-zencare-purple" />
                <p>support@zencare.example.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-zencare-purple" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-zencare-purple" />
                <p>1234 Mental Health Boulevard, Suite 500, Wellness City, WC 98765</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-zencare-purple hover:bg-purple-700"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
