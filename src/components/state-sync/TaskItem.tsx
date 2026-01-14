import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Clock, Sparkles } from 'lucide-react';
import { Task, PendingOperation } from '@/types/state';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskItemProps {
  task: Task;
  pendingOperations: PendingOperation[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, pendingOperations, onToggle, onDelete }: TaskItemProps) => {
  const isPending = pendingOperations.some(op => op.taskId === task.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
        "bg-card/80 backdrop-blur-xl border border-border/50",
        "hover:shadow-lg hover:border-primary/30",
        isPending && "ring-2 ring-warning/50"
      )}
    >
      {/* Pending indicator con animazione migliorata */}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -10 }}
            className="absolute -top-2 -right-2 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-warning to-orange-400 text-white text-xs font-semibold rounded-full shadow-lg"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Clock className="w-3 h-3" />
            </motion.div>
            Syncing...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkbox con animazione */}
      <motion.div 
        className="flex-shrink-0"
        whileTap={{ scale: 0.9 }}
      >
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className={cn(
            "w-6 h-6 rounded-lg border-2 transition-all duration-300",
            task.completed 
              ? "bg-gradient-to-br from-success to-emerald-400 border-success shadow-md" 
              : "border-border hover:border-primary hover:shadow-md"
          )}
        />
      </motion.div>

      {/* Testo task con animazione */}
      <div className="flex-1 min-w-0">
        <motion.span
          animate={{ 
            opacity: task.completed ? 0.6 : 1,
          }}
          className={cn(
            "block text-base font-medium transition-all duration-300",
            task.completed && "line-through text-muted-foreground"
          )}
        >
          {task.text}
        </motion.span>
        <span className="text-xs text-muted-foreground font-mono">
          ID: {task.id}
        </span>
      </div>

      {/* Badge completato */}
      <AnimatePresence>
        {task.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-success/20 to-emerald-500/20 text-success rounded-full text-xs font-semibold border border-success/30"
          >
            <Sparkles className="w-3 h-3" />
            Fatto
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsante elimina */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
};