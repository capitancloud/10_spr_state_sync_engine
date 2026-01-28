import { motion } from 'framer-motion';
import { useOptimisticState } from '@/hooks/useOptimisticState';
import { Header } from '@/components/state-sync/Header';
import { BeginnerIntro } from '@/components/state-sync/BeginnerIntro';
import { ApproachComparison } from '@/components/state-sync/ApproachComparison';
import { Glossary } from '@/components/state-sync/Glossary';
import { ExplanationCards } from '@/components/state-sync/ExplanationCards';
import { FlowDiagram } from '@/components/state-sync/FlowDiagram';
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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background decorations migliorati */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]"
          animate={{ 
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <Header syncStatus={syncStatus} />
        
        <BeginnerIntro />
        
        <ApproachComparison />
        
        <Glossary />
        
        <ExplanationCards />

        <FlowDiagram />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Colonna sinistra: Task Manager */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="space-y-6"
          >
            <motion.div 
              className="p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-xl"
              whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📝</span>
                <h2 className="text-xl font-bold">Task Manager Demo</h2>
              </div>
              <TaskInput onAddTask={addTask} syncStatus={syncStatus} />
              <TaskList 
                tasks={tasks}
                pendingOperations={pendingOperations}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </motion.div>

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
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-xl h-fit lg:sticky lg:top-8"
          >
            <OperationLogs logs={logs} onClear={clearLogs} />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 backdrop-blur-xl border border-border/50">
            <span className="text-lg">💡</span>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">State Sync Engine</strong> — Un'app educativa per capire 
              la gestione dello stato
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;