"use client";
import { GradientBackground } from "@/components/ui/gradient-background";
import { GradientButton } from "@/components/ui/gradient-button";
import { BrokerSelector } from "@/components/brokers/BrokerSelector";
import { mockBrokers } from "@/lib/brokers";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  Bot, 
  Shield, 
  DollarSign,
  Bitcoin,
  BarChart3,
  Sparkles,
  MessageSquare,
  Users,
  Check
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function GetSignalsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [selectedTelegram, setSelectedTelegram] = useState("");

  const totalSteps = 5; // Updated from 4 to 5

  const toggleSignalType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleBroker = (brokerId: string) => {
    setSelectedBrokers(prev => 
      prev.includes(brokerId) 
        ? prev.filter(id => id !== brokerId)
        : [...prev, brokerId]
    );
  };

  const customGradients = [
    "linear-gradient(135deg, #0d1117 0%, #000814 50%, #1a2332 100%)",
    "linear-gradient(135deg, #000814 0%, #1e3a8a 50%, #00d18f 100%)",
    "linear-gradient(135deg, #1a2332 0%, #2d68ff 50%, #06b6d4 100%)",
    "linear-gradient(135deg, #0f172a 0%, #00d18f 50%, #2d68ff 100%)",
    "linear-gradient(135deg, #0d1117 0%, #000814 50%, #1a2332 100%)",
  ];

  return (
    <GradientBackground
      gradients={customGradients}
      animationDuration={12}
      overlay={true}
      overlayOpacity={0.4}
    >
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-block mb-6">
              <button className="text-gray-400 hover:text-white transition-colors">
                ← Back to Home
              </button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get AI Trading Signals
            </h1>
            <p className="text-gray-400 text-lg">
              Set up your account to receive premium signals
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step <= currentStep 
                      ? 'bg-accent text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? 'bg-accent' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>About</span>
              <span>Type</span>
              <span>Broker</span>
              <span>Connect</span>
              <span>Subscribe</span>
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: About */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">What You'll Get</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                    <TrendingUp className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Signal Types</h3>
                    <p className="text-gray-400">
                      Real-time buy/sell signals for Forex, Crypto, Binary Options, and more
                    </p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                    <Target className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Accuracy Rate</h3>
                    <p className="text-gray-400">
                      95%+ accuracy powered by advanced AI and machine learning algorithms
                    </p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                    <Bot className="w-12 h-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Bot Automation</h3>
                    <p className="text-gray-400">
                      Automated signal delivery directly to your Telegram in real-time
                    </p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                    <Shield className="w-12 h-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Risk Management</h3>
                    <p className="text-gray-400">
                      Built-in stop-loss and take-profit recommendations for every signal
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <GradientButton onClick={() => setCurrentStep(2)}>
                    Next: Choose Signal Type
                  </GradientButton>
                </div>
              </div>
            )}

            {/* Step 2: Choose Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Select Signal Types</h2>
                <p className="text-gray-400 mb-6">Choose one or more markets you want to trade</p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { id: 'forex', name: 'Forex', icon: DollarSign, color: 'text-green-400' },
                    { id: 'crypto', name: 'Crypto', icon: Bitcoin, color: 'text-orange-400' },
                    { id: 'indices', name: 'Indices', icon: BarChart3, color: 'text-blue-400' },
                    { id: 'commodities', name: 'Commodities', icon: Sparkles, color: 'text-yellow-400' },
                    { id: 'binary', name: 'Binary Options', icon: Target, color: 'text-purple-400' },
                    { id: 'vip', name: 'VIP Signals', icon: TrendingUp, color: 'text-pink-400' },
                  ].map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedTypes.includes(type.id);
                    return (
                      <button
                        key={type.id}
                        onClick={() => toggleSignalType(type.id)}
                        className={`bg-black/50 backdrop-blur-xl border-2 rounded-2xl p-6 transition-all duration-300 ${
                          isSelected 
                            ? 'border-accent bg-accent/10' 
                            : 'border-gray-800 hover:border-gray-600'
                        }`}
                      >
                        <Icon className={`w-12 h-12 ${type.color} mx-auto mb-4`} />
                        <h3 className="text-lg font-bold text-white mb-2">{type.name}</h3>
                        {isSelected && (
                          <div className="flex items-center justify-center gap-2 text-accent text-sm">
                            <Check className="w-4 h-4" />
                            Selected
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                  >
                    Back
                  </button>
                  <GradientButton 
                    onClick={() => setCurrentStep(3)}
                    disabled={selectedTypes.length === 0}
                  >
                    Next: Select Broker
                  </GradientButton>
                </div>
              </div>
            )}

            {/* Step 3: Select Broker */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <BrokerSelector
                  brokers={mockBrokers}
                  selectedBrokers={selectedBrokers}
                  onToggleBroker={toggleBroker}
                  title="Select Your Broker"
                  description="Please register with at least one supported broker to receive signals"
                  multiSelect={true}
                />
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                  >
                    Back
                  </button>
                  <GradientButton 
                    onClick={() => setCurrentStep(4)}
                    disabled={selectedBrokers.length === 0}
                  >
                    Continue
                  </GradientButton>
                </div>
              </div>
            )}

            {/* Step 4: Connect Telegram */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Connect to Telegram</h2>
                <p className="text-gray-400 mb-6">Choose how you want to receive signals</p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { id: 'channel', name: 'Telegram Channel', icon: MessageSquare },
                    { id: 'group', name: 'Telegram Group', icon: Users },
                    { id: 'bot', name: 'AFFYNEX Bot', icon: Bot },
                  ].map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedTelegram === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedTelegram(option.id)}
                        className={`bg-black/50 backdrop-blur-xl border-2 rounded-2xl p-8 transition-all duration-300 ${
                          isSelected 
                            ? 'border-accent bg-accent/10' 
                            : 'border-gray-800 hover:border-gray-600'
                        }`}
                      >
                        <Icon className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">{option.name}</h3>
                        {isSelected && (
                          <div className="flex items-center justify-center gap-2 text-accent text-sm">
                            <Check className="w-4 h-4" />
                            Selected
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                  >
                    Back
                  </button>
                  <GradientButton 
                    onClick={() => setCurrentStep(5)}
                    disabled={!selectedTelegram}
                  >
                    Continue
                  </GradientButton>
                </div>
              </div>
            )}

            {/* Step 5: Subscription */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Choose Your Plan</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: 'Basic', price: '$29', features: ['10 signals/day', 'Email support', '1 market'] },
                    { name: 'Pro', price: '$79', features: ['Unlimited signals', 'Priority support', 'All markets', 'VIP signals'], recommended: true },
                    { name: 'Enterprise', price: '$199', features: ['Everything in Pro', '1-on-1 calls', 'API access', 'White label'] },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`bg-black/50 backdrop-blur-xl border-2 rounded-2xl p-8 ${
                        plan.recommended ? 'border-accent' : 'border-gray-800'
                      }`}
                    >
                      {plan.recommended && (
                        <div className="text-center mb-4">
                          <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                            RECOMMENDED
                          </span>
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-white mb-2 text-center">{plan.name}</h3>
                      <div className="text-center mb-6">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300">
                            <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <GradientButton className="w-full">
                        Get Started
                      </GradientButton>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </GradientBackground>
  );
}
