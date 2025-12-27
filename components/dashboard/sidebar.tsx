import { motion, AnimatePresence } from "framer-motion";
import { Activity, LogOut, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSidebarContext } from "./sidebar-context";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: MenuItem[];
  userName: string;
  userRole: string;
  userAvatar: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  menuItems,
  userName,
  userRole,
  userAvatar,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isMobileOpen, setIsMobileOpen } = useSidebarContext();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobileOpen]);

  const handleMenuClick = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1, 
          width: isMobile ? (isMobileOpen ? 256 : 0) : (isCollapsed ? 80 : 256)
        }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed left-0 top-0 h-screen bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border z-50 ${
          isMobile && !isMobileOpen ? 'hidden overflow-hidden' : ''
        }`}
      >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-primary">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            {((!isMobile && !isCollapsed) || (isMobile && isMobileOpen)) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-xl font-bold gradient-text">Trador</h1>
                <p className="text-xs text-muted-foreground">Pro Dashboard</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 bg-secondary border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors lg:hidden"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        )}

        {/* Desktop Collapse Toggle */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-20 w-6 h-6 bg-secondary border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-3 h-3 text-foreground" />
            ) : (
              <ChevronLeft className="w-3 h-3 text-foreground" />
            )}
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-lg
                    transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/50 glow-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                    }
                  `}
                  whileHover={{ x: (isMobile || !isCollapsed) ? 4 : 0 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  {(!isMobile && !isCollapsed) || (isMobile && isMobileOpen) ? (
                    <span className="text-sm font-medium">{item.label}</span>
                  ) : null}
                  {isActive && ((!isMobile && !isCollapsed) || (isMobile && isMobileOpen)) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-sidebar-border">
          <div className={`flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50 ${((!isMobile && isCollapsed) || (isMobile && !isMobileOpen)) ? 'justify-center' : ''}`}>
            <img
              src={userAvatar}
              alt={userName}
              className="w-9 h-9 rounded-full border-2 border-primary/50 object-cover"
            />
            {((!isMobile && !isCollapsed) || (isMobile && isMobileOpen)) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">{userRole}</p>
              </div>
            )}
          </div>
          {((!isMobile && !isCollapsed) || (isMobile && isMobileOpen)) && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
    </>
  );
};
