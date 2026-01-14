import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Monitor, 
  Server, 
  Database,
  ArrowRight,
  ArrowDown,
  Check,
  X,
  RotateCcw,
  Play,
  Pause,
  RefreshCw,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FlowStep = 
  | 'idle'
  | 'user-action'
  | 'optimistic-update'
  | 'ui-updated'
  | 'backend-request'
  | 'backend-processing'
  | 'backend-success'
  | 'backend-error'
  | 'rollback'
  | 'complete';

const stepDescriptions: Record<FlowStep, { title: string; description: string; color: string }> = {
  'idle': {
    title: 'In attesa',
    description: 'L\'utente sta per eseguire un\'azione...',
    color: 'text-muted-foreground'
  },
  'user-action': {
    title: '1. Azione Utente',
    description: 'L\'utente clicca su "Aggiungi Task" o completa una task',
    color: 'text-primary'
  },
  'optimistic-update': {
    title: '2. Optimistic Update',
    description: 'Lo stato viene aggiornato IMMEDIATAMENTE, senza aspettare il server!',
    color: 'text-primary'
  },
  'ui-updated': {
    title: '3. UI Aggiornata',
    description: 'L\'utente vede subito il risultato. Esperienza fluida!',
    color: 'text-success'
  },
  'backend-request': {
    title: '4. Richiesta al Backend',
    description: 'In background, inviamo la richiesta al server per salvare i dati',
    color: 'text-accent'
  },
  'backend-processing': {
    title: '5. Elaborazione Server',
    description: 'Il server sta elaborando la richiesta...',
    color: 'text-warning'
  },
  'backend-success': {
    title: '6a. Successo!',
    description: 'Il server ha confermato. Lo stato ottimistico era corretto!',
    color: 'text-success'
  },
  'backend-error': {
    title: '6b. Errore!',
    description: 'Il server ha rifiutato l\'operazione. Dobbiamo fare rollback...',
    color: 'text-destructive'
  },
  'rollback': {
    title: '7. Rollback',
    description: 'Ripristiniamo lo stato precedente. L\'utente viene notificato.',
    color: 'text-warning'
  },
  'complete': {
    title: 'Completato',
    description: 'Il flusso è terminato. L\'UI e il backend sono sincronizzati.',
    color: 'text-success'
  }
};

const successFlow: FlowStep[] = [
  'idle',
  'user-action',
  'optimistic-update',
  'ui-updated',
  'backend-request',
  'backend-processing',
  'backend-success',
  'complete'
];

const errorFlow: FlowStep[] = [
  'idle',
  'user-action',
  'optimistic-update',
  'ui-updated',
  'backend-request',
  'backend-processing',
  'backend-error',
  'rollback',
  'complete'
];

