'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Loader2, Copy, Check, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export default function ContentPack() {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState('Professional');
  const [audience, setAudience] = useState('General');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const { user } = useAuth();
  const generateContent = async () => {
    if (!input || !user) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'content-pack',
          uid: user.uid,
          prompt: `Generate a full-stack content pack for this idea: "${input}".
          Target Audience: ${audience}. Tone: ${tone}.
          Return a JSON object with: hooks (array of 3), script (string), caption (string), cta (string), hashtags (string), viralScore (number 0-100).`,
          systemPrompt: "You are an expert social media strategist. Always return response in valid JSON format."
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">One-Click Content Pack</h1>
        <p className="text-muted-foreground">Turn one idea into a complete viral strategy.</p>
      </div>

      <div className="glass p-6 rounded-2xl space-y-6">
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Idea</label>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your content idea (e.g., 'How to start a SaaS in 2024')"
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-primary transition-colors resize-none"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tone</label>
                <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none"
                >
                    <option>Professional</option>
                    <option>Witty & Funny</option>
                    <option>Urgent</option>
                    <option>Inspirational</option>
                    <option>Educational</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Target Audience</label>
                <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none"
                >
                    <option>General</option>
                    <option>Beginners</option>
                    <option>Experts</option>
                    <option>Students</option>
                    <option>Entrepreneurs</option>
                </select>
            </div>
        </div>

        <button
          onClick={generateContent}
          disabled={loading || !input}
          className="w-full py-4 rounded-xl bg-neon-gradient font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Generate Content Pack
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Viral Score Header */}
          <div className="glass p-6 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center text-xl font-bold">
                {result.viralScore}
              </div>
              <div>
                <h3 className="font-bold">Viral Score</h3>
                <p className="text-sm text-muted-foreground">Based on current social trends</p>
              </div>
            </div>
            <div className="hidden md:block">
                <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.viralScore}%` }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hooks */}
            <div className="glass p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Viral Hooks</h3>
                </div>
                <div className="space-y-3">
                    {result.hooks.map((hook: string, i: number) => (
                        <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 text-sm group relative">
                            {hook}
                            <button
                                onClick={() => copyToClipboard(hook, `hook-${i}`)}
                                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                            >
                                {copied === `hook-${i}` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Script */}
            <div className="glass p-6 rounded-2xl space-y-4">
                <h3 className="font-bold flex items-center gap-2">📜 Script Skeleton</h3>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-sm whitespace-pre-wrap">
                    {result.script}
                </div>
            </div>
          </div>

          {/* Caption & Tags */}
          <div className="glass p-6 rounded-2xl space-y-4">
            <h3 className="font-bold flex items-center gap-2">✍️ Optimized Caption</h3>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-sm whitespace-pre-wrap relative group">
                {result.caption}
                <div className="mt-4 text-primary font-medium">{result.cta}</div>
                <div className="mt-2 text-muted-foreground">{result.hashtags}</div>
                <button
                    onClick={() => copyToClipboard(`${result.caption}\n\n${result.cta}\n\n${result.hashtags}`, 'full')}
                    className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/10 rounded-lg"
                >
                    {copied === 'full' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
