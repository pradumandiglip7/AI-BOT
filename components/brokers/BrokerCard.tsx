import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { Broker } from "@/lib/brokers";

interface BrokerCardProps {
  broker: Broker;
  isSelected: boolean;
  onSelect: (brokerId: string) => void;
}

export const BrokerCard: React.FC<BrokerCardProps> = ({ broker, isSelected, onSelect }) => {
  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection when clicking register
    // Open signup URL in new tab with affiliate tracking
    window.open(broker.signupUrl, '_blank', 'noopener,noreferrer');
  };

  const getBadgeStyles = (badge?: string) => {
    if (badge === "recommended") {
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    }
    if (badge === "popular") {
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }
    return "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      onClick={() => onSelect(broker.id)}
      className={`relative bg-black/50 backdrop-blur-xl rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-2 border-accent shadow-lg shadow-accent/20' 
          : 'border-2 border-gray-800 hover:border-gray-600 hover:shadow-lg hover:shadow-cyan-500/10'
      }`}
    >
      {/* Status Badge */}
      {broker.badge && (
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getBadgeStyles(broker.badge)}`}>
            {broker.badge.toUpperCase()}
          </span>
        </div>
      )}

      {/* Broker Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center border border-gray-700">
          <img 
            src={broker.logo} 
            alt={broker.name} 
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>

      {/* Broker Name */}
      <h3 className="text-xl font-bold text-white text-center mb-4">{broker.name}</h3>

      {/* Broker Type Tag */}
      <div className="flex justify-center mb-4">
        <span className="px-3 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full">
          {broker.type.charAt(0).toUpperCase() + broker.type.slice(1)}
        </span>
      </div>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
      >
        <span>Register</span>
        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-2 -left-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/50"
        >
          <CheckCircle2 className="w-5 h-5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};
