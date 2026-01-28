import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Clock, 
  Zap, 
  MousePointer2, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  ArrowDown,
  ArrowRight,
  Eye,
  EyeOff,
  Server,
  Smartphone,
  Wifi,
  AlertTriangle,
  RotateCcw,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

// Simulazione visiva dell'approccio tradizionale
const TraditionalApproachDemo = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      id: 0,
      title: '🖱️ Inizio: Tu clicchi il pulsante',
      userSees: 'Vedi il pulsante, lo clicchi... e non succede nulla di visibile.',
      whatHappens: 'La tua azione viene registrata, ma l\'interfaccia NON cambia ancora.',
      highlight: 'user',
      emoji: '👆'
    },
    {
      id: 1,
      title: '⏳ Attesa: Il messaggio viaggia al server',
      userSees: 'Vedi uno spinner o "Caricamento..." - devi aspettare!',
      whatHappens: 'I dati viaggiano attraverso internet fino al server. Questo richiede tempo (100ms - 3 secondi).',
      highlight: 'network',
      emoji: '🌐'
    },
    {
      id: 2,
      title: '⚙️ Elaborazione: Il server lavora',
      userSees: 'Stai ancora aspettando... lo spinner gira.',
      whatHappens: 'Il server riceve i dati, li verifica, li salva nel database.',
      highlight: 'server',
      emoji: '🖥️'
    },
    {
      id: 3,
      title: '📨 Risposta: Il server risponde',
      userSees: 'Ancora in attesa della risposta...',
      whatHappens: 'Il server invia la conferma che tutto è andato bene (o male).',
      highlight: 'network',
      emoji: '📡'
    },
    {
      id: 4,
      title: '✅ Fine: Finalmente vedi il risultato!',
      userSees: 'ORA vedi il cambiamento! Ma sono passati 1-3 secondi.',
      whatHappens: 'Solo DOPO aver ricevuto la conferma, l\'app mostra il risultato.',
      highlight: 'user',
      emoji: '🎉'
    },
  ];

  const runAnimation = () => {
    setIsPlaying(true);
    setStep(0);
    
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Timeline visuale */}
      <div className="relative">
        {/* Barra del tempo */}
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs text-muted-foreground">0 secondi</span>
          <span className="text-xs text-destructive font-bold">~2-3 secondi di attesa! 😴</span>
        </div>
        
        <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-8">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-warning to-destructive"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Diagramma con le tre sezioni */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Utente */}
          <motion.div 
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-300",
              step === 0 || step === 4 
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20" 
                : "border-border/50 bg-card/50 opacity-50"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-primary" />
              <span className="font-bold text-sm">TU (Utente)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {step === 0 && "Clicchi il pulsante..."}
              {step >= 1 && step <= 3 && "Aspetti... ⏳"}
              {step === 4 && "Finalmente vedi il risultato! ✅"}
            </p>
            {step >= 1 && step <= 3 && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="mt-2"
              >
                <Loader2 className="w-4 h-4 text-warning" />
              </motion.div>
            )}
          </motion.div>

          {/* Rete */}
          <motion.div 
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-300",
              step === 1 || step === 3 
                ? "border-warning bg-warning/10 shadow-lg shadow-warning/20" 
                : "border-border/50 bg-card/50 opacity-50"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-5 h-5 text-warning" />
              <span className="font-bold text-sm">INTERNET</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {step === 1 && "Dati in viaggio verso il server... 🚀"}
              {step === 3 && "Risposta in viaggio verso di te... 📨"}
              {(step === 0 || step === 2 || step === 4) && "In attesa..."}
            </p>
            {(step === 1 || step === 3) && (
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="mt-2"
              >
                <ArrowRight className="w-4 h-4 text-warning" />
              </motion.div>
            )}
          </motion.div>

          {/* Server */}
          <motion.div 
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-300",
              step === 2 
                ? "border-accent bg-accent/10 shadow-lg shadow-accent/20" 
                : "border-border/50 bg-card/50 opacity-50"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-accent" />
              <span className="font-bold text-sm">SERVER</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {step === 2 && "Salvo i dati nel database... 💾"}
              {step !== 2 && "In attesa di richieste..."}
            </p>
            {step === 2 && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="mt-2"
              >
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Step corrente */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-5 rounded-xl bg-card border border-border"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{steps[step].emoji}</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-2">{steps[step].title}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">👁️ Cosa VEDI tu:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{steps[step].userSees}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-sm">🔧 Cosa SUCCEDE dietro:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{steps[step].whatHappens}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controlli */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={runAnimation}
          disabled={isPlaying}
          className="gap-2"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'In esecuzione...' : 'Guarda l\'animazione'}
        </Button>
        <Button
          variant="outline"
          onClick={() => setStep(0)}
          disabled={isPlaying}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Ricomincia
        </Button>
      </div>

      {/* Problema evidenziato */}
      <motion.div
        variants={itemVariants}
        className="p-4 rounded-xl bg-destructive/10 border border-destructive/20"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-destructive mb-1">❌ Il problema principale</p>
            <p className="text-sm text-muted-foreground">
              L'utente deve <strong>aspettare</strong> che tutto il processo sia completato prima di vedere qualsiasi cambiamento. 
              Questo rende l'app <strong>lenta e frustrante</strong> da usare, anche se il server funziona perfettamente!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Simulazione visiva dell'approccio ottimistico
