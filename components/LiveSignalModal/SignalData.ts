import { Signal } from '@/hooks/useLiveSignals';

export const SignalData = {
  // Format price with proper decimals
  formatPrice: (price: number, symbol: string): string => {
    if (symbol.includes('BTC') || symbol.includes('ETH')) {
      return `$${price.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    }
    if (symbol.includes('EUR') || symbol.includes('GBP') || symbol.includes('JPY')) {
      return `$${price.toLocaleString('en-US', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      })}`;
    }
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },

  // Calculate risk/reward ratio
  calculateRiskReward: (signal: Signal): string => {
    const risk = Math.abs(signal.entry - signal.stopLoss);
    const reward = Math.abs(signal.target - signal.entry);
    const ratio = reward / risk;
    return ratio.toFixed(2);
  },

  // Get color based on action
  getActionColor: (action: 'BUY' | 'SELL'): string => {
    return action === 'BUY' ? '#10b981' : '#ef4444';
  },

  // Get action background color
  getActionBgColor: (action: 'BUY' | 'SELL'): string => {
    return action === 'BUY' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
  },

  // Format confidence as percentage
  formatConfidence: (confidence: number): number => {
    return Math.round(confidence * 100);
  },

  // Get confidence color (teal gradient for progress bar)
  getConfidenceColor: (): string => {
    return '#14b8a6'; // Teal color
  },
};
