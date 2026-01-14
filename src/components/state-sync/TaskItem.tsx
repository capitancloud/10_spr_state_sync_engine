import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Clock } from 'lucide-react';
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
  // Controlla se questa task ha un'operazione in attesa
  const isPending = pendingOperations.some(op => op.taskId === task.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl glass transition-all",
        "hover:shadow-md",
        isPending && "ring-2 ring-warning/50 animate-pulse-soft"
      )}
    >
      {/* Indicatore operazione in attesa */}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-warning text-warning-foreground text-xs font-medium rounded-full"
          >
            <Clock className="w-3 h-3 animate-spin-slow" />
            In attesa
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkbox */}
      <div className="flex-shrink-0">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className={cn(
            "w-6 h-6 rounded-lg border-2 transition-all",
            task.completed 
              ? "bg-success border-success" 
              : "border-border hover:border-primary"
          )}
        />
      </div>

      {/* Testo task */}
      <div className="flex-1 min-w-0">
        <motion.span
          className={cn(
            "block text-base transition-all",
            task.completed && "line-through text-muted-foreground"
          )}
        >
          {task.text}
        </motion.span>
        <span className="text-xs text-muted-foreground">
          ID: {task.id}
        </span>
      </div>

      {/* Badge completato */}
      <AnimatePresence>
        {task.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="flex items-center gap-1 px-2 py-1 bg-success/20 text-success rounded-full text-xs font-medium"
          >
            <Check className="w-3 h-3" />
            Fatto
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsante elimina */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};