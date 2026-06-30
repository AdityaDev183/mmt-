'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plane, Loader2, Compass, Wind, Coffee, Heart, AlertCircle, Calendar } from 'lucide-react';
import { TravelMindLogo } from './Logo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const MOODS = [
  { id: 'stressed', label: 'Stressed', icon: <AlertCircle className="w-4 h-4" /> },
  { id: 'happy', label: 'Happy', icon: <Heart className="w-4 h-4" /> },
  { id: 'bored', label: 'Bored', icon: <Coffee className="w-4 h-4" /> },
  { id: 'adventurous', label: 'Adventurous', icon: <Compass className="w-4 h-4" /> },
  { id: 'peaceful', label: 'Peaceful', icon: <Wind className="w-4 h-4" /> },
];

export default function TravelMind() {
  const [mood, setMood] = useState('stressed');
  const [budget, setBudget] = useState('5000');
  const [travelType, setTravelType] = useState('solo');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const { user } = useAuth();
  const getRecommendation = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'travelmind',
          uid: user.uid,
          prompt: `User is feeling ${mood}. Budget: ₹${budget}. Type: ${travelType}.
          Recommend a destination in Maharashtra, India.
          Return a JSON object with: destination (string), explanation (string - focus on emotion), activities (array of 3), itinerary (string).`,
          systemPrompt: "You are an emotionally intelligent travel guide. Always return response in valid JSON format."
        })
      });
      const data = await res.json();
      setResult(JSON.parse(data.content));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
            <TravelMindLogo size="lg" />
        </div>
        <p className="text-muted-foreground max-w-xl mx-auto">
            Our emotion-aware AI understands how you feel and recommends the perfect Maharashtra getaway to match your energy.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl space-y-8 border-primary/20">
        <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-primary">How are you feeling?</label>
            <div className="flex flex-wrap gap-3">
                {MOODS.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setMood(m.id)}
                        className={cn(
                            "px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all",
                            mood === m.id ? "bg-primary text-white scale-105 shadow-lg shadow-primary/20" : "glass hover:bg-white/10"
                        )}
                    >
                        {m.icon} {m.label}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-secondary">Max Budget (INR)</label>
                <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-sm font-bold">
                    <span>₹1,000</span>
                    <span className="text-secondary text-lg">₹{Number(budget).toLocaleString()}</span>
                    <span>₹50,000+</span>
                </div>
            </div>
            <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-accent">Travel Type</label>
                <select
                    value={travelType}
                    onChange={(e) => setTravelType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-accent"
                >
                    <option value="solo">Solo Adventure</option>
                    <option value="friends">With Friends</option>
                    <option value="family">Family Trip</option>
                    <option value="couple">Romantic Couple</option>
                </select>
            </div>
        </div>

        <button
          onClick={getRecommendation}
          disabled={loading}
          className="w-full py-5 rounded-2xl bg-neon-gradient text-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Compass className="w-6 h-6" />}
          Find My Destination
        </button>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-3xl border-secondary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Plane className="w-32 h-32 rotate-45" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs mb-2">
                        <MapPin className="w-4 h-4" /> Recommended for you
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        {result.destination}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                        "{result.explanation}"
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-2xl space-y-4">
                    <h3 className="font-bold flex items-center gap-2 text-accent">
                        <Compass className="w-5 h-5" /> Suggested Activities
                    </h3>
                    <ul className="space-y-3">
                        {result.activities.map((act: string, i: number) => (
                            <li key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-sm">
                                <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">{i+1}</div>
                                {act}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="glass p-6 rounded-2xl space-y-4">
                    <h3 className="font-bold flex items-center gap-2 text-primary">
                        <Calendar className="w-5 h-5" /> Itinerary Preview
                    </h3>
                    <div className="p-4 bg-white/5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap">
                        {result.itinerary}
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
