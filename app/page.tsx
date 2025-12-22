"use client";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { ElectroBorder } from "@/components/ui/electro-border";
import { GradientButton } from "@/components/ui/gradient-button";
import { TrustedTradersCarousel } from "@/components/ui/trusted-traders-carousel";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  TrendingUp,
  Zap,
  Brain,
  BarChart3,
  Activity,
  Target,
  Send,
  CheckCircle,
  Users,
  Signal,
  Mail,
} from "lucide-react";

export default function Home() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(13, 17, 23)"
      gradientBackgroundEnd="rgb(0, 8, 20)"
      firstColor="45, 104, 255"
      secondColor="0, 209, 143"
      thirdColor="100, 149, 237"
      fourthColor="30, 64, 175"
      fifthColor="6, 182, 212"
    >
      <Header />
      <div className="w-full pt-16 md:pt-20">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-left"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
                >
                  <span className="text-primary font-semibold text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    AI-Powered Trading Signals
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  AI Market
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-400">
                    Prediction Bot
                  </span>
                  <br />
                  for Telegram
                </h1>

                <p className="text-xl text-gray-300 mb-8 max-w-xl">
                  Realtime trading signals powered by AI — crypto, forex, stocks
                  & more. Get probability-based entries with confidence scores.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <GradientButton
                    onClick={() => window.location.href = '/get-signals'}
                  >
                    Get Signals
                  </GradientButton>
                  <GradientButton
                    variant="variant"
                    onClick={() => window.location.href = '/provide-signals'}
                  >
                    Provide Signals
                  </GradientButton>
                </div>
              </motion.div>

              {/* Right Content - Signal Preview Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Signal className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Live Signal</h3>
                        <p className="text-gray-400 text-sm">Just now</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full">
                      <span className="text-accent font-bold text-sm">ACTIVE</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Symbol</span>
                      <span className="text-white font-bold text-xl">BTC/USD</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Action</span>
                      <span className="px-4 py-2 bg-accent/20 border border-accent rounded-lg text-accent font-bold">
                        BUY
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Entry Price</span>
                      <span className="text-white font-bold">$42,350</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Target</span>
                      <span className="text-white font-bold">$43,800</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Stop Loss</span>
                      <span className="text-red-400 font-bold">$41,900</span>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Confidence Score</span>
                        <span className="text-accent font-bold text-2xl">98%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "98%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Advanced AI technology delivering precise trading signals across multiple markets
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Realtime AI Signals
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  5m, 15m, and hourly signals with confidence scores. Get instant notifications for high-probability trades.
                </p>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Multi-Asset Coverage
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Crypto | Stocks | Forex | Commodities. Trade across all major markets with unified AI intelligence.
                </p>
              </motion.div>

              {/* Feature Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/20"
              >
                <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Smart Confidence Engine
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Probability-based entries powered by machine learning. Only trade when conditions are optimal.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-400">
                Get started in 4 simple steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary/50">
                    <Send className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Add Bot</h3>
                <p className="text-gray-400">
                  Click "Add to Telegram" and start the bot
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-accent/50">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Verify</h3>
                <p className="text-gray-400">
                  Complete quick verification process
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/50">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Join Group</h3>
                <p className="text-gray-400">
                  Access private signals channel
                </p>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/50">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Receive Signals</h3>
                <p className="text-gray-400">
                  Get real-time AI trading signals
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Technology Section */}
        <section id="technology" className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Powered by
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Advanced ML
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Our AI engine combines cutting-edge machine learning models including LSTM (Long Short-Term Memory) and LightGBM to analyze market patterns and predict price movements with exceptional accuracy.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Deep Learning Neural Networks</h4>
                      <p className="text-gray-400">
                        LSTM models trained on years of historical market data
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Gradient Boosting Algorithms</h4>
                      <p className="text-gray-400">
                        LightGBM for lightning-fast prediction processing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Multi-Indicator Analysis</h4>
                      <p className="text-gray-400">
                        Real-time monitoring of 50+ technical indicators
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Technical Indicators */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-3 gap-6"
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300"
                >
                  <Activity className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1">RSI</h4>
                  <p className="text-gray-400 text-sm">Relative Strength</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300"
                >
                  <BarChart3 className="w-12 h-12 text-accent mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1">MACD</h4>
                  <p className="text-gray-400 text-sm">Trend Following</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center hover:border-blue-400/50 transition-all duration-300"
                >
                  <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1">EMA</h4>
                  <p className="text-gray-400 text-sm">Moving Average</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center hover:border-purple-400/50 transition-all duration-300"
                >
                  <Target className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1">Bollinger</h4>
                  <p className="text-gray-400 text-sm">Volatility Bands</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center hover:border-pink-400/50 transition-all duration-300"
                >
                  <Signal className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1">Stochastic</h4>
                  <p className="text-gray-400 text-sm">Momentum</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-900/90 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center hover:border-orange-400/50 transition-all duration-300"
                >
                  <Brain className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                  <h4 className="text-white font-bold mb-1">ADX</h4>
                  <p className="text-gray-400 text-sm">Trend Strength</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted Traders Testimonials */}
        <TrustedTradersCarousel />

        {/* Pricing Section */}
        <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Choose the plan that fits your trading needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <PricingCard
                title="Free"
                price="$0"
                period="forever"
                features={[
                  "5 signals per day",
                  "Basic indicators",
                  "Email support",
                  "Community access",
                ]}
                borderColor="#6B7280"
              />

              {/* Premium Plan */}
              <PricingCard
                title="Premium"
                price="$49"
                period="per month"
                features={[
                  "Unlimited signals",
                  "Advanced AI analysis",
                  "Priority support",
                  "Exclusive channel access",
                  "Custom alerts",
                  "Risk management tools",
                ]}
                borderColor="#00D18F"
                recommended
              />

              {/* Pro Plan */}
              <PricingCard
                title="Pro"
                price="$99"
                period="per month"
                features={[
                  "Everything in Premium",
                  "1-on-1 strategy calls",
                  "Portfolio management",
                  "API access",
                  "White-label options",
                ]}
                borderColor="#2D68FF"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Market Bot</h3>
                <p className="text-gray-400">
                  Advanced AI trading signals for Telegram
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-white font-bold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      Risk Disclaimer
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-bold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-400">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:support@aimarketbot.com" className="hover:text-primary transition-colors">
                      support@aimarketbot.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <Send className="w-4 h-4" />
                    <a href="#" className="hover:text-primary transition-colors">
                      @AIMarketBot
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-800/50 text-center">
              <p className="text-gray-500">
                © 2025 AI Market Bot. All rights reserved. Trading involves risk. Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BackgroundGradientAnimation>
  );
}

// Pricing Card Component with ElectroBorder
interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  borderColor: string;
  recommended?: boolean;
}

function PricingCard({ title, price, period, features, borderColor, recommended }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold">
            RECOMMENDED
          </span>
        </div>
      )}

      <ElectroBorder
        borderColor={borderColor}
        borderWidth={2}
        radius="24px"
        effects={isHovered}
        glow={true}
        aura={true}
        glowBlur={30}
        distortion={1.2}
        animationSpeed={1}
      >
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90 backdrop-blur-xl rounded-3xl p-8 h-full transition-all duration-300">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-white">{price}</span>
              <span className="text-gray-400">/{period}</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            className={`w-full ${
              recommended
                ? "bg-accent hover:bg-accent/90 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </ElectroBorder>
    </motion.div>
  );
}
