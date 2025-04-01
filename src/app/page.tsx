import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import PersonalitySelector from '@/components/PersonalitySelector';
import TopicSelector from '@/components/TopicSelector';
import DifficultySelector from '@/components/DifficultySelector';
import FormatSelector from '@/components/FormatSelector';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-12 relative overflow-hidden">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
                <span className="scribble-highlight">Perfect Your</span><br />
                <span className="gold-accent">Rhetorical Prowess</span>
              </h2>
              <p className="text-foreground/80 text-lg md:text-xl mb-8 max-w-lg font-serif leading-relaxed">
                Engage in dialectical combat with an AI opponent trained in the art of argumentation, from Socratic inquiry to Aristotelian syllogism.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/debate">
                  <Button className="scribble-border">Begin Dialectic</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute -top-16 -right-16 w-64 h-64 border border-gold/20 rounded-full"></div>
              <Card className="transform rotate-2 ml-12 quote-card">
                <h3 className="font-serif text-xl mb-4 gold-accent">Philosophical Sparring</h3>
                <p className="font-serif text-foreground/80 leading-relaxed">
                  "The supreme art of argument is to end with questions — yet be perceived to have won."
                </p>
                <div className="mt-4 pt-4 border-t border-border/20">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-card mr-3 border border-gold/20 overflow-hidden">
                      <img 
                        src="/personalities/suntzu.jpg" 
                        alt="Aristotle" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-foreground/70 text-sm">Aristotle</span>
                  </div>
                </div>
              </Card>
              
              <Card className="transform -rotate-3 mt-6 mr-12 ml-24 quote-card">
                <h3 className="font-serif text-xl mb-4 gold-accent">Logical Rigor</h3>
                <p className="font-serif text-foreground/80 leading-relaxed">
                  "Truth emerges from the clash of differing opinions, each challenging the other to rise to greater heights."
                </p>
                <div className="mt-4 pt-4 border-t border-border/20">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-card mr-3 border border-gold/20 overflow-hidden">
                      <img 
                        src="/personalities/socrates.jpg" 
                        alt="Socrates" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-foreground/70 text-sm">Socrates</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 md:px-12 simple-gradient relative">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4 gold-accent scribble-underline inline-block">The Art of Dialectic</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto font-serif">
                Engage in structured debate with an AI trained in classical philosophical traditions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card/60 p-6 rounded-md relative dashed-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                  <span className="text-primary font-serif text-xl">01</span>
                </div>
                <h3 className="text-xl font-serif mb-3 gold-accent">Select Your Opponent</h3>
                <p className="text-foreground/80 font-serif">
                  Choose from philosophical traditions like Socratic, Aristotelian, or Nietzschean approaches.
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Socrates</div>
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Aristotle</div>
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Nietzsche</div>
                </div>
              </div>
              
              <div className="bg-card/60 p-6 rounded-md relative dashed-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                  <span className="text-primary font-serif text-xl">02</span>
                </div>
                <h3 className="text-xl font-serif mb-3 gold-accent">Choose Your Topic</h3>
                <p className="text-foreground/80 font-serif">
                  Debate on ethics, politics, metaphysics, or create a custom proposition.
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Ethics</div>
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Politics</div>
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Custom</div>
                </div>
              </div>
              
              <div className="bg-card/60 p-6 rounded-md relative dashed-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                  <span className="text-primary font-serif text-xl">03</span>
                </div>
                <h3 className="text-xl font-serif mb-3 gold-accent">Set Difficulty</h3>
                <p className="text-foreground/80 font-serif">
                  Adjust the challenge from foundational to advanced rhetoric.
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Beginner</div>
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Intermediate</div>
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Advanced</div>
                </div>
              </div>
              
              <div className="bg-card/60 p-6 rounded-md relative dashed-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                  <span className="text-primary font-serif text-xl">04</span>
                </div>
                <h3 className="text-xl font-serif mb-3 gold-accent">Select Format</h3>
                <p className="text-foreground/80 font-serif">
                  Choose from timed rounds, open-ended, or structured debate modes.
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Timed</div>
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Open</div>
                  <div className="bg-primary/10 px-3 py-1 rounded-sm text-xs">Structured</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 simple-gradient relative overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-32 h-48 border border-gold/20 rounded-sm transform rotate-12 z-0"></div>
          <div className="absolute bottom-[10%] right-[10%] w-40 h-40 border border-gold/20 rounded-full transform z-0"></div>
          
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
              <span className="scribble-highlight">Challenge Your</span>
              <br />
              <span className="gold-accent">Intellectual Boundaries</span>
            </h2>
            <p className="text-foreground/80 mb-12 text-lg max-w-2xl mx-auto font-serif leading-relaxed">
              Enter the hallowed halls of discourse where ideas are tested, refined, and elevated through the ancient practice of dialectical exchange.
            </p>
            <div className="inline-block relative">
              <Link href="/debate">
                <Button size="lg" className="shadow-lg border-2 border-border/70 py-6 px-8 text-lg scribble-border">
                  Commence Your Intellectual Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}
