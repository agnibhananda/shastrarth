'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

import Button from '@/components/Button';
import Card from '@/components/Card';
import PersonalityCard from '@/components/PersonalityCard';

// Define debate formats
const debateFormats = [
  {
    id: 'classical',
    name: 'Classical Debate',
    description: 'Structured format with formal opening and closing statements, and multiple rounds of rebuttals.',
    rounds: 5,
    timePerRound: 180, // 3 minutes per round
  },
  {
    id: 'socratic',
    name: 'Socratic Dialog',
    description: 'A question-based approach where the AI will primarily ask questions to help clarify your position.',
    rounds: 8,
    timePerRound: 0, // untimed
  },
  {
    id: 'casual',
    name: 'Casual Discussion',
    description: 'Free-flowing conversation format with less structure but still focused on the topic.',
    rounds: 6,
    timePerRound: 0, // untimed
  },
  {
    id: 'rapid',
    name: 'Rapid Fire',
    description: 'Quick exchanges with short time limits, testing your ability to think and respond quickly.',
    rounds: 10,
    timePerRound: 60, // 1 minute per round
  },
];

// Define AI personalities
const aiPersonalities = [
  {
    id: 'socrates',
    name: 'Socrates',
    description: 'Uses the Socratic method to question assumptions and lead you to deeper insights.',
    style: 'Question-based, philosophical, probing',
    avatar: 'Σ',
    quote: 'The unexamined life is not worth living.',
    image: 'socrates.jpg',
    symbol: 'Σ'
  },
  {
    id: 'sunTzu',
    name: 'Sun Tzu',
    description: 'Uses strategic principles and war analogies to challenge your arguments.',
    style: 'Strategic, metaphorical, calculated',
    avatar: '孫',
    quote: 'Know thy enemy and know thyself; in a hundred battles, you will never be defeated.',
    image: 'suntzu.jpg',
    symbol: '孫'
  },
  {
    id: 'shakespeare',
    name: 'Shakespeare',
    description: 'Eloquent and dramatic, using poetic language and rhetorical devices.',
    style: 'Poetic, passionate, dramatic',
    avatar: 'W',
    quote: 'To be, or not to be, that is the question.',
    image: 'shakespeare.jpg',
    symbol: 'W'
  },

];

