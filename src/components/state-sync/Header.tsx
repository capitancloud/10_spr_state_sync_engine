import { motion } from 'framer-motion';
import { Zap, RefreshCw } from 'lucide-react';
import { SyncStatus } from '@/types/state';
import { cn } from '@/lib/utils';

interface HeaderProps {
  syncStatus: SyncStatus;
}

export const Header = ({ syncStatus }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      {/* Logo animato */}
      <motion.div 
        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary shadow-glow mb-6"
        animate={{ 
          rotate: syncStatus === 'syncing' ? 360 : 0,
        }}
        transition={{ 
          duration: syncStatus === 'syncing' ? 2 : 0,
          repeat: syncStatus === 'syncing' ? Infinity : 0,
          ease: 'linear'
        }}
      >
        {syncStatus === 'syncing' ? (
          <RefreshCw className="w-10 h-10 text-primary-foreground" />
        ) : (
          <Zap className="w-10 h-10 text-primary-foreground" />
        )}
      </motion.div>

      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-gradient">State Sync Engine</span>
      </motion.h1>

      <motion.p 
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Esplora come funziona la gestione dello stato in un'app moderna.
        Scopri gli <strong className="text-foreground">aggiornamenti ottimistici</strong>, 
        la <strong className="text-foreground">sincronizzazione</strong> e 
        il <strong className="text-foreground">rollback degli errori</strong>.
      </motion.p>

      {/* Indicatore di stato */}
      <motion.div 
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className={cn(
            "w-3 h-3 rounded-full",
            syncStatus === 'idle' && "bg-muted-foreground",
            syncStatus === 'syncing' && "bg-warning animate-pulse-soft",
            syncStatus === 'success' && "bg-success",
            syncStatus === 'error' && "bg-destructive",
          )}
          layoutId="status-indicator"
        />
        <span className="text-sm font-medium">
          {syncStatus === 'idle' && 'Pronto'}
          {syncStatus === 'syncing' && 'Sincronizzazione in corso...'}
          {syncStatus === 'success' && 'Sincronizzato!'}
          {syncStatus === 'error' && 'Errore - Rollback eseguito'}
        </span>
      </motion.div>
    </motion.header>
  );
};