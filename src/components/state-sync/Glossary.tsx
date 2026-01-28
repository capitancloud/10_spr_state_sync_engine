import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ChevronDown,
  ChevronUp,
  Zap,
  Server,
  Monitor,
  Database,
  RefreshCw,
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GlossaryTerm {
  term: string;
  icon: React.ElementType;
  definition: string;
  example: string;
  color: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Optimistic Update",
    icon: Zap,
    definition: "Una tecnica dove l'interfaccia si aggiorna PRIMA di ricevere conferma dal server. 'Ottimistico' perché assumiamo che tutto andrà bene.",
    example: "Quando metti 'like' su un post, il cuoricino diventa rosso subito, senza aspettare il server.",
    color: "from-primary to-purple-500"
  },
  {
    term: "Frontend",
    icon: Monitor,
    definition: "La parte dell'applicazione che vedi e con cui interagisci. Include pulsanti, moduli, animazioni - tutto quello che appare sul tuo schermo.",
    example: "Questa pagina che stai leggendo è il frontend. Puoi vederla e cliccare sui pulsanti.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    term: "Backend",
    icon: Server,
    definition: "La parte nascosta dell'applicazione che gira su un server remoto. Gestisce i dati, la sicurezza e le operazioni complesse.",
    example: "Quando salvi un documento online, il backend lo memorizza sui server di un'azienda.",
    color: "from-accent to-emerald-400"
  },
  {
    term: "Database",
    icon: Database,
    definition: "Un 'magazzino' digitale dove vengono salvati tutti i dati in modo permanente. Senza database, perderesti tutto chiudendo l'app.",
    example: "I tuoi messaggi WhatsApp sono salvati in un database, così li ritrovi anche cambiando telefono.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    term: "Sincronizzazione",
    icon: RefreshCw,
    definition: "Il processo di far 'parlare' frontend e backend per mantenere i dati aggiornati in entrambi i posti.",
    example: "Quando modifichi un foglio Google, la sincronizzazione fa sì che tutti vedano le modifiche.",
    color: "from-orange-500 to-amber-500"
  },
  {
    term: "Rollback",
    icon: RotateCcw,
    definition: "Annullare un'operazione e tornare allo stato precedente. Come premere Ctrl+Z, ma automaticamente quando qualcosa va storto.",
    example: "Se aggiungi una task ma il server fallisce, l'app la rimuove automaticamente tornando allo stato di prima.",
    color: "from-warning to-orange-400"
  },
  {
    term: "Latenza",
    icon: Clock,
    definition: "Il tempo che passa tra quando fai un'azione e quando vedi il risultato. Più alta = più lenta l'esperienza.",
    example: "Se clicchi e aspetti 3 secondi per vedere il risultato, hai 3 secondi di latenza.",
    color: "from-rose-500 to-pink-500"
  },
  {
    term: "Stato (State)",
    icon: HelpCircle,
    definition: "I 'dati attuali' dell'applicazione in un dato momento. Cambia continuamente mentre usi l'app.",
    example: "In questa demo, lo 'stato' include la lista delle task e se sono completate o meno.",
    color: "from-teal-500 to-cyan-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export const Glossary = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">📖 Glossario dei Termini</h3>
              <p className="text-xs text-muted-foreground">Non sai cosa significa una parola? Cercala qui!</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Chiudi
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Apri Glossario
              </>
            )}
          </Button>
        </div>

        {/* Lista termini */}
        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : 0, 
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isExpanded ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-3"
          >
            {glossaryTerms.map((item) => (
              <motion.div
                key={item.term}
                variants={itemVariants}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-200 cursor-pointer",
                  expandedTerm === item.term 
                    ? "bg-primary/5 border-primary/30" 
                    : "bg-muted/30 border-border/50 hover:bg-muted/50"
                )}
                onClick={() => setExpandedTerm(expandedTerm === item.term ? null : item.term)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", `bg-gradient-to-br ${item.color}`)}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm">{item.term}</h4>
                      <ChevronDown className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform",
                        expandedTerm === item.term && "rotate-180"
                      )} />
                    </div>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: expandedTerm === item.term ? 'auto' : 0,
                        opacity: expandedTerm === item.term ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {item.definition}
                      </p>
                      <div className="mt-2 p-2 rounded-lg bg-background/50 border border-border/30">
                        <p className="text-xs">
                          <span className="text-primary font-semibold">💡 Esempio: </span>
                          <span className="text-muted-foreground">{item.example}</span>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Preview quando chiuso */}
        {!isExpanded && (
          <div className="flex flex-wrap gap-2 mt-2">
            {glossaryTerms.slice(0, 4).map((item) => (
              <span 
                key={item.term}
                className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
              >
                {item.term}
              </span>
            ))}
            <span className="text-xs px-2 py-1 text-muted-foreground">
              +{glossaryTerms.length - 4} altri...
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
