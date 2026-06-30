'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search, Loader2, Info, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function TrendDiscovery() {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState<any[] | null>(null);

  const { user } = useAuth();
  const discoverTrends = async () => {
    if (!niche || !user) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'trends',
          uid: user.uid,
          prompt: `Identify 3 trending topics and viral content ideas for the "${niche}" niche.
          Return a JSON array of objects, each with: topic (string), idea (string), whyItWorks (string).`,
          systemPrompt: "You are a trend analyst. Always return response in valid JSON format."
        })
      });
      const data = await res.json();
      setTrends(JSON.parse(data.content));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Trend Discovery AI</h1>
        <p className="text-muted-foreground">Find what's viral in your niche before anyone else.</p>
      </div>

      <div className="flex gap-2 p-2 glass rounded-2xl">
        <input
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Enter your niche (e.g., 'Fitness', 'SaaS', 'Crypto')"
          className="flex-1 bg-transparent border-none px-4 py-2 focus:outline-none"
        />
        <button
          onClick={discoverTrends}
          disabled={loading || !niche}
          className="px-6 py-3 rounded-xl bg-neon-gradient font-bold flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          Explore
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trends ? (
          trends.map((trend, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl border-primary/20 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded uppercase tracking-wider">Trending</span>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">{trend.topic}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow italic">"{trend.idea}"</p>
              <div className="mt-auto pt-4 border-t border-white/5">
                <p className="text-xs font-semibold text-accent flex items-center gap-1 mb-1 uppercase tracking-tighter">
                  <Info className="w-3 h-3" /> Why this works
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {trend.whyItWorks}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
            // Empty state placeholders
            [1, 2, 3].map((i) => (
                <div key={i} className="glass p-6 rounded-2xl opacity-20 border-dashed border-2 flex flex-col h-64 items-center justify-center text-center">
                    <TrendingUp className="w-8 h-8 mb-2" />
                    <p className="text-xs uppercase font-bold">Trend #{i}</p>
                </div>
            ))
        )}
      </div>
    </div>
  );
}
