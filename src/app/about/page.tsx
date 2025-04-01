import React from 'react';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-serif mb-8 text-center">About Shastrarth</h1>
          
          <Card className="mb-12">
            <div className="p-6">
              <h2 className="text-2xl font-serif mb-4">Our Mission</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Shastrarth aims to revitalize the ancient art of debate for the modern digital age. Named after the Sanskrit term for scholarly discussion, our platform harnesses the power of artificial intelligence to help users refine their critical thinking and argumentation skills.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                In a world increasingly polarized by echo chambers and algorithmic bubbles, we believe the ability to engage with opposing viewpoints is more important than ever. Shastrarth provides a safe space to practice the art of dialectic reasoning, allowing users to strengthen their arguments by facing intelligent opposition.
              </p>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-serif mb-4">How It Works</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Our AI-powered debate partners use sophisticated language models to analyze your arguments, identify logical strengths and weaknesses, and respond with challenging counterpoints. Each AI personality employs different rhetorical strategies and debate styles, allowing you to practice against diverse opponents.
                </p>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-serif mb-4">Educational Approach</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Shastrarth is built on pedagogical principles that emphasize active learning and immediate feedback. After each debate, you receive detailed analysis of your performance, highlighting strengths and suggesting specific improvements for more persuasive argumentation.
                </p>
              </div>
            </Card>
          </div>
          
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-serif mb-4">The Team</h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Shastrarth was created by a team of educators, developers, and debate enthusiasts who believe in the transformative power of structured disagreement. Our diverse backgrounds in philosophy, linguistics, computer science, and education inform our approach to creating an effective platform for intellectual growth.
              </p>
              
              <div className="flex flex-col md:flex-row gap-8 justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-serif text-primary">AR</span>
                  </div>
                  <h3 className="font-serif">Dr. Amita Rao</h3>
                  <p className="text-sm text-foreground/70">Founder & Linguistics Lead</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-serif text-primary">ML</span>
                  </div>
                  <h3 className="font-serif">Marcus Lee</h3>
                  <p className="text-sm text-foreground/70">AI Development</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-serif text-primary">SP</span>
                  </div>
                  <h3 className="font-serif">Sophia Patel</h3>
                  <p className="text-sm text-foreground/70">Educational Design</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
    </div>
  );
} 