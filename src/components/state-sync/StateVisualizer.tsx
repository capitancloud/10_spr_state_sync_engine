import { motion } from 'framer-motion';
import { Task, PendingOperation } from '@/types/state';
import { Database, Cloud, Monitor } from 'lucide-react';

interface StateVisualizerProps {
  tasks: Task[];
  pendingOperations: PendingOperation[];
}

export const StateVisualizer = ({ tasks, pendingOperations }: StateVisualizerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-4 rounded-xl glass"
    >
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Database className="w-5 h-5 text-primary" />
        Visualizzazione Stato
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Frontend State */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Monitor className="w-4 h-4" />
            Frontend (UI)
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 font-mono text-xs overflow-auto max-h-40">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(
                tasks.map(t => ({ 
                  id: t.id.slice(0, 4), 
                  text: t.text.slice(0, 15) + (t.text.length > 15 ? '...' : ''),
                  done: t.completed 
                })), 
                null, 
                2
              )}
            </pre>
          </div>
        </div>

        {/* Pending Operations */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Cloud className="w-4 h-4" />
            In Attesa (Sync)
          </div>
          <div className="p-3 rounded-lg bg-warning/5 border border-warning/20 font-mono text-xs overflow-auto max-h-40">
            {pendingOperations.length === 0 ? (
              <span className="text-muted-foreground">Nessuna operazione in attesa</span>
            ) : (
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(
                  pendingOperations.map(op => ({ 
                    type: op.type,
                    taskId: op.taskId.slice(0, 4)
                  })), 
                  null, 
                  2
                )}
              </pre>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        💡 Il frontend mostra lo stato ottimistico. Le operazioni in attesa verranno 
        confermate o annullate dal backend.
      </p>
    </motion.div>
  );
};