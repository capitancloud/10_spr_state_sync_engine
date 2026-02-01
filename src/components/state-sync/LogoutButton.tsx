import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={logout}
        className="gap-2 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-300"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Esci</span>
      </Button>
    </motion.div>
  );
};
