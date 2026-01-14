import { motion } from 'framer-motion';
import { 
  Zap, 
  RefreshCw, 
  RotateCcw, 
  Lightbulb,
  ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const cards = [
  {
    icon: Zap,
    title: 'Aggiornamento Ottimistico',
    description: 'L\'UI si aggiorna subito, prima che il server risponda. L\'utente vede immediatamente il risultato della sua azione.',
    color: 'primary',
    gradient: 'gradient-primary',
  },
  {
    icon: RefreshCw,
    title: 'Sincronizzazione',
    description: 'Mentre l\'utente vede già il cambiamento, in background sincronizziamo con il server per salvare i dati.',
    color: 'accent',
    gradient: 'gradient-success',
  },
  {
    icon: RotateCcw,
    title: 'Rollback su Errore',
    description: 'Se il server fallisce, ripristiniamo automaticamente lo stato precedente. L\'utente viene informato dell\'errore.',
    color: 'warning',
    gradient: 'gradient-warning',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
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
      className="grid md:grid-cols-3 gap-6 mb-12"
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          variants={cardVariants}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="relative group"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-accent/5 blur-xl" />
          
          <div className="relative p-6 rounded-2xl glass border border-border/50 h-full">
            {/* Numero step */}
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
              {index + 1}
            </div>

            {/* Freccia tra le card (solo su desktop) */}
            {index < cards.length - 1 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-muted items-center justify-center">
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
              </div>
            )}

            {/* Icona */}
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
              card.gradient
            )}>
              <card.icon className="w-7 h-7 text-white" />
            </div>

            {/* Contenuto */}
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.description}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Card suggerimento */}
      <motion.div
        variants={cardVariants}
        className="md:col-span-3 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-primary mb-1">Prova tu stesso!</p>
          <p className="text-sm text-muted-foreground">
            Aggiungi una task, completala o eliminala. Osserva i log per vedere come l'app 
            gestisce ogni operazione. Usa lo slider per simulare errori del server e vedere il rollback in azione.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};