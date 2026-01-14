import { motion } from 'framer-motion';
import { useOptimisticState } from '@/hooks/useOptimisticState';
import { Header } from '@/components/state-sync/Header';
import { ExplanationCards } from '@/components/state-sync/ExplanationCards';
import { TaskInput } from '@/components/state-sync/TaskInput';
import { TaskList } from '@/components/state-sync/TaskList';
import { OperationLogs } from '@/components/state-sync/OperationLogs';
import { ErrorProbabilitySlider } from '@/components/state-sync/ErrorProbabilitySlider';
import { StateVisualizer } from '@/components/state-sync/StateVisualizer';

const Index = () => {
  const {
    tasks,
    pendingOperations,
    logs,
    syncStatus,
    errorProbability,
    setErrorProbability,
    addTask,
    toggleTask,
    deleteTask,
    clearLogs,
  } = useOptimisticState();

  return (
    <div className="min-h-screen bg-background">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <Header syncStatus={syncStatus} />
        
        <ExplanationCards />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Colonna sinistra: Task Manager */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl glass border border-border/50">
              <h2 className="text-xl font-semibold mb-4">📝 Task Manager Demo</h2>
              <TaskInput onAddTask={addTask} syncStatus={syncStatus} />
              <TaskList 
                tasks={tasks}
                pendingOperations={pendingOperations}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </div>

            <ErrorProbabilitySlider 
              value={errorProbability}
              onChange={setErrorProbability}
            />

            <StateVisualizer 
              tasks={tasks}
              pendingOperations={pendingOperations}
            />
          </motion.div>

          {/* Colonna destra: Operation Logs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl glass border border-border/50 h-fit lg:sticky lg:top-8"
          >
            <OperationLogs logs={logs} onClear={clearLogs} />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p>
            💡 <strong>State Sync Engine</strong> - Un'app educativa per capire 
            la gestione dello stato nelle applicazioni moderne
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;