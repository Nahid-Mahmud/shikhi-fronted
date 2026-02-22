"use client";

import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "support@Shikhi.com",
      desc: "We respond within 24 hours",
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      desc: "Mon-Fri, 9 AM - 5 PM EST",
    },
    {
      icon: <MapPin size={24} />,
      title: "Office",
      content: "San Francisco, CA",
      desc: "Headquarters located in the heart of Silicon Valley",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as
              possible.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-8">Contact Information</h2>
                </div>

                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-foreground font-medium">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-8 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-4">Response Time</h3>
                  <p className="text-muted-foreground">
                    We typically respond to all inquiries within 24 business hours. For urgent matters, please call our
                    phone line during business hours.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-border bg-card p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

                  {isSubmitted && (
                    <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                      <p className="font-semibold">Success!</p>
                      <p className="text-sm">Thank you for your message. We&apos;ll get back to you soon.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Support Request</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="Tell us more about your inquiry..."
                      ></textarea>
                    </div>

                    <Button type="submit" size="lg" className="w-full text-base">
                      <Send size={20} className="mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Support */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Other Ways to Connect</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border border-border bg-card text-center space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Live Chat</h3>
                <p className="text-muted-foreground">Chat with our team in real-time for quick answers</p>
                <Button variant="outline" className="w-full">
                  Start Chat
                </Button>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card text-center space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Community Forum</h3>
                <p className="text-muted-foreground">Join thousands of learners in our community</p>
                <Button variant="outline" className="w-full">
                  Visit Forum
                </Button>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card text-center space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Knowledge Base</h3>
                <p className="text-muted-foreground">Browse our FAQs and learning resources</p>
                <Button variant="outline" className="w-full">
                  Explore Help
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Response Promise */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="p-8 rounded-lg border border-border bg-primary/5">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment to You</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>We respond to all emails within 24 business hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Urgent issues are prioritized and handled immediately</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Your data and privacy are our top priority</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Our support team is trained to resolve issues quickly</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
