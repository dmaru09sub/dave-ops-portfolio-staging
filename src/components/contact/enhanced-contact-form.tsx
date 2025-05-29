
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { EnvelopeAnimation } from "./envelope-animation";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EnhancedContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Show envelope animation
      setShowEnvelope(true);

      // Submit to Supabase
      const { error } = await supabase
        .from('daveops_contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });

      if (error) throw error;

      toast({
        title: "Message sent successfully! 📧",
        description: "Thank you for your message. I'll get back to you within 24 hours."
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnvelopeAnimationEnd = () => {
    setShowEnvelope(false);
  };

  return (
    <>
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-background via-background to-secondary/20">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl font-semibold">Send a Message</CardTitle>
          <p className="text-muted-foreground mt-2">
            Fill out the form below and I'll respond as soon as possible
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="h-11"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium">
                <MessageSquare className="w-4 h-4" />
                Subject
              </Label>
              <Input 
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="DevOps consultation inquiry"
                className="h-11"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message
              </Label>
              <Textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, challenges, or how I can help..."
                rows={6}
                className="resize-none"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <EnvelopeAnimation 
        isVisible={showEnvelope} 
        onAnimationEnd={handleEnvelopeAnimationEnd}
      />
    </>
  );
};

export default EnhancedContactForm;
