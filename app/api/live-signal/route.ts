import { NextResponse } from 'next/server';

interface Signal {
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

// Signal configurations with entry/target/stop loss
const SIGNAL_CONFIGS = {
  'BTC/USD': {
    symbol: 'BTC/USD',
    action: 'BUY' as const,
    entry: 42350,
    target: 43800,
    stopLoss: 41900,
    confidence: 0.98,
  },
  'ETH/USD': {
    symbol: 'ETH/USD',
    action: 'SELL' as const,
    entry: 2280,
    target: 2150,
    stopLoss: 2350,
    confidence: 0.85,
  },
  'EUR/USD': {
    symbol: 'EUR/USD',
    action: 'BUY' as const,
    entry: 1.0520,
    target: 1.0580,
    stopLoss: 1.0490,
    confidence: 0.92,
  },
  'NVDA': {
    symbol: 'NVDA',
    action: 'BUY' as const,
    entry: 139.50,
    target: 155.00,
    stopLoss: 130.00,
    confidence: 0.88,
  },
  'AAPL': {
    symbol: 'AAPL',
    action: 'SELL' as const,
    entry: 245.20,
    target: 225.00,
    stopLoss: 260.00,
    confidence: 0.91,
  },
};

// Fallback prices if API fails
const FALLBACK_PRICES: { [key: string]: number } = {
  'BTC/USD': 94200,
  'ETH/USD': 3450,
  'EUR/USD': 1.0542,
  'NVDA': 145.32,
  'AAPL': 238.75,
};

// Fetch live price from Finnhub API
async function fetchLivePrice(symbol: string): Promise<number> {
  try {
    // Crypto and Forex are not supported by Finnhub free tier
    if (symbol === 'BTC/USD' || symbol === 'ETH/USD' || symbol === 'EUR/USD') {
      console.log(`${symbol} uses fallback price: ${FALLBACK_PRICES[symbol]}`);
      return FALLBACK_PRICES[symbol];
    }

    // Get API key from environment
    const apiKey = process.env.FINNHUB_API_KEY;
    
    if (!apiKey) {
      console.warn('❌ Finnhub API key not found in environment variables');
      return FALLBACK_PRICES[symbol] || 0;
    }

    console.log(`📡 Fetching live price for ${symbol} from Finnhub...`);
    
    // For stocks (NVDA, AAPL) - fetch from Finnhub
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    console.log(`   URL: ${url.slice(0, 50)}...`);
    
    const response = await fetch(url, { 
      cache: 'no-store'
    });

    console.log(`   Status: ${response.status}`);

    if (!response.ok) {
      console.error(`❌ Finnhub API error for ${symbol}: ${response.status}`);
      return FALLBACK_PRICES[symbol] || 0;
    }

    const data = await response.json();
    console.log(`   Data received:`, JSON.stringify(data).slice(0, 100));
    
    // Finnhub returns current price in 'c' field (current price)
    // Other fields: d (change), dp (percent change), h (high), l (low), o (open), pc (previous close)
    const price = data.c;
    
    if (!price) {
      console.warn(`⚠️  No price data in response for ${symbol}, using fallback`);
      return FALLBACK_PRICES[symbol] || 0;
    }

    console.log(`✅ Got live price for ${symbol}: $${price}`);
    return price;
  } catch (error) {
    console.error(`❌ Error fetching price for ${symbol}:`, error);
    return FALLBACK_PRICES[symbol] || 0;
  }
}

// Get current signal by index
async function getCurrentSignal(index: number): Promise<Signal> {
  const symbols = Object.keys(SIGNAL_CONFIGS) as Array<keyof typeof SIGNAL_CONFIGS>;
  const currentSymbol = symbols[index % symbols.length];
  const config = SIGNAL_CONFIGS[currentSymbol];
  
  // Fetch live price
  const livePrice = await fetchLivePrice(currentSymbol);

  return {
    ...config,
    price: livePrice,
    status: 'ACTIVE',
    timestamp: 'Just now',
  };
}

// Return the current signal with live prices
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const index = parseInt(searchParams.get('index') || '0');

    console.log(`\n🔄 GET /api/live-signal - Index: ${index}`);
    
    // Check if API key is configured
    const apiKey = process.env.FINNHUB_API_KEY;
    if (!apiKey) {
      console.warn(`⚠️  FINNHUB_API_KEY not set in environment!`);
      console.warn(`   Please add to .env.local: FINNHUB_API_KEY=your_key_here`);
    } else {
      console.log(`✅ API Key configured: ${apiKey.slice(0, 10)}...`);
    }

    const signal = await getCurrentSignal(index);
    
    console.log(`✅ Signal retrieved:`, {
      symbol: signal.symbol,
      price: signal.price,
      action: signal.action,
      live: signal.price !== FALLBACK_PRICES[signal.symbol],
    });

    return NextResponse.json(signal, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('❌ Error in live-signal API:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch live signal',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
      }
    );
  }
}
