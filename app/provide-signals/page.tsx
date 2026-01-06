"use client";
import { GradientBackground } from "@/components/ui/gradient-background";
import { GradientButton } from "@/components/ui/gradient-button";
import { BrokerSelector } from "@/components/brokers/BrokerSelector";
import { mockBrokers } from "@/lib/brokers";
import { motion } from "framer-motion";
import { 
  DollarSign,
  Bitcoin,
  Target,
  TrendingUp,
  Layers,
  Send,
  CheckCircle2,
  BarChart,
  Zap,
  Settings
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProvideSignalsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [telegramLink, setTelegramLink] = useState("");
  const [formData, setFormData] = useState({
    welcomeMsg: "Welcome to our signals channel! 🚀",
    profitMsg: "TP Hit! Profit: {profit} pips 💰",
    stopLossMsg: "SL Hit on {pair}. Better luck next time!",
    closeTemplate: "Signal closed for {pair} at {price}"
  });

  const totalSteps = 5; // Updated from 4 to 5

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
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
              Become a Signal Provider
            </h1>
            <p className="text-gray-400 text-lg">
              Share your trading signals and grow your community
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
              <span>Platforms</span>
              <span>Brokers</span>
              <span>Connect</span>
              <span>Replies</span>
              <span>Done</span>
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
            {/* Step 1: Choose Platforms */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Select Trading Platforms</h2>
                <p className="text-gray-400 mb-6">Choose the markets you provide signals for</p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { id: 'forex', name: 'Forex', icon: DollarSign, color: 'text-green-400' },
                    { id: 'crypto', name: 'Crypto', icon: Bitcoin, color: 'text-orange-400' },
                    { id: 'binary', name: 'Binary Options', icon: Target, color: 'text-purple-400' },
                    { id: 'stocks', name: 'Stocks', icon: TrendingUp, color: 'text-blue-400' },
                    { id: 'futures', name: 'Futures', icon: Layers, color: 'text-pink-400' },
                  ].map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.id);
                    return (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        className={`bg-black/50 backdrop-blur-xl border-2 rounded-2xl p-6 transition-all duration-300 ${
                          isSelected 
                            ? 'border-accent bg-accent/10' 
                            : 'border-gray-800 hover:border-gray-600'
                        }`}
                      >
                        <Icon className={`w-12 h-12 ${platform.color} mx-auto mb-4`} />
                        <h3 className="text-lg font-bold text-white mb-2">{platform.name}</h3>
                        {isSelected && (
                          <div className="flex items-center justify-center gap-2 text-accent text-sm">
                            <CheckCircle2 className="w-4 h-4" />
                            Selected
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-center mt-8">
                  <GradientButton 
                    onClick={() => setCurrentStep(2)}
                    disabled={selectedPlatforms.length === 0}
                  >
                    Next: Select Brokers
                  </GradientButton>
                </div>
              </div>
            )}

            {/* Step 2: Select Brokers */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <BrokerSelector
                  brokers={mockBrokers}
                  selectedBrokers={selectedBrokers}
                  onToggleBroker={toggleBroker}
                  title="Select the Brokers You Provide Signals For"
                  description="Choose the brokers where you actively provide trading signals"
                  multiSelect={true}
                />
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                  >
                    Back
                  </button>
                  <GradientButton 
                    onClick={() => setCurrentStep(3)}
                    disabled={selectedBrokers.length === 0}
                  >
                    Continue
                  </GradientButton>
                </div>
              </div>
            )}

            {/* Step 3: Connect Telegram */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Connect Your Telegram</h2>
                <p className="text-gray-400 mb-6">Enter your Telegram Channel or Group link</p>
                <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
                  <div className="mb-6">
                    <label htmlFor="telegram" className="block text-sm font-medium text-gray-300 mb-2">
                      Telegram Channel/Group Link
                    </label>
                    <div className="relative">
                      <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="telegram"
                        type="text"
                        value={telegramLink}
                        onChange={(e) => setTelegramLink(e.target.value)}
                        placeholder="https://t.me/your_channel"
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Make sure your channel/group is public or you've added our bot as admin
                    </p>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <p className="text-sm text-gray-300">
                      💡 <strong>Tip:</strong> You can add multiple channels later from your dashboard
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                  >
                    Back
                  </button>
                  <GradientButton 
                    onClick={() => setCurrentStep(4)}
                    disabled={!telegramLink}
                  >
                    Continue
                  </GradientButton>
                </div>
              </div>
            )}

            {/* Step 4: Auto Replies */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Configure Auto Replies</h2>
                <p className="text-gray-400 mb-6">Customize automated messages for your signals</p>
                <div className="space-y-4">
                  {/* Welcome Message */}
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Welcome Message
                    </label>
                    <input
                      type="text"
                      value={formData.welcomeMsg}
                      onChange={(e) => setFormData({...formData, welcomeMsg: e.target.value})}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Profit Update */}
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Profit Update Message
                    </label>
                    <input
                      type="text"
                      value={formData.profitMsg}
                      onChange={(e) => setFormData({...formData, profitMsg: e.target.value})}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Use {"{profit}"} for dynamic profit value
                    </p>
                  </div>

                  {/* Stop Loss */}
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Stop Loss Message
                    </label>
                    <input
                      type="text"
                      value={formData.stopLossMsg}
                      onChange={(e) => setFormData({...formData, stopLossMsg: e.target.value})}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Use {"{pair}"} for trading pair
                    </p>
                  </div>

                  {/* Close Signal */}
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Close Signal Template
                    </label>
                    <input
                      type="text"
                      value={formData.closeTemplate}
                      onChange={(e) => setFormData({...formData, closeTemplate: e.target.value})}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Use {"{pair}"} and {"{price}"} for dynamic values
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                  >
                    Back
                  </button>
                  <GradientButton onClick={() => setCurrentStep(5)}>
                    Continue
                  </GradientButton>
                </div>
              </div>
            )}

            {/* Step 5: Dashboard/Success */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-12">
                  <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-16 h-16 text-accent" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">You're All Set!</h2>
                  <p className="text-xl text-gray-400">
                    Your signal provider account is ready to use
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 text-center">
                    <Send className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Send Signals</h3>
                    <p className="text-gray-400 text-sm">
                      Share trading signals with your community instantly
                    </p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 text-center">
                    <BarChart className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Track Performance</h3>
                    <p className="text-gray-400 text-sm">
                      Monitor your accuracy and subscriber engagement
                    </p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 text-center">
                    <Settings className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Automate</h3>
                    <p className="text-gray-400 text-sm">
                      Set up auto-replies and scheduled posts
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <GradientButton onClick={() => window.location.href = '/dashboard'}>
                    Go To Dashboard
                  </GradientButton>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </GradientBackground>
  );
}
