import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Shikhi - Our Mission & Team",
  description: "Learn about Shikhi mission to empower talent, meet our team, and discover our values.",
};

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former educator with 15+ years of experience in online learning platforms.",
    },
    {
      name: "Michael Chen",
      role: "VP of Curriculum",
      bio: "Expert in educational design with PhDs in both computer science and education.",
    },
    {
      name: "Lisa Patel",
      role: "Community Lead",
      bio: "Passionate about building inclusive communities and fostering peer-to-peer learning.",
    },
    {
      name: "James Smith",
      role: "Head of Technology",
      bio: "Full-stack engineer focused on creating seamless, scalable learning experiences.",
    },
  ];

  const values = [
    {
      title: "Accessibility",
      description: "Quality education should be affordable and accessible to everyone, everywhere.",
    },
    {
      title: "Excellence",
      description: "We maintain the highest standards in course content, instructor quality, and platform experience.",
    },
    {
      title: "Community",
      description: "Learning is better together. We foster meaningful connections between learners and instructors.",
    },
    {
      title: "Innovation",
      description: "We continuously evolve using the latest technologies and educational methodologies.",
    },
  ];

  const milestones = [
    { year: "2020", event: "Shikhi founded with a vision to empower professional talent" },
    { year: "2021", event: "10,000 learners joined our platform" },
    { year: "2022", event: "Expanded to 300+ courses with 150+ instructors" },
    { year: "2023", event: "Reached 15,000+ active learners across 50+ countries" },
    { year: "2024", event: "Launched advanced career tracking and AI-powered recommendations" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-black text-foreground">About Shikhi</h1>
            <p className="text-xl text-muted-foreground">
              On a mission to transform education through innovative learning experiences and a vibrant global
              community.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  To empower millions of learners worldwide by providing access to world-class education, regardless of
                  background or location. We believe everyone deserves the opportunity to learn, grow, and achieve their
                  goals.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                <p className="text-lg text-muted-foreground">
                  A world where education is accessible, affordable, and personalized for every learner. Where
                  communities of learners support each other, and where everyone has the tools to succeed in their
                  chosen path.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-16">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="p-6 rounded-lg border border-border bg-card space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Dedicated professionals from diverse backgrounds united by a passion for education and learning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="p-6 rounded-lg bg-card border border-border text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline/Milestones */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-16">Our Journey</h2>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    {index < milestones.length - 1 && <div className="w-0.5 h-20 bg-border mt-2"></div>}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-2xl font-bold text-primary mb-2">{milestone.year}</h3>
                    <p className="text-lg text-muted-foreground">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { stat: "15K+", label: "Learners" },
                { stat: "500+", label: "Courses" },
                { stat: "200+", label: "Instructors" },
                { stat: "50+", label: "Countries" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{item.stat}</div>
                  <p className="text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Join Our Community</h2>
              <p className="text-lg text-muted-foreground">
                Be part of a global movement to transform careers. Start learning with Shikhi today.
              </p>
            </div>
            <Button asChild size="lg" className="text-base">
              <Link href="/signup">Get Started Free</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
