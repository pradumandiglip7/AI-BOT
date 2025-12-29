// Broker Types and Configuration
// This file contains broker data structure and mock data
// Backend integration: Replace mockBrokers with API call

export interface Broker {
  id: string;
  name: string;
  logo: string;
  signupUrl: string;
  type: "binary" | "forex" | "crypto";
  badge?: "recommended" | "popular";
}

export interface UserBrokerSelection {
  brokerId: string;
  registered: boolean;
}

// Mock broker data
// TODO: Replace with API endpoint GET /api/brokers
export const mockBrokers: Broker[] = [
  {
    id: "quotex",
    name: "Quotex",
    logo: "https://img.icons8.com/fluency/96/000000/trading-signals.png", // Placeholder - replace with actual logo
    signupUrl: "https://broker-qx.pro/sign-up/?lid=423479",
    type: "binary",
    badge: "recommended"
  },
  {
    id: "olymptrade",
    name: "OlympTrade",
    logo: "https://img.icons8.com/fluency/96/000000/chart.png", // Placeholder - replace with actual logo
    signupUrl: "https://static.olymptrade.com/?af_siteid=LPL65-03-01en&affiliate_id=988054",
    type: "binary",
    badge: "popular"
  },
  // Additional brokers can be added here
  // Future: Fetch from backend API
];

// Helper function to get brokers by type
export const getBrokersByType = (type: Broker["type"]): Broker[] => {
  return mockBrokers.filter(broker => broker.type === type);
};

// Helper function to get broker by ID
export const getBrokerById = (id: string): Broker | undefined => {
  return mockBrokers.find(broker => broker.id === id);
};
