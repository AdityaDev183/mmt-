'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Logo, TravelMindLogo } from '@/components/Logo';
import { ArrowRight, Zap, TrendingUp, Sparkles, MapPin } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Build Smarter. Faster.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                With AI.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The ultimate AI Growth & Personalization Engine for creators.
              Replace your entire strategy team with a single tool.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full md:w-auto px-8 py-4 rounded-full bg-neon-gradient text-lg font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                Start Creating Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="w-full md:w-auto px-8 py-4 rounded-full glass hover:bg-white/10 transition-colors text-lg font-bold"
              >
                View Features
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core AI Features</h2>
            <p className="text-muted-foreground">Everything you need to dominate social media.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-primary" />}
              title="One-Click Content Pack"
              description="Hooks, scripts, captions, and hashtags generated in seconds for any idea."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-secondary" />}
              title="Viral Score Engine"
              description="Predict the potential of your content with our proprietary AI scoring system."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-accent" />}
              title="Content Improver"
              description="Transform average ideas into viral gold with AI-powered refinement."
            />
          </div>
        </div>
      </section>

      {/* TravelMind AI Section */}
      <section id="travelmind" className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <TravelMindLogo size="md" />
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6">
                Travel based on your <br />
                <span className="text-secondary">Mindset, not just Map.</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Our flagship emotion-aware AI recommends destinations in Maharashtra that match your current mood, budget, and personality.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Emotionally intelligent recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Custom itineraries based on energy levels</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Personalized explanations: why you need this trip</span>
                </li>
              </ul>
              <Link
                href="/travelmind"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-opacity-90 transition-opacity"
              >
                Try TravelMind AI <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex-1 w-full aspect-square glass rounded-2xl relative overflow-hidden">
                {/* Mock UI for TravelMind */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 p-6 glass rounded-xl border-white/20 shadow-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <p className="text-sm italic text-muted-foreground mb-2">"I'm feeling stressed and need some peace..."</p>
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="font-bold text-primary mb-1">Recommendation: Alibaug Beach</p>
                            <p className="text-xs text-muted-foreground">"You seem mentally stressed. A peaceful beach destination like Alibaug will help you relax and recharge."</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-12">Simple Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <PricingCard
                    title="Free"
                    price="₹0"
                    features={["10 generations/day", "Basic AI Models", "Community Support"]}
                    cta="Get Started"
                    link="/dashboard"
                />
                <PricingCard
                    title="Pro"
                    price="₹999"
                    period="/month"
                    features={["100 generations/day", "Llama 3.1 70B & Nemotron", "TravelMind AI Full Access", "Priority Support"]}
                    cta="Upgrade Now"
                    highlighted
                    link="/dashboard"
                />
            </div>
        </div>
      </section>

      <footer className="py-10 border-t border-white/10 text-center text-muted-foreground text-sm">
        <p>© 2024 Creator Copilot AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl glass hover:border-primary/50 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, period = "", features, cta, highlighted = false, link }: { title: string, price: string, period?: string, features: string[], cta: string, highlighted?: boolean, link: string }) {
  return (
    <div className={cn(
      "p-8 rounded-3xl flex flex-col items-center",
      highlighted ? "bg-neon-gradient text-white scale-105" : "glass"
    )}>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className="text-sm opacity-80">{period}</span>
      </div>
      <ul className="space-y-4 mb-8 text-left w-full">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <Zap className="w-4 h-4 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={link}
        className={cn(
            "w-full py-3 rounded-full font-bold transition-all",
            highlighted ? "bg-white text-black hover:bg-white/90" : "bg-primary text-white hover:opacity-90"
        )}
      >
        {cta}
      </Link>
    </div>
  );
}
