import { motion, AnimatePresence } from 'framer-motion';
import { Task, PendingOperation } from '@/types/state';
import { TaskItem } from './TaskItem';
import { ListTodo, Inbox } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  pendingOperations: PendingOperation[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, pendingOperations, onToggle, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">
          Nessuna task. Aggiungi la prima!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <ListTodo className="w-4 h-4" />
        <span>{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
        {pendingOperations.length > 0 && (
          <span className="text-warning">
            • {pendingOperations.length} in sincronizzazione
          </span>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            pendingOperations={pendingOperations}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};