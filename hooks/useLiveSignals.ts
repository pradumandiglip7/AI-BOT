'use client';

import { useState, useEffect, useRef } from 'react';

export interface Signal {
  symbol: string;
  action: 'BUY' | 'SELL';
  entry: number;
  target: number;
  stopLoss: number;
  confidence: number;
  status: 'ACTIVE' | 'INACTIVE';
  timestamp: string;
  price: number;
}

// Mock signals for structure reference only
const MOCK_SIGNALS: Signal[] = [
  {
    symbol: 'BTC/USD',
    action: 'BUY',
    entry: 42350,
    target: 43800,
    stopLoss: 41900,
    confidence: 0.98,
    status: 'ACTIVE',
    timestamp: 'Just now',
    price: 94200,
  },
  {
    symbol: 'ETH/USD',
    action: 'SELL',
    entry: 2280,
    target: 2150,
    stopLoss: 2350,
    confidence: 0.85,
    status: 'ACTIVE',
    timestamp: 'Just now',
    price: 3450,
  },
  {
    symbol: 'EUR/USD',
    action: 'BUY',
    entry: 1.0520,
    target: 1.0580,
    stopLoss: 1.0490,
    confidence: 0.92,
    status: 'ACTIVE',
    timestamp: 'Just now',
    price: 1.0542,
  },
  {
    symbol: 'NVDA',
    action: 'BUY',
    entry: 139.50,
    target: 155.00,
    stopLoss: 130.00,
    confidence: 0.88,
    status: 'ACTIVE',
    timestamp: 'Just now',
    price: 145.32,
  },
  {
    symbol: 'AAPL',
    action: 'SELL',
    entry: 245.20,
    target: 225.00,
    stopLoss: 260.00,
    confidence: 0.91,
    status: 'ACTIVE',
    timestamp: 'Just now',
    price: 238.75,
  },
];

export const useLiveSignals = () => {
  const [currentSignal, setCurrentSignal] = useState<Signal>(MOCK_SIGNALS[0]);
  const [isConnected, setIsConnected] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const rotationInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const fetchInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);

  // Fetch live signal from API
  const fetchSignal = async (index: number) => {
    try {
      console.log(`🔄 Fetching signal at index ${index}`);
      
      const response = await fetch(`/api/live-signal?index=${index}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: Signal = await response.json();
      console.log(`✅ Got signal: ${data.symbol} | Price: $${data.price}`);
      
      setCurrentSignal(data);
      setIsConnected(true);
    } catch (error) {
      console.error(`❌ Error fetching signal:`, error);
      // Fallback to mock on error
      const fallbackSignal = MOCK_SIGNALS[index % MOCK_SIGNALS.length];
      console.log(`⚠️  Using fallback: ${fallbackSignal.symbol}`);
      setCurrentSignal(fallbackSignal);
      setIsConnected(false);
    }
  };

  // Initial mount - avoid hydration mismatch
  useEffect(() => {
    console.log('🚀 useLiveSignals hook mounted');
    setIsMounted(true);
    
    // Fetch immediately after mount
    fetchSignal(0);
    currentIndexRef.current = 0;

    return () => {
      console.log('🛑 useLiveSignals hook unmounted');
      if (rotationInterval.current) clearInterval(rotationInterval.current);
      if (fetchInterval.current) clearInterval(fetchInterval.current);
    };
  }, []);

  // Rotation interval
  useEffect(() => {
    if (!isMounted) return;

    rotationInterval.current = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % MOCK_SIGNALS.length;
      console.log(`⏱️  Rotating to index ${currentIndexRef.current}`);
      fetchSignal(currentIndexRef.current);
    }, 15000);

    return () => {
      if (rotationInterval.current) clearInterval(rotationInterval.current);
    };
  }, [isMounted]);

  // Refresh interval
  useEffect(() => {
    if (!isMounted) return;

    fetchInterval.current = setInterval(() => {
      console.log(`🔄 Refreshing price...`);
      fetchSignal(currentIndexRef.current);
    }, 5000);

    return () => {
      if (fetchInterval.current) clearInterval(fetchInterval.current);
    };
  }, [isMounted]);

  return {
    currentSignal,
    isConnected,
    signals: MOCK_SIGNALS,
  };
};
