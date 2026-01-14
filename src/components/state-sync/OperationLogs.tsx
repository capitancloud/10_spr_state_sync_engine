import { motion, AnimatePresence } from 'framer-motion';
import { OperationLog } from '@/types/state';
import { 
  Zap, 
  Server, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Trash2,
  ScrollText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface OperationLogsProps {
  logs: OperationLog[];
  onClear: () => void;
}

const LogIcon = ({ type }: { type: OperationLog['type'] }) => {
  const icons = {
    optimistic: <Zap className="w-4 h-4" />,
    backend: <Server className="w-4 h-4" />,
    rollback: <RotateCcw className="w-4 h-4" />,
    success: <CheckCircle2 className="w-4 h-4" />,
    error: <XCircle className="w-4 h-4" />,
  };
  return icons[type];
};

const getLogStyles = (type: OperationLog['type']) => {
  const styles = {
    optimistic: {
      bg: 'bg-primary/10',
      border: 'border-primary/30',
      icon: 'text-primary',
      label: 'Ottimistico',
    },
    backend: {
      bg: 'bg-muted',
      border: 'border-border',
      icon: 'text-muted-foreground',
      label: 'Backend',
    },
    rollback: {
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      icon: 'text-warning',
      label: 'Rollback',
    },
    success: {
      bg: 'bg-success/10',
      border: 'border-success/30',
      icon: 'text-success',
      label: 'Successo',
    },
    error: {
      bg: 'bg-destructive/10',
      border: 'border-destructive/30',
      icon: 'text-destructive',
      label: 'Errore',
    },
  };
  return styles[type];
};

export const OperationLogs = ({ logs, onClear }: OperationLogsProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Log delle Operazioni</h3>
        </div>
        {logs.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Pulisci
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Qui puoi vedere ogni operazione in tempo reale: aggiornamenti ottimistici,
        sincronizzazioni con il backend, e rollback in caso di errore.
      </p>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {logs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                <ScrollText className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                I log appariranno qui quando esegui operazioni
              </p>
            </motion.div>
          ) : (
            logs.map((log, index) => {
              const styles = getLogStyles(log.type);
              return (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 500, 
                    damping: 30,
                    delay: index * 0.02 
                  }}
                  className={cn(
                    "p-3 rounded-lg border",
                    styles.bg,
                    styles.border
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("mt-0.5", styles.icon)}>
                      <LogIcon type={log.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded",
                          styles.bg,
                          styles.icon
                        )}>
                          {styles.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{log.message}</p>
                      {log.details && (
                        <p className="text-xs text-muted-foreground mt-1">
                          💡 {log.details}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};