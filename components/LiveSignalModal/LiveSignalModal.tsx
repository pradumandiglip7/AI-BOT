'use client';

import React from 'react';
import { useLiveSignals } from '@/hooks/useLiveSignals';
import { SignalData } from './SignalData';

export const LiveSignalModal: React.FC = () => {
  const { currentSignal, isConnected } = useLiveSignals();

  React.useEffect(() => {
    console.log('🖼️  LiveSignalModal rendered with:', {
      symbol: currentSignal.symbol,
      price: currentSignal.price,
      action: currentSignal.action,
      connected: isConnected,
    });
    console.log('💰 CURRENT PRICE DISPLAYED ON PAGE:', currentSignal.price);
    console.log('📊 This price is now visible in the UI!');
  }, [currentSignal]);

  const actionColor = SignalData.getActionColor(currentSignal.action);
  const actionBgColor = SignalData.getActionBgColor(currentSignal.action);
  const confidence = SignalData.formatConfidence(currentSignal.confidence);
  const confidenceColor = SignalData.getConfidenceColor();

  return (
    <div className="live-signal-container">
      <div className="live-signal-card">
        {/* Header with Status */}
        <div className="signal-header">
          <div className="signal-title">
            <span className="title-text">Live Signal</span>
            <span className={`status-pill ${currentSignal.status.toLowerCase()}`}>
              <span className="status-dot"></span>
              {currentSignal.status}
            </span>
          </div>
          <div className="signal-timestamp">
            <span className="timestamp-icon">📡</span>
            <span className="timestamp-text">{currentSignal.timestamp}</span>
          </div>
        </div>

        {/* Signal Details */}
        <div className="signal-details">
          {/* Symbol & Current Price */}
          <div className="detail-row">
            <span className="detail-label">Symbol</span>
            <span className="detail-value">{currentSignal.symbol}</span>
          </div>

          {/* LIVE CURRENT PRICE - Added for visibility */}
          <div className="detail-row live-price-row">
            <span className="detail-label">💰 Current Price</span>
            <span className="detail-value price-highlight mono">
              {SignalData.formatPrice(currentSignal.price, currentSignal.symbol)}
            </span>
          </div>

          {/* Action */}
          <div className="detail-row">
            <span className="detail-label">Action</span>
            <div className="action-badge" style={{ backgroundColor: actionBgColor }}>
              <span className="action-text" style={{ color: actionColor }}>
                {currentSignal.action}
              </span>
            </div>
          </div>

          {/* Entry Price */}
          <div className="detail-row">
            <span className="detail-label">Entry</span>
            <span className="detail-value mono">
              {SignalData.formatPrice(currentSignal.entry, currentSignal.symbol)}
            </span>
          </div>

          {/* Target */}
          <div className="detail-row">
            <span className="detail-label">Target</span>
            <span className="detail-value mono">
              {SignalData.formatPrice(currentSignal.target, currentSignal.symbol)}
            </span>
          </div>

          {/* Stop Loss */}
          <div className="detail-row stop-loss">
            <span className="detail-label">Stop Loss</span>
            <span className="detail-value mono">
              {SignalData.formatPrice(currentSignal.stopLoss, currentSignal.symbol)}
            </span>
          </div>

          {/* Confidence Score */}
          <div className="detail-row confidence-row">
            <span className="detail-label">Confidence</span>
            <span className="confidence-value">{confidence}%</span>
          </div>
          <div className="confidence-bar-container">
            <div
              className="confidence-bar"
              style={{
                width: `${confidence}%`,
                backgroundColor: confidenceColor,
              }}
            />
          </div>
        </div>

        {/* Connection Indicator */}
        <div className="connection-indicator">
          <span className={`conn-dot ${isConnected ? 'active' : 'inactive'}`}></span>
          <span className="conn-text">
            {isConnected ? 'Real-time Connected' : 'Offline'}
          </span>
        </div>
      </div>

      <style jsx>{`
        .live-signal-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          width: 100%;
        }

        .live-signal-card {
          background: rgba(20, 20, 40, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .signal-header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .signal-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .title-text {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #10b981;
          letter-spacing: 0.5px;
        }

        .status-pill.inactive {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse 2s infinite;
        }

        .status-pill.inactive .status-dot {
          background: #ef4444;
          animation: none;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .signal-timestamp {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }

        .timestamp-icon {
          font-size: 12px;
        }

        .timestamp-text {
          font-family: 'Courier New', monospace;
        }

        .signal-details {
          margin-bottom: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          font-size: 14px;
        }

        .detail-label {
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .detail-value {
          color: #ffffff;
          font-weight: 600;
        }

        .detail-value.mono {
          font-family: 'Courier New', monospace;
          font-weight: 700;
        }

        .stop-loss .detail-value {
          color: #ef4444;
        }

        .live-price-row {
          background: rgba(16, 185, 129, 0.1);
          margin: 0 -12px;
          padding: 12px 12px !important;
          border-radius: 8px;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .price-highlight {
          color: #10b981 !important;
          font-size: 16px !important;
          animation: priceUpdate 0.5s ease;
        }

        @keyframes priceUpdate {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
            color: #34d399;
          }
          100% {
            transform: scale(1);
          }
        }

        .action-badge {
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 1px;
        }

        .action-text {
          text-transform: uppercase;
        }

        .confidence-row {
          margin-top: 16px;
          margin-bottom: 8px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .confidence-value {
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          font-family: 'Courier New', monospace;
        }

        .confidence-bar-container {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .confidence-bar {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
          box-shadow: 0 0 8px rgba(20, 184, 166, 0.4);
        }

        .connection-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        .conn-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          animation: none;
        }

        .conn-dot.active {
          background: #10b981;
          animation: pulse 2s infinite;
        }

        .conn-text {
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        @media (max-width: 640px) {
          .live-signal-card {
            max-width: 100%;
            padding: 16px;
          }

          .detail-row {
            font-size: 13px;
            padding: 8px 0;
          }

          .title-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};
