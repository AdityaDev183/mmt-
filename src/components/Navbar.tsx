import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Logo size="sm" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#travelmind" className="text-sm font-medium hover:text-secondary transition-colors">
            TravelMind AI
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full bg-neon-gradient text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};