export const FlowDiagram = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('idle');
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showErrorFlow, setShowErrorFlow] = useState(false);
  
  const flow = showErrorFlow ? errorFlow : successFlow;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (stepIndex < flow.length - 1) {
        setStepIndex(prev => prev + 1);
        setCurrentStep(flow[stepIndex + 1]);
      } else {
        setIsPlaying(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, flow]);

  const handlePlay = () => {
    if (stepIndex >= flow.length - 1) {
      // Reset
      setStepIndex(0);
      setCurrentStep('idle');
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIndex(0);
    setCurrentStep('idle');
  };

  const toggleFlow = () => {
    setShowErrorFlow(!showErrorFlow);
    handleReset();
  };

  const currentInfo = stepDescriptions[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-xl mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Flusso Optimistic Update</h3>
            <p className="text-xs text-muted-foreground">Visualizzazione animata step-by-step</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Toggle Success/Error */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFlow}
            className={cn(
              "text-xs",
              showErrorFlow ? "border-destructive/50 text-destructive" : "border-success/50 text-success"
            )}
          >
            {showErrorFlow ? (
              <>
                <X className="w-3 h-3 mr-1" />
                Flusso Errore
              </>
            ) : (
              <>
                <Check className="w-3 h-3 mr-1" />
                Flusso Successo
              </>
            )}
          </Button>
          
          {/* Play/Pause */}
          <Button
            variant="default"
            size="sm"
            onClick={handlePlay}
            disabled={isPlaying}
            className="bg-gradient-to-r from-primary to-purple-500"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 mr-1" />
            ) : stepIndex >= flow.length - 1 ? (
              <RefreshCw className="w-4 h-4 mr-1" />
            ) : (
              <Play className="w-4 h-4 mr-1" />
            )}
            {isPlaying ? 'In corso...' : stepIndex >= flow.length - 1 ? 'Ricomincia' : 'Avvia'}
          </Button>
        </div>
      </div>

      {/* Diagram */}
      <div className="relative py-8">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* User */}
          <DiagramNode
            icon={User}
            label="Utente"
            isActive={currentStep === 'user-action'}
            isPast={stepIndex > 0}
          />
          
          <AnimatedArrow isActive={stepIndex >= 1} />
          
          {/* Frontend State */}
          <DiagramNode
            icon={Monitor}
            label="Frontend"
            sublabel="(Stato)"
            isActive={currentStep === 'optimistic-update' || currentStep === 'ui-updated' || currentStep === 'rollback'}
            isPast={stepIndex >= 2}
            isRollback={currentStep === 'rollback'}
          />
          
          <AnimatedArrow isActive={stepIndex >= 4} isBidirectional={currentStep === 'rollback'} />
          
          {/* Backend API */}
          <DiagramNode
            icon={Server}
            label="Backend"
            sublabel="(API)"
            isActive={currentStep === 'backend-request' || currentStep === 'backend-processing'}
            isPast={stepIndex >= 5}
            isError={currentStep === 'backend-error'}
            isSuccess={currentStep === 'backend-success'}
          />
          
          <AnimatedArrow isActive={stepIndex >= 5} />
          
          {/* Database */}
          <DiagramNode
            icon={Database}
            label="Database"
            isActive={currentStep === 'backend-success' || currentStep === 'complete'}
            isPast={stepIndex >= 7 && !showErrorFlow}
            isError={showErrorFlow && stepIndex >= 6}
          />
        </div>

        {/* Timeline indicator */}
        <div className="mt-8 relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={cn(
              "absolute left-0 top-0 h-full rounded-full",
              showErrorFlow && stepIndex >= 6 
                ? "bg-gradient-to-r from-primary via-warning to-destructive"
                : "bg-gradient-to-r from-primary via-accent to-success"
            )}
            initial={{ width: '0%' }}
            animate={{ width: `${(stepIndex / (flow.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Current Step Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6 p-4 rounded-xl bg-muted/50 border border-border/50"
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                currentStep.includes('error') || currentStep === 'rollback' 
                  ? "bg-destructive/20" 
                  : currentStep.includes('success') || currentStep === 'complete'
                  ? "bg-success/20"
                  : "bg-primary/20"
              )}
            >
              <span className="text-lg">
                {currentStep === 'idle' && '⏳'}
                {currentStep === 'user-action' && '👆'}
                {currentStep === 'optimistic-update' && '⚡'}
                {currentStep === 'ui-updated' && '✨'}
                {currentStep === 'backend-request' && '📤'}
                {currentStep === 'backend-processing' && '⚙️'}
                {currentStep === 'backend-success' && '✅'}
                {currentStep === 'backend-error' && '❌'}
                {currentStep === 'rollback' && '↩️'}
                {currentStep === 'complete' && '🎉'}
              </span>
            </motion.div>
            <div>
              <h4 className={cn("font-bold", currentInfo.color)}>
                {currentInfo.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {currentInfo.description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>Attivo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span>Completato</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span>Errore</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span>Rollback</span>
        </div>
      </div>
    </motion.div>
  );
};

// Componente nodo del diagramma
const DiagramNode = ({ 
  icon: Icon, 
  label, 
  sublabel,
  isActive, 
  isPast,
  isError,
  isSuccess,
  isRollback
}: { 
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  isActive: boolean;
  isPast: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isRollback?: boolean;
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center"
      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
    >
      <motion.div
        className={cn(
          "w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300",
          isActive && !isError && !isRollback && "bg-primary/20 border-primary shadow-lg shadow-primary/30",
          isPast && !isError && !isActive && "bg-success/20 border-success",
          isError && "bg-destructive/20 border-destructive shadow-lg shadow-destructive/30",
          isSuccess && "bg-success/20 border-success shadow-lg shadow-success/30",
          isRollback && "bg-warning/20 border-warning shadow-lg shadow-warning/30",
          !isActive && !isPast && !isError && !isSuccess && "bg-muted border-border"
        )}
        animate={isRollback ? { x: [0, -5, 5, 0] } : {}}
        transition={{ duration: 0.3, repeat: isRollback ? 2 : 0 }}
      >
        <Icon className={cn(
          "w-6 h-6 md:w-7 md:h-7",
          isActive && !isError && !isRollback && "text-primary",
          isPast && !isError && !isActive && "text-success",
          isError && "text-destructive",
          isSuccess && "text-success",
          isRollback && "text-warning",
          !isActive && !isPast && !isError && !isSuccess && "text-muted-foreground"
        )} />
      </motion.div>
      <span className={cn(
        "mt-2 text-xs font-medium text-center",
        isActive && "text-foreground",
        !isActive && "text-muted-foreground"
      )}>
        {label}
      </span>
      {sublabel && (
        <span className="text-[10px] text-muted-foreground">{sublabel}</span>
      )}
    </motion.div>
  );
};

// Freccia animata
const AnimatedArrow = ({ isActive, isBidirectional }: { isActive: boolean; isBidirectional?: boolean }) => {
  return (
    <div className="flex-1 flex items-center justify-center px-1">
      <motion.div
        className="relative w-full h-0.5 bg-border rounded-full overflow-hidden"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
      >
        {isActive && (
          <motion.div
            className={cn(
              "absolute top-0 h-full rounded-full",
              isBidirectional 
                ? "bg-warning right-0" 
                : "bg-gradient-to-r from-primary to-accent left-0"
            )}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
      <motion.div
        animate={isActive ? { x: [0, 3, 0] } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        {isBidirectional ? (
          <RotateCcw className={cn(
            "w-4 h-4 ml-1 flex-shrink-0",
            isActive ? "text-warning" : "text-muted-foreground"
          )} />
        ) : (
          <ArrowRight className={cn(
            "w-4 h-4 ml-1 flex-shrink-0",
            isActive ? "text-accent" : "text-muted-foreground"
          )} />
        )}
      </motion.div>
    </div>
  );
};