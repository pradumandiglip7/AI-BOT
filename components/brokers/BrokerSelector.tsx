import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { BrokerCard } from "./BrokerCard";
import { Broker, UserBrokerSelection } from "@/lib/brokers";

interface BrokerSelectorProps {
  brokers: Broker[];
  selectedBrokers: string[];
  onToggleBroker: (brokerId: string) => void;
  title?: string;
  description?: string;
  multiSelect?: boolean;
}

export const BrokerSelector: React.FC<BrokerSelectorProps> = ({
  brokers,
  selectedBrokers,
  onToggleBroker,
  title = "Select Your Broker",
  description = "Please register with at least one supported broker to receive signals",
  multiSelect = true,
}) => {
  const handleBrokerSelect = (brokerId: string) => {
    if (!multiSelect && selectedBrokers.length > 0 && !selectedBrokers.includes(brokerId)) {
      // For single select, replace the selection
      onToggleBroker(selectedBrokers[0]); // Deselect current
    }
    onToggleBroker(brokerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300">
          <strong className="text-cyan-400">Important:</strong> You must register and verify your account with at least one broker.
          Click the "Register" button to open the registration page in a new tab.
          {multiSelect && " You can select multiple brokers."}
        </div>
      </motion.div>

      {/* Broker Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brokers.map((broker, index) => (
          <motion.div
            key={broker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BrokerCard
              broker={broker}
              isSelected={selectedBrokers.includes(broker.id)}
              onSelect={handleBrokerSelect}
            />
          </motion.div>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedBrokers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-xl border border-accent/30 rounded-xl p-4"
        >
          <p className="text-gray-300 text-center">
            <span className="font-semibold text-accent">{selectedBrokers.length}</span> broker{selectedBrokers.length > 1 ? 's' : ''} selected
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Helper component for converting selections to backend format
export const prepareUserBrokerSelections = (
  selectedBrokerIds: string[]
): UserBrokerSelection[] => {
  // TODO: In production, check actual registration status via API
  // For now, assume all selected brokers are registered
  return selectedBrokerIds.map(brokerId => ({
    brokerId,
    registered: true, // Backend will verify this
  }));
};
