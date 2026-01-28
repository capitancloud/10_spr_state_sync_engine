import { motion } from 'framer-motion';
import { 
  Zap, 
  RefreshCw, 
  RotateCcw, 
  Lightbulb,
  ArrowRight,
  Info,
  BookOpen,
  Target,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

const cards = [
  {
    icon: Zap,
    title: 'STEP 1: Optimistic Update',
    subtitle: 'Aggiornamento immediato',
    description: 'Appena clicchi, l\'app mostra SUBITO il risultato. Non devi aspettare! È come quando ordini una pizza e il cameriere ti dice subito "Arriva!", senza andare prima in cucina.',
    whatHappens: 'L\'interfaccia cambia istantaneamente',
    gradient: 'from-primary to-purple-500',
    emoji: '⚡'
  },
  {
    icon: RefreshCw,
    title: 'STEP 2: Sincronizzazione',
    subtitle: 'Salvataggio in background',
    description: 'Mentre tu vedi già il risultato, in background l\'app sta "chiamando" il server per salvare davvero i dati. Tu non te ne accorgi nemmeno!',
    whatHappens: 'I dati vengono inviati al server',
    gradient: 'from-accent to-emerald-400',
    emoji: '🔄'
  },
  {
    icon: RotateCcw,
    title: 'STEP 3: Conferma o Rollback',
    subtitle: 'Gestione del risultato',
    description: 'Se il server conferma: tutto ok! Se invece c\'è un errore (es. internet assente), l\'app torna automaticamente allo stato precedente e ti avvisa.',
    whatHappens: 'Successo → mantieni le modifiche | Errore → torna indietro',
    gradient: 'from-warning to-orange-400',
    emoji: '↩️'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export const ExplanationCards = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 mb-12"
    >
      {/* Box di spiegazione principale */}
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/5 to-accent/10 border border-primary/20 p-6 md:p-8"
      >
        {/* Decorazioni di sfondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Cos'è questa app?</h2>
              <p className="text-sm text-muted-foreground">Una demo educativa interattiva</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Obiettivo</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mostrare visivamente come funziona la gestione dello stato nelle app moderne con aggiornamenti in tempo reale.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Eye className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Come funziona</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Esegui azioni sulle task e osserva i log in tempo reale. Ogni operazione mostra il flusso completo.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="w-4 h-4 text-warning" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Simula errori</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Usa lo slider per simulare errori del backend e vedere come l'app gestisce il rollback automatico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cards dei 3 step */}
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative group"
          >
            {/* Glow effect on hover */}
            <motion.div 
              className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl",
                `bg-gradient-to-br ${card.gradient}`
              )}
              style={{ filter: 'blur(20px)', opacity: 0 }}
              whileHover={{ opacity: 0.2 }}
            />
            
            <div className="relative p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 h-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              {/* Numero step con animazione */}
              <motion.div 
                className={cn(
                  "absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg",
                  `bg-gradient-to-br ${card.gradient}`
                )}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                {index + 1}
              </motion.div>

              {/* Freccia tra le card */}
              {index < cards.length - 1 && (
                <motion.div 
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border items-center justify-center shadow-md"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              )}

              {/* Emoji grande */}
              <motion.div 
                className="text-4xl mb-3"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {card.emoji}
              </motion.div>

              {/* Icona */}
              <motion.div 
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-lg",
                  `bg-gradient-to-br ${card.gradient}`
                )}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <card.icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Contenuto */}
              <h3 className="text-base font-bold mb-1">{card.title}</h3>
              <p className="text-xs text-primary/80 font-medium mb-2">{card.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {card.description}
              </p>
              
              {/* Cosa succede */}
              <div className="p-2 rounded-lg bg-muted/50 border border-border/30">
                <p className="text-xs">
                  <span className="font-semibold">👁️ Cosa vedi: </span>
                  <span className="text-muted-foreground">{card.whatHappens}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Card suggerimento migliorata */}
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden p-5 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative flex items-start gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-6 h-6 text-primary" />
          </motion.div>
          <div>
            <p className="text-sm font-semibold text-primary mb-1">💡 Prova tu stesso!</p>
            <p className="text-sm text-muted-foreground">
              Aggiungi una task, completala o eliminala. Osserva i log per vedere ogni operazione in tempo reale. 
              Aumenta la probabilità di errore per vedere il rollback in azione!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};