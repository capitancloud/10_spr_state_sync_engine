import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SyncStatus } from '@/types/state';

interface TaskInputProps {
  onAddTask: (text: string) => void;
  syncStatus: SyncStatus;
}

export const TaskInput = ({ onAddTask, syncStatus }: TaskInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim());
      setText('');
    }
  };

  const isLoading = syncStatus === 'syncing';

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="relative flex-1">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Aggiungi una nuova task..."
          className="h-12 pl-4 pr-4 text-base glass border-2 focus:border-primary transition-colors"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={!text.trim() || isLoading}
        className="h-12 px-6 gradient-primary hover:opacity-90 transition-opacity"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Plus className="w-5 h-5 mr-2" />
            Aggiungi
          </>
        )}
      </Button>
    </motion.form>
  );
};