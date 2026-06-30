'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export default function ContentImprover() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const { user } = useAuth();
  const improveContent = async () => {
    if (!input || !user) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'content-improver',
          uid: user.uid,
          prompt: `Improve this content: "${input}".
          Make it more engaging, viral, and clear.
          Return a JSON object with: improvedContent (string), improvementScore (number 0-100), suggestions (array of 3).`,
          systemPrompt: "You are an expert content editor. Always return response in valid JSON format."
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
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Content Improver</h1>
        <p className="text-muted-foreground">Transform average content into high-performance assets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground px-2">Original Content</label>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your content here..."
                className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-primary transition-colors resize-none text-lg"
            />
            <button
                onClick={improveContent}
                disabled={loading || !input}
                className="w-full py-4 rounded-xl bg-neon-gradient font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Improve Now
            </button>
        </div>

        <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground px-2 flex justify-between items-center">
                <span>AI Enhanced Version</span>
                {result && (
                    <span className="text-primary font-bold">Score: {result.improvementScore}%</span>
                )}
            </label>
            <div className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-y-auto relative">
                {!result && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 px-10 text-center">
                        <p>Enhanced content will appear here after analysis.</p>
                    </div>
                )}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-2xl">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                )}
                {result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-lg whitespace-pre-wrap"
                    >
                        {result.improvedContent}
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 glass rounded-2xl space-y-4"
                    >
                        <h4 className="font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Key Improvements
                        </h4>
                        <div className="space-y-2">
                            {result.suggestions.map((s: string, i: number) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    {s}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