const OptimisticApproachDemo = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scenario, setScenario] = useState<'success' | 'error'>('success');

  const successSteps = [
    {
      id: 0,
      title: '🖱️ Inizio: Tu clicchi il pulsante',
      userSees: 'Clicchi e... vedi SUBITO il risultato! ✨',
      whatHappens: 'L\'app è "ottimista": assume che tutto andrà bene e ti mostra subito il risultato.',
      highlight: 'user',
      emoji: '⚡'
    },
    {
      id: 1,
      title: '🔄 Sincronizzazione: Nel frattempo...',
      userSees: 'Tu stai già usando l\'app normalmente! Non aspetti.',
      whatHappens: 'IN BACKGROUND (senza che tu te ne accorga), i dati vengono inviati al server.',
      highlight: 'network',
      emoji: '🚀'
    },
    {
      id: 2,
      title: '⚙️ Server: Salvataggio',
      userSees: 'Continui a usare l\'app senza interruzioni.',
      whatHappens: 'Il server riceve e salva i dati. Tu non devi aspettare!',
      highlight: 'server',
      emoji: '💾'
    },
    {
      id: 3,
      title: '✅ Conferma silenziosa',
      userSees: 'Nessun cambiamento visibile - tutto era già a posto!',
      whatHappens: 'Il server conferma il successo. L\'app lo registra internamente.',
      highlight: 'success',
      emoji: '🎉'
    },
  ];

  const errorSteps = [
    {
      id: 0,
      title: '🖱️ Inizio: Tu clicchi il pulsante',
      userSees: 'Clicchi e... vedi SUBITO il risultato! ✨',
      whatHappens: 'L\'app mostra subito il risultato sperato.',
      highlight: 'user',
      emoji: '⚡'
    },
    {
      id: 1,
      title: '🔄 Sincronizzazione: Nel frattempo...',
      userSees: 'Tu stai già usando l\'app normalmente.',
      whatHappens: 'I dati vengono inviati al server in background.',
      highlight: 'network',
      emoji: '🚀'
    },
    {
      id: 2,
      title: '❌ Errore: Qualcosa va storto!',
      userSees: 'L\'app ti avvisa con un messaggio chiaro.',
      whatHappens: 'Il server risponde con un errore (es: internet assente, dati non validi).',
      highlight: 'error',
      emoji: '⚠️'
    },
    {
      id: 3,
      title: '↩️ Rollback: Torniamo indietro',
      userSees: 'L\'interfaccia torna automaticamente allo stato precedente.',
      whatHappens: 'L\'app "annulla" il cambiamento ottimistico e ripristina lo stato corretto.',
      highlight: 'rollback',
      emoji: '🔙'
    },
  ];

  const steps = scenario === 'success' ? successSteps : errorSteps;

  const runAnimation = () => {
    setIsPlaying(true);
    setStep(0);
    
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Selettore scenario */}
      <div className="flex justify-center gap-4">
        <Button
          variant={scenario === 'success' ? 'default' : 'outline'}
          onClick={() => { setScenario('success'); setStep(0); }}
          className="gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Scenario: Successo
        </Button>
        <Button
          variant={scenario === 'error' ? 'destructive' : 'outline'}
          onClick={() => { setScenario('error'); setStep(0); }}
          className="gap-2"
        >
          <XCircle className="w-4 h-4" />
          Scenario: Errore
        </Button>
      </div>

      {/* Timeline visuale */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs text-muted-foreground">0 secondi</span>
          <span className="text-xs text-success font-bold">Risultato visibile SUBITO! ⚡</span>
        </div>
        
        <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-4">
          {/* Barra istantanea per feedback visivo */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-success via-accent to-success"
            initial={{ width: '0%' }}
            animate={{ width: step >= 0 ? '25%' : '0%' }}
            transition={{ duration: 0.2 }}
          />
          {/* Barra per il resto del processo */}
          <motion.div
            className={cn(
              "absolute inset-y-0 left-[25%]",
              scenario === 'success' 
                ? "bg-gradient-to-r from-accent to-success" 
                : step >= 2 
                  ? "bg-gradient-to-r from-accent to-destructive" 
                  : "bg-gradient-to-r from-accent to-success"
            )}
            initial={{ width: '0%' }}
            animate={{ width: `${Math.max(0, (step / (steps.length - 1)) * 75)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground mb-8 px-2">
          <span className="text-success font-bold">👆 Clicchi qui</span>
          <span>↔️ Sincronizzazione in background</span>
          <span>{scenario === 'success' ? '✅ Conferma' : '↩️ Rollback'}</span>
        </div>

        {/* Diagramma con le tre sezioni */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Utente */}
          <motion.div 
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-300",
              "border-success bg-success/10 shadow-lg shadow-success/20"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-success" />
              <span className="font-bold text-sm">TU (Utente)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {step === 0 && "Clicchi e vedi SUBITO! ⚡"}
              {step >= 1 && step <= 2 && "Continui a usare l'app! 😊"}
              {step === 3 && scenario === 'success' && "Tutto confermato! ✅"}
              {step === 3 && scenario === 'error' && "Vedi il rollback ↩️"}
            </p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-2"
            >
              <CheckCircle2 className="w-4 h-4 text-success" />
            </motion.div>
          </motion.div>

          {/* Rete */}
          <motion.div 
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-300",
              step === 1 
                ? "border-accent bg-accent/10 shadow-lg shadow-accent/20" 
                : "border-border/50 bg-card/50 opacity-70"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-5 h-5 text-accent" />
              <span className="font-bold text-sm">INTERNET</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {step === 1 && "Sync in background... 🔄"}
              {step !== 1 && "Lavora silenziosamente"}
            </p>
          </motion.div>

          {/* Server */}
          <motion.div 
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-300",
              step === 2 
                ? scenario === 'success'
                  ? "border-accent bg-accent/10" 
                  : "border-destructive bg-destructive/10"
                : step === 3
                  ? scenario === 'success'
                    ? "border-success bg-success/10"
                    : "border-warning bg-warning/10"
                  : "border-border/50 bg-card/50 opacity-70"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5" />
              <span className="font-bold text-sm">SERVER</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {step === 2 && scenario === 'success' && "Salvataggio... 💾"}
              {step === 2 && scenario === 'error' && "Errore! ❌"}
              {step === 3 && scenario === 'success' && "Tutto OK! ✅"}
              {step === 3 && scenario === 'error' && "Rollback attivato ↩️"}
              {step < 2 && "In attesa..."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Step corrente */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${scenario}-${step}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "p-5 rounded-xl border",
            scenario === 'error' && step >= 2 
              ? "bg-destructive/5 border-destructive/20" 
              : "bg-card border-border"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{steps[step].emoji}</div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-2">{steps[step].title}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={cn(
                  "p-3 rounded-lg border",
                  step === 0 
                    ? "bg-success/10 border-success/20" 
                    : "bg-primary/10 border-primary/20"
                )}>
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="font-semibold text-sm">👁️ Cosa VEDI tu:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{steps[step].userSees}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-sm">🔧 Cosa SUCCEDE dietro:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{steps[step].whatHappens}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controlli */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={runAnimation}
          disabled={isPlaying}
          className="gap-2 bg-success hover:bg-success/90"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'In esecuzione...' : 'Guarda l\'animazione'}
        </Button>
        <Button
          variant="outline"
          onClick={() => setStep(0)}
          disabled={isPlaying}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Ricomincia
        </Button>
      </div>

      {/* Vantaggio evidenziato */}
      <motion.div
        variants={itemVariants}
        className="p-4 rounded-xl bg-success/10 border border-success/20"
      >
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-success mb-1">✅ Il vantaggio principale</p>
            <p className="text-sm text-muted-foreground">
              L'utente vede il risultato <strong>istantaneamente</strong>! Non deve mai aspettare.
              Se qualcosa va storto, l'app torna automaticamente allo stato precedente e avvisa l'utente.
              Risultato: un'esperienza <strong>veloce, fluida e moderna</strong>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ApproachComparison = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-12"
    >
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-warning/5 border border-border/50 p-6 md:p-8"
      >
        {/* Decorazioni */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              🎓 Come funzionano le app web?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Prima di vedere la demo, capiamo la <strong>differenza fondamentale</strong> tra 
              l'approccio tradizionale e quello ottimistico. Clicca sui tab qui sotto!
            </p>
          </div>

          {/* Tabs per i due approcci */}
          <Tabs defaultValue="traditional" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1">
              <TabsTrigger 
                value="traditional" 
                className="py-4 data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-bold">❌ Approccio Tradizionale</div>
                    <div className="text-xs opacity-70">Aspetta prima di mostrare</div>
                  </div>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="optimistic"
                className="py-4 data-[state=active]:bg-success/10 data-[state=active]:text-success"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-bold">✅ Optimistic Update</div>
                    <div className="text-xs opacity-70">Mostra subito, sincronizza dopo</div>
                  </div>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="traditional" className="mt-0">
              <div className="p-6 rounded-xl bg-card/80 backdrop-blur border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning to-destructive flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Approccio Tradizionale</h3>
                    <p className="text-sm text-muted-foreground">
                      "Prima salvo, poi ti mostro" - L'utente deve aspettare
                    </p>
                  </div>
                </div>
                <TraditionalApproachDemo />
              </div>
            </TabsContent>

            <TabsContent value="optimistic" className="mt-0">
              <div className="p-6 rounded-xl bg-card/80 backdrop-blur border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-accent flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Optimistic Update</h3>
                    <p className="text-sm text-muted-foreground">
                      "Ti mostro subito, poi salvo" - Esperienza istantanea
                    </p>
                  </div>
                </div>
                <OptimisticApproachDemo />
              </div>
            </TabsContent>
          </Tabs>

          {/* Confronto finale */}
          <motion.div
            variants={itemVariants}
            className="mt-8 p-6 rounded-xl bg-gradient-to-r from-destructive/5 via-transparent to-success/5 border border-border"
          >
            <h3 className="text-lg font-bold text-center mb-4">📊 Confronto Rapido</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive mb-3">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold">Tradizionale</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>⏳ L'utente aspetta 1-3 secondi</li>
                  <li>😴 Esperienza lenta e frustrante</li>
                  <li>🔒 Più "sicuro" ma meno usabile</li>
                  <li>📱 Le app sembrano vecchie</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-3">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold">Optimistic</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>⚡ Risultato istantaneo (0ms percepiti)</li>
                  <li>😊 Esperienza fluida e moderna</li>
                  <li>↩️ Rollback automatico se errore</li>
                  <li>📱 Le app sembrano native</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
