"use client";

import { FeatureCard } from "@/components/shared/FeatureCard";
import { PricingCard } from "@/components/shared/PricingCard";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BarChart3, BookOpen, ChevronDown, MessageSquare, Users, Zap } from "lucide-react";
import { useGetAllCoursesQuery } from "@/redux/features/course/course.api";
import Link from "next/link";
import { useState } from "react";
import Asset1 from "@/asssets/assets1.jpg";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "Expert-Led Courses",
      description: "Learn from industry experts with years of real-world experience.",
    },
    {
      icon: <Users size={24} />,
      title: "Vibrant Community",
      description: "Connect with learners worldwide and grow together.",
    },
    {
      icon: <Zap size={24} />,
      title: "Learn at Your Pace",
      description: "Study whenever and wherever suits your schedule best.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics.",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Live Support",
      description: "Get help when you need it from our dedicated team.",
    },
    {
      icon: <Award size={24} />,
      title: "Certifications",
      description: "Earn recognized certificates upon course completion.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Shikhi transformed my career. The courses are comprehensive and the instructors are incredibly supportive.",
      author: "Sarah Chen",
      role: "Data Scientist",
      rating: 5,
    },
    {
      quote: "The community aspect is what sets this platform apart. Discussing projects with peers is invaluable.",
      author: "Marcus Johnson",
      role: "Full Stack Developer",
      rating: 5,
    },
    {
      quote: "Flexible learning with professional quality content. Finally found a platform that respects my time.",
      author: "Emma Rodriguez",
      role: "Product Manager",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for exploring new topics",
      features: [
        { name: "Access to 50+ courses", included: true },
        { name: "Community access", included: true },
        { name: "Monthly learning resources", included: true },
        { name: "Email support", included: true },
        { name: "Certificate generation", included: false },
        { name: "Live mentorship", included: false },
      ],
      highlighted: false,
      ctaLink: "/signup",
    },
    {
      name: "Professional",
      price: "$79",
      description: "Most popular for active learners",
      features: [
        { name: "Access to all courses", included: true },
        { name: "Community access", included: true },
        { name: "Monthly learning resources", included: true },
        { name: "Priority email support", included: true },
        { name: "Certificate generation", included: true },
        { name: "Weekly group sessions", included: true },
      ],
      highlighted: true,
      ctaLink: "/signup",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        { name: "Unlimited course access", included: true },
        { name: "Private community", included: true },
        { name: "Custom learning paths", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      highlighted: false,
      ctaLink: "/contact",
      ctaText: "Contact Sales",
    },
  ];

  const faqs = [
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes, you can cancel anytime. Your access continues through the end of your billing period.",
    },
    {
      q: "Are the certificates recognized by employers?",
      a: "Our certificates are verified and widely recognized by leading companies in the industry.",
    },
    {
      q: "Do you offer a free trial?",
      a: "Yes, we offer a 7-day free trial for all new users. No credit card required.",
    },
    {
      q: "Can I download the course materials?",
      a: "Yes, all course materials are available for download on the Professional and Enterprise plans.",
    },
  ];

  // fetch courses and show only 3 on the homepage
  const { data: featuredCourses, isLoading } = useGetAllCoursesQuery({ page: 1, limit: 3 });

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative pt-32 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.5_0.25_260/0.1),transparent_50%)]" />
          <div className="mx-auto max-w-6xl relative">
            <div className="text-center space-y-10">
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground leading-none tracking-tight text-balance">
                  Master Your Career <br />
                  <span className="text-gradient">With Shikhi</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground/80 max-w-2xl mx-auto text-balance leading-relaxed">
                  Join 15,000+ professionals transforming their careers with Shikhi. Explore expert-led courses, join a
                  vibrant community, and achieve your professional goals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href="/signup">
                    Get Started Free <ArrowRight size={20} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="text-base">
                  <Link href="#features">
                    Explore Features <ChevronDown size={20} className="ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 text-sm font-medium">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-secondary shadow-sm">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-foreground/80">15,000+ Active Learners</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-secondary shadow-sm">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-foreground/80">200+ Expert Instructors</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-secondary shadow-sm">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-foreground/80">500+ Quality Courses</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">Why Shikhi?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the features that make our platform the preferred choice for career growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  World-Class Learning, Accessible to Everyone
                </h2>
                <p className="text-lg text-muted-foreground">
                  We believe education should be accessible, affordable, and effective. Our platform brings together the
                  best instructors, cutting-edge technology, and a supportive community to create the ultimate learning
                  experience.
                </p>
                <ul className="space-y-3">
                  {["Instructor-reviewed curriculum", "Hands-on projects", "Peer collaboration", "Career support"].map(
                    (item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div className="rounded-lg  p-8 h-80 flex items-center justify-center">
                <Image
                  src={Asset1}
                  alt="Learning Illustration"
                  className="object-cover rounded-lg"
                  height={600}
                  width={600}
                />
                {/* <div className="text-center text-muted-foreground">Visual Element</div> */}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How It Works</h2>
              <p className="text-lg text-muted-foreground">Get started in just a few simple steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Create Account", desc: "Sign up and set up your profile" },
                { step: "2", title: "Explore Courses", desc: "Browse from 500+ expert-led courses" },
                { step: "3", title: "Start Learning", desc: "Learn at your own pace and schedule" },
                { step: "4", title: "Earn Certificate", desc: "Complete and get recognized" },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  {i < 3 && <div className="absolute top-6 -right-3 hidden md:block text-muted-foreground">→</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { stat: "15K+", label: "Active Learners" },
                { stat: "500+", label: "Quality Courses" },
                { stat: "200+", label: "Expert Instructors" },
                { stat: "95%", label: "Satisfaction Rate" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{item.stat}</div>
                  <p className="text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Featured Courses</h2>
              <p className="text-lg text-muted-foreground">Start with one of our most popular courses</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading ? (
                // Loading skeletons
                [1, 2, 3].map((i) => (
                  <div key={i} className="p-6 rounded-lg border border-border bg-card animate-pulse">
                    <div className="h-40 bg-secondary/20 rounded-lg mb-4" />
                    <div className="h-5 bg-secondary/20 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-secondary/20 rounded w-1/2 mb-4" />
                    <div className="h-4 bg-secondary/20 rounded w-1/4" />
                  </div>
                ))
              ) : featuredCourses && featuredCourses?.data && featuredCourses.data.length > 0 ? (
                featuredCourses.data.map((course, i) => (
                  <div
                    key={course.id || i}
                    className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow "
                  >
                    <Image
                      src={course?.thumbnail || "/placeholder-course.jpg"}
                      height={600}
                      width={600}
                      alt={course?.title || "Course thumbnail"}
                      className="max-h-60 h-full"
                    />
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{course.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="px-2 py-1 bg-primary/10 rounded text-primary">{"Beginner"}</span>
                      <span>⭐ {5}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">100 + students</p>
                      {/* button to go to details page */}{" "}
                      <Link className="cursor-pointer" href={`/courses/${course.id}`}>
                        <Button variant="outline" size="sm" className="mt-4 cursor-pointer">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-3 text-center text-muted-foreground py-8">
                  No courses available right now.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">What Our Learners Say</h2>
              <p className="text-lg text-muted-foreground">Real stories from real learners</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Flexible Pricing</h2>
              <p className="text-lg text-muted-foreground">Choose the plan that works best for you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Get answers to common questions</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-4 rounded-lg border border-border bg-card cursor-pointer hover:shadow-md transition-shadow"
                >
                  <summary className="flex items-center justify-between font-semibold text-foreground">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground text-sm">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold">Stay Updated</h2>
              <p className="text-lg text-primary-foreground/80">
                Get the latest courses and learning tips delivered to your inbox
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
              />
              <Button variant="secondary" size="lg" className="font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                Scale Your Skills Faster
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of ambitious professionals who have already accelerated their careers with Shikhi. Get
                unlimited access to top-tier courses today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="text-base">
                <Link href="/contact">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
