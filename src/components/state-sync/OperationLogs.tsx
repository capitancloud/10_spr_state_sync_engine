import { motion, AnimatePresence } from 'framer-motion';
import { OperationLog } from '@/types/state';
import { 
  Zap, 
  Server, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Trash2,
  ScrollText,
  Activity
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
      bg: 'bg-gradient-to-r from-primary/10 to-purple-500/10',
      border: 'border-primary/30',
      icon: 'text-primary',
      label: 'Optimistic Update',
      labelBg: 'bg-primary/20',
    },
    backend: {
      bg: 'bg-muted/50',
      border: 'border-border',
      icon: 'text-muted-foreground',
      label: 'Backend Sync',
      labelBg: 'bg-muted',
    },
    rollback: {
      bg: 'bg-gradient-to-r from-warning/10 to-orange-500/10',
      border: 'border-warning/30',
      icon: 'text-warning',
      label: 'Rollback',
      labelBg: 'bg-warning/20',
    },
    success: {
      bg: 'bg-gradient-to-r from-success/10 to-emerald-500/10',
      border: 'border-success/30',
      icon: 'text-success',
      label: 'Success',
      labelBg: 'bg-success/20',
    },
    error: {
      bg: 'bg-gradient-to-r from-destructive/10 to-red-500/10',
      border: 'border-destructive/30',
      icon: 'text-destructive',
      label: 'Error',
      labelBg: 'bg-destructive/20',
    },
  };
  return styles[type];
};

export const OperationLogs = ({ logs, onClear }: OperationLogsProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Log delle Operazioni</h3>
            <p className="text-xs text-muted-foreground">Tempo reale</p>
          </div>
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

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Osserva ogni operazione in tempo reale: optimistic updates,
        sincronizzazioni con il backend, e rollback in caso di errore.
      </p>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 max-h-[500px]">
        <AnimatePresence mode="popLayout">
          {logs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ScrollText className="w-8 h-8 text-muted-foreground" />
              </motion.div>
              <p className="text-sm text-muted-foreground font-medium">
                I log appariranno qui
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Esegui un'operazione per vedere il flusso
              </p>
            </motion.div>
          ) : (
            logs.map((log, index) => {
              const styles = getLogStyles(log.type);
              return (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ 
                    type: 'spring' as const, 
                    stiffness: 400, 
                    damping: 25,
                    delay: index * 0.02 
                  }}
                  className={cn(
                    "p-4 rounded-xl border backdrop-blur-sm",
                    styles.bg,
                    styles.border
                  )}
                >
                  <div className="flex items-start gap-3">
                    <motion.div 
                      className={cn("mt-0.5", styles.icon)}
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring' as const, stiffness: 300 }}
                    >
                      <LogIcon type={log.type} />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-full",
                          styles.labelBg,
                          styles.icon
                        )}>
                          {styles.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium leading-snug">{log.message}</p>
                      {log.details && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-muted-foreground mt-2 p-2 rounded-lg bg-background/50"
                        >
                          💡 {log.details}
                        </motion.p>
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