'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plane,
    Hotel,
    Home,
    Package,
    Train,
    Bus,
    Car,
    Ticket,
    Search,
    Loader2,
    Star,
    MapPin,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const CATEGORIES = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'villas', label: 'Villas & Homestays', icon: Home },
    { id: 'packages', label: 'Holiday Packages', icon: Package },
    { id: 'trains', label: 'Trains', icon: Train },
    { id: 'buses', label: 'Buses', icon: Bus },
    { id: 'cabs', label: 'Cabs', icon: Car },
    { id: 'tours', label: 'Tours & Attractions', icon: Ticket },
];

export default function TravelBooking() {
    const { user } = useAuth();
    const [activeCategory, setActiveCategory] = useState('flights');
    const [from, setFrom] = useState('Mumbai');
    const [to, setTo] = useState('Goa');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const getRecommendations = async () => {
        if (!user) return;
        setLoading(true);
        setBookingSuccess(false);
        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: `booking-${activeCategory}`,
                    uid: user.uid,
                    prompt: `Suggest the best ${activeCategory} options from ${from} to ${to}.
                    Return a JSON object with: items (array of 3 objects with name, price, rating, details), tips (array of 2 strings).`,
                    systemPrompt: "You are a travel booking expert. Always return response in valid JSON format."
                })
            });
            const data = await res.json();
            setResults(JSON.parse(data.content));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBook = () => {
        setBookingSuccess(true);
    };

    return (
        <div className="space-y-8">
            {/* Category Navigation */}
            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setActiveCategory(cat.id);
                            setResults(null);
                        }}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all",
                            activeCategory === cat.id
                                ? "bg-primary text-white"
                                : "glass hover:bg-white/10"
                        )}
                    >
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Search Box */}
            <div className="glass p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">From</label>
                    <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">To</label>
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none"
                    />
                </div>
                <button
                    onClick={getRecommendations}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-neon-gradient font-bold flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    Search {CATEGORIES.find(c => c.id === activeCategory)?.label}
                </button>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
                {results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {results.items.map((item: any, i: number) => (
                                <div key={i} className="glass rounded-2xl overflow-hidden flex flex-col">
                                    <div className="h-32 bg-white/5 flex items-center justify-center">
                                        {activeCategory === 'flights' && <Plane className="w-12 h-12 text-primary opacity-20" />}
                                        {activeCategory === 'hotels' && <Hotel className="w-12 h-12 text-secondary opacity-20" />}
                                        {activeCategory === 'trains' && <Train className="w-12 h-12 text-accent opacity-20" />}
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold">{item.name}</h4>
                                            <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                                <Star className="w-3 h-3 fill-current" /> {item.rating}
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-4">{item.details}</p>
                                        <div className="mt-auto pt-4 flex items-center justify-between">
                                            <div className="text-xl font-black">{item.price}</div>
                                            <button
                                                onClick={handleBook}
                                                className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-white/90"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="glass p-6 rounded-2xl border-primary/20">
                            <h4 className="font-bold mb-4 flex items-center gap-2">
                                <Star className="w-4 h-4 text-accent" /> AI Travel Tips
                            </h4>
                            <div className="space-y-3">
                                {results.tips.map((tip: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        {tip}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Booking Success Modal */}
            <AnimatePresence>
                {bookingSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="max-w-md w-full glass p-10 rounded-3xl text-center space-y-6"
                        >
                            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black">Booking Confirmed!</h2>
                            <p className="text-muted-foreground">This is a mock booking for demo purposes. In the production version, this would be linked to real APIs.</p>
                            <button
                                onClick={() => setBookingSuccess(false)}
                                className="w-full py-4 rounded-xl bg-white text-black font-bold"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