export default function DebateSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [debateConfig, setDebateConfig] = useState({
    topic: '',
    formatId: '',
    personalityId: '',
  });

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debateConfig.topic.trim()) {
      setStep(2);
    }
  };

  const handleFormatSelect = (formatId: string) => {
    setDebateConfig({ ...debateConfig, formatId });
    setStep(3);
  };

  const handlePersonalitySelect = (personalityId: string) => {
    setDebateConfig({ ...debateConfig, personalityId });
    setStep(4);
  };

  const startDebate = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('debateConfig', JSON.stringify(debateConfig));
    }
    router.push(`/debate/${Date.now()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background book-texture">
      <Navbar />
      
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          {/* Progress indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-serif text-foreground/60">
                Step {step} of 4
              </div>
              <div className="text-sm font-serif text-foreground/60">
                {step === 1 ? 'Choose Topic' :
                 step === 2 ? 'Select Format' :
                 step === 3 ? 'Pick Personality' :
                 'Review & Start'}
              </div>
            </div>
            <div className="h-1.5 bg-card/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-all duration-700 ease-in-out"
                style={{ 
                  width: `${(step / 4) * 100}%`,
                  boxShadow: '0 0 8px rgba(191, 54, 54, 0.5)' 
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    s <= step 
                      ? 'bg-primary shadow-md shadow-primary/30 scale-100' 
                      : 'bg-card/50 scale-90'
                  }`}
                  onClick={() => {
                    // Only allow going back to previous steps
                    if (s < step) {
                      setStep(s);
                    }
                  }}
                  style={{
                    cursor: s < step ? 'pointer' : 'default'
                  }}
                >
                  {s <= step && (
                    <div className="w-2 h-2 rounded-full bg-white"/>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Topic Selection */}
          {step === 1 && (
            <div className="space-y-8 fade-in">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-serif mb-4 gold-accent shimmer">What shall we debate?</h1>
                <p className="text-foreground/70 font-serif italic">Choose a topic or craft your own proposition</p>
              </div>

              <form onSubmit={handleTopicSubmit} className="space-y-8">
                <div className="relative">
                  <textarea
                    value={debateConfig.topic}
                    onChange={(e) => setDebateConfig({ ...debateConfig, topic: e.target.value })}
                    placeholder="Enter your debate topic or proposition..."
                    className="w-full p-6 border border-border/20 bg-card/40 focus:border-primary focus:outline-none transition-colors duration-200 rounded-md h-32 resize-none text-lg font-serif backdrop-blur-sm"
                  />
                  <div className="absolute bottom-4 right-4">
                    <Button type="submit" disabled={!debateConfig.topic.trim()}>
                      Continue
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Should artificial intelligence development be regulated?",
                    "Is democracy the best form of government?",
                    "Should college education be free for all citizens?",
                    "Does social media do more harm than good?",
                  ].map((topic, index) => (
                    <Card 
                      key={index}
                      className="cursor-pointer hover:translate-y-[-4px] transition-all duration-200"
                      hover={true}
                      variant="glass"
                      onClick={() => setDebateConfig({ ...debateConfig, topic })}
                    >
                      <p className="text-sm leading-relaxed">{topic}</p>
                    </Card>
                  ))}
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Format Selection */}
          {step === 2 && (
            <div className="space-y-8 fade-in">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-serif mb-4 gold-accent shimmer">Choose Your Format</h1>
                <p className="text-foreground/70 font-serif italic">Select the structure of your debate</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {debateFormats.map((format) => (
                  <Card
                    key={format.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      debateConfig.formatId === format.id ? 'border-2 border-primary/70 shadow-lg shadow-primary/10' : ''
                    }`}
                    hover={true}
                    variant={debateConfig.formatId === format.id ? 'elegant' : 'minimal'}
                    onClick={() => handleFormatSelect(format.id)}
                  >
                    <div className="p-2">
                      <h3 className="text-xl font-serif mb-2">{format.name}</h3>
                      <p className="text-sm text-foreground/70 mb-4">{format.description}</p>
                      <div className="flex items-center text-xs text-foreground/60">
                        <span className="mr-4">{format.rounds} rounds</span>
                        {format.timePerRound > 0 && (
                          <span>{format.timePerRound} seconds per round</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Personality Selection */}
          {step === 3 && (
            <div className="space-y-8 fade-in">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-serif mb-4 gold-accent shimmer">Select Your Opponent</h1>
                <p className="text-foreground/70 font-serif italic">Choose who you wish to debate with</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiPersonalities.map((personality) => (
                  <PersonalityCard
                    key={personality.id}
                    personality={personality}
                    onClick={() => handlePersonalitySelect(personality.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-8 fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-serif mb-3 gold-accent shimmer">Review Your Setup</h1>
                <p className="text-foreground/70 font-serif italic">Confirm your debate configuration</p>
              </div>

              <Card className="p-8 shadow-sleek-xl hover-float glass-morphism" variant="glass" bordered>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-serif mb-2 gold-accent">Topic</h3>
                    <p className="text-foreground/90 text-xl font-serif">{debateConfig.topic}</p>
                  </div>

                  <div className="border-minimal py-4">
                    <h3 className="text-lg font-serif mb-2 gold-accent">Format</h3>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-foreground/90 text-xl font-serif">
                          {debateFormats.find(f => f.id === debateConfig.formatId)?.name}
                        </p>
                        <p className="text-sm text-foreground/60">
                          {debateFormats.find(f => f.id === debateConfig.formatId)?.rounds} rounds
                          {debateFormats.find(f => f.id === debateConfig.formatId)?.timePerRound ? 
                            `, ${debateFormats.find(f => f.id === debateConfig.formatId)?.timePerRound} seconds per round` : 
                            ', untimed'}
                        </p>
                      </div>
                      <Button 
                        onClick={() => setStep(2)} 
                        variant="glass"
                        size="sm"
                        className="text-xs subtle-glow"
                      >
                        Change
                      </Button>
                    </div>
                  </div>

                  <div className="border-minimal py-4">
                    <h3 className="text-lg font-serif mb-3 gold-accent">Opponent</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border border-gold/30 shadow-lg transition-transform duration-300 hover:scale-105 subtle-glow">
                          {aiPersonalities.find(p => p.id === debateConfig.personalityId)?.image ? (
                            <img 
                              src={`/personalities/${aiPersonalities.find(p => p.id === debateConfig.personalityId)?.image}`}
                              alt={aiPersonalities.find(p => p.id === debateConfig.personalityId)?.name}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <span className="text-2xl font-serif text-gold">
                                {aiPersonalities.find(p => p.id === debateConfig.personalityId)?.avatar}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-foreground/90 text-xl font-serif">
                            {aiPersonalities.find(p => p.id === debateConfig.personalityId)?.name}
                          </p>
                          <p className="text-sm text-foreground/60">
                            {aiPersonalities.find(p => p.id === debateConfig.personalityId)?.style}
                          </p>
                          <p className="text-xs italic text-foreground/50 mt-1">
                            "{aiPersonalities.find(p => p.id === debateConfig.personalityId)?.quote}"
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setStep(3)} 
                        variant="glass"
                        size="sm"
                        className="text-xs subtle-glow"
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center mt-12">
                <Button 
                  size="xl" 
                  onClick={startDebate} 
                  variant="glass"
                  className="px-12 py-4 text-lg shadow-sleek hover-float transition-all duration-300 font-serif tracking-wide subtle-glow"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  }
                >
                  Begin Debate
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
    </div>
  );
} 