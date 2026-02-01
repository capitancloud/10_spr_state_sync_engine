import { motion } from 'framer-motion';
import { Zap, RefreshCw, Sparkles } from 'lucide-react';
import { SyncStatus } from '@/types/state';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { LogoutButton } from './LogoutButton';

interface HeaderProps {
  syncStatus: SyncStatus;
}

export const Header = ({ syncStatus }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 relative"
    >
      {/* Theme Toggle e Logout in angolo */}
      <motion.div 
        className="absolute top-0 right-0 flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <ThemeToggle />
        <LogoutButton />
      </motion.div>

      {/* Logo animato con effetti */}
      <motion.div className="relative inline-block mb-8">
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-primary/30 blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        <motion.div 
          className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-accent shadow-xl"
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
            <RefreshCw className="w-12 h-12 text-white" />
          ) : (
            <Zap className="w-12 h-12 text-white" />
          )}
        </motion.div>
        
        {/* Sparkle decorations */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-6 h-6 text-warning" />
        </motion.div>
      </motion.div>

      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
          State Sync Engine
        </span>
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Esplora come funziona la gestione dello stato in un'app moderna.
        <br />
        Scopri gli <strong className="text-foreground">optimistic updates</strong>, 
        la <strong className="text-foreground">sincronizzazione</strong> e 
        il <strong className="text-foreground">rollback</strong>.
      </motion.p>

      {/* Indicatore di stato con animazione migliorata */}
      <motion.div 
        className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className={cn(
            "w-3 h-3 rounded-full",
            syncStatus === 'idle' && "bg-muted-foreground",
            syncStatus === 'syncing' && "bg-warning",
            syncStatus === 'success' && "bg-success",
            syncStatus === 'error' && "bg-destructive",
          )}
          animate={syncStatus === 'syncing' ? { 
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1]
          } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
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