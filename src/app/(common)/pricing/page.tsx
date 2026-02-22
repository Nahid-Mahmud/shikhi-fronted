"use client";

import { PricingCard } from "@/components/shared/PricingCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      name: "Starter",
      price: isAnnual ? "$290" : "$29",
      description: "Perfect for exploring new topics",
      features: [
        { name: "Access to 50+ courses", included: true },
        { name: "Community forum access", included: true },
        { name: "Monthly learning resources", included: true },
        { name: "Email support (24-48h response)", included: true },
        { name: "Certificate generation", included: false },
        { name: "Live mentorship sessions", included: false },
        { name: "Advanced analytics", included: false },
      ],
      highlighted: false,
      ctaLink: "/signup",
    },
    {
      name: "Professional",
      price: isAnnual ? "$790" : "$79",
      description: "Most popular for active learners",
      features: [
        { name: "Access to all courses", included: true },
        { name: "Community forum access", included: true },
        { name: "Curated learning paths", included: true },
        { name: "Priority email support (4h)", included: true },
        { name: "Certificate generation", included: true },
        { name: "Weekly group mentorship", included: true },
        { name: "Learning analytics dashboard", included: true },
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
        { name: "Private team community", included: true },
        { name: "Custom learning paths", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Advanced analytics suite", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "SSO & team management", included: true },
      ],
      highlighted: false,
      ctaLink: "/contact",
      ctaText: "Contact Sales",
    },
  ];

  const comparisonTable = [
    {
      feature: "Course Access",
      starter: "50+ courses",
      professional: "All courses",
      enterprise: "Unlimited + custom",
    },
    {
      feature: "Certificates",
      starter: "Not included",
      professional: "Included",
      enterprise: "Included",
    },
    {
      feature: "Support",
      starter: "Email (24-48h)",
      professional: "Priority email (4h)",
      enterprise: "Dedicated manager",
    },
    {
      feature: "Mentorship",
      starter: "Not included",
      professional: "Weekly sessions",
      enterprise: "Unlimited + custom",
    },
    {
      feature: "Analytics",
      starter: "Basic",
      professional: "Advanced",
      enterprise: "Enterprise suite",
    },
    {
      feature: "Community",
      starter: "Public forum",
      professional: "Public + exclusive",
      enterprise: "Private community",
    },
  ];

  const faqs = [
    {
      q: "Can I change my plan anytime?",
      a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.",
    },
    {
      q: "Do you offer a free trial?",
      a: "Yes! All new users get a 7-day free trial to explore the Professional plan. No credit card required.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans.",
    },
    {
      q: "Is there a student discount?",
      a: "Yes, students with valid .edu email addresses receive a 50% discount on all plans. Contact support to verify.",
    },
    {
      q: "What if I cancel my subscription?",
      a: "You can cancel anytime. Your access continues until the end of your billing period, and you can request a refund within 14 days.",
    },
    {
      q: "Are there any hidden fees?",
      a: "No hidden fees! The price you see is exactly what you pay. Taxes may apply depending on your location.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for your learning goals. No hidden fees, cancel anytime.
            </p>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-center gap-4">
              <span className={`font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-border transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-primary-foreground transition-transform ${
                    isAnnual ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                Annual <span className="text-sm text-primary font-semibold">(Save 17%)</span>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-16">Detailed Comparison</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">Starter</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">Professional</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, index) => (
                    <tr key={index} className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-muted-foreground">{row.starter}</td>
                      <td className="px-6 py-4 text-center text-muted-foreground">{row.professional}</td>
                      <td className="px-6 py-4 text-center text-muted-foreground">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-16">Pricing FAQ</h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-6 rounded-lg border border-border bg-card cursor-pointer hover:shadow-md transition-shadow"
                >
                  <summary className="flex items-center justify-between font-semibold text-foreground">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Trial CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center space-y-8 bg-primary text-primary-foreground rounded-lg p-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-primary-foreground/90">
                Try the Professional plan free for 7 days. No credit card required.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Looking for Enterprise?</h2>
              <p className="text-lg text-muted-foreground">
                Customized solutions for teams and organizations with dedicated support and advanced features.
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
