import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-card/90 backdrop-filter backdrop-blur-md shadow-md border-b border-border/40 relative">
      {/* Decorative gold line at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30"></div>
      
      <div className="flex items-center space-x-3">
        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shadow-md border border-gold/20 overflow-hidden">
          <Image 
            src="/logo.jpeg" 
            alt="Shastrarth Logo" 
            width={36} 
            height={36}
            className="object-cover"
          />
        </div>
        <Link href="/" className="text-xl font-semibold tracking-wider font-serif gold-accent">
         शास्त्रार्थ
        </Link>
      </div>
      
      <nav className="hidden md:flex gap-8 items-center">
        <Link href="/" className="hover:text-primary transition-colors duration-200 font-medium text-sm animated-underline">
          Home
        </Link>
        <Link href="/debate" className="hover:text-primary transition-colors duration-200 font-medium text-sm animated-underline">
          Debate
        </Link>
        <Link href="/archive" className="hover:text-primary transition-colors duration-200 font-medium text-sm animated-underline">
          Archive
        </Link>
        <Link href="/about" className="hover:text-primary transition-colors duration-200 font-medium text-sm animated-underline">
          About
        </Link>
      </nav>
      
      <div className="flex items-center gap-3">
        <Link 
          href="/debate" 
          className="hidden md:flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200 text-sm font-medium shadow-md border border-border/50 neubrutalism"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
          Start Debate
        </Link>
        
        <button className="md:hidden text-foreground p-2 rounded-md hover:bg-card/80">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <Link href="/profile" className="p-2 rounded-full hover:bg-card transition-colors duration-200 border border-border/50 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
      </div>
    </header>
  );
} 