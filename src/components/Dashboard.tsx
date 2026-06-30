'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
    LayoutDashboard,
    Zap,
    Sparkles,
    TrendingUp,
    MapPin,
    Settings,
    LogOut,
    Menu,
    X,
    User
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import ContentPack from '@/components/ContentPack';
import ContentImprover from '@/components/ContentImprover';
import TrendDiscovery from '@/components/TrendDiscovery';
import TravelMind from '@/components/TravelMind';

const TABS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'content-pack', label: 'Content Pack', icon: Zap },
    { id: 'improver', label: 'Improver', icon: Sparkles },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'travel', label: 'TravelMind', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Dashboard() {
  const { user, profile, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
        <Zap className="w-10 h-10 text-primary animate-pulse" />
    </div>
  );

  if (!user) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Please Login to Access Dashboard</h1>
            <p className="text-muted-foreground mb-8 text-sm">Join thousands of creators building smarter with AI.</p>
            <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 rounded-full bg-neon-gradient font-bold"
            >
                Back to Home
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-foreground flex">
        {/* Sidebar */}
        <aside className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-[#15151E] border-r border-white/5 transition-transform duration-300 md:relative md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            <div className="p-6 h-full flex flex-col">
                <Logo size="sm" className="mb-10" />

                <nav className="space-y-2 flex-grow">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSidebarOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                activeTab === tab.id
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                            {user.displayName?.[0] || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">{user.displayName || 'User'}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 h-screen overflow-y-auto">
            {/* Header */}
            <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-background/50 backdrop-blur-sm sticky top-0 z-40">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden p-2 hover:bg-white/5 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex-1 px-4">
                    <h2 className="font-bold text-lg md:text-xl">
                        {TABS.find(t => t.id === activeTab)?.label}
                    </h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Plan</span>
                        <span className={cn(
                            "text-xs font-black px-2 py-0.5 rounded",
                            profile?.isPro ? "bg-secondary/20 text-secondary" : "bg-white/10 text-white"
                        )}>
                            {profile?.isPro ? 'PRO' : 'FREE'}
                        </span>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="p-4 md:p-8">
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard
                                label="Total Generations"
                                value={profile?.totalGenerations || 0}
                                icon={<Zap className="text-primary" />}
                            />
                            <StatCard
                                label="Daily Usage"
                                value={`${profile?.dailyUsageCount || 0} / ${profile?.isPro ? 100 : 10}`}
                                icon={<Sparkles className="text-secondary" />}
                            />
                            <StatCard
                                label="Avg Viral Score"
                                value="84%"
                                icon={<TrendingUp className="text-accent" />}
                            />
                            <StatCard
                                label="Places Visited"
                                value="3"
                                icon={<MapPin className="text-blue-500" />}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="glass p-6 rounded-2xl">
                                <h3 className="font-bold mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <Zap className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">Content Pack Generated</p>
                                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass p-6 rounded-2xl bg-neon-gradient text-white flex flex-col justify-between overflow-hidden relative">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black mb-2">Upgrade to Pro</h3>
                                    <p className="text-sm opacity-90 mb-6 max-w-[200px]">Get 100 generations per day and access to TravelMind AI Pro.</p>
                                    <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform">
                                        Upgrade Now
                                    </button>
                                </div>
                                <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 opacity-20 rotate-12" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'content-pack' && <ContentPack />}
                {activeTab === 'improver' && <ContentImprover />}
                {activeTab === 'trends' && <TrendDiscovery />}
                {activeTab === 'travel' && <TravelMind />}

                {activeTab === 'settings' && (
                    <div className="max-w-2xl mx-auto glass p-8 rounded-3xl space-y-8">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold">
                                {user.displayName?.[0] || 'U'}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{user.displayName || 'User'}</h3>
                                <p className="text-muted-foreground">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Account Status</label>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <span className="font-medium">{profile?.isPro ? 'Pro Subscription' : 'Free Plan'}</span>
                                    {!profile?.isPro && <button className="text-primary text-sm font-bold">Upgrade</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
            />
        )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) {
    return (
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <p className="text-xl font-black">{value}</p>
            </div>
        </div>
    );
}
