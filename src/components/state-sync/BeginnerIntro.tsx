import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Smartphone, 
  Cloud, 
  Wifi, 
  WifiOff,
  Clock,
  Zap,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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

export const BeginnerIntro = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      {/* Header con toggle */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-primary/5 to-purple-500/10 border border-blue-500/20 p-6"
      >
        {/* Decorazioni */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">📚 Prima di iniziare: le basi</h2>
                <p className="text-sm text-muted-foreground">Concetti fondamentali spiegati semplicemente</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Nascondi
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Mostra
                </>
              )}
            </Button>
          </div>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Analogia del ristorante */}
            <div className="p-5 rounded-xl bg-card/60 backdrop-blur border border-border/50 mb-6">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-4xl flex-shrink-0"
                >
                  🍕
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Capiamo con un esempio: Ordinare una Pizza</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Immagina di essere al ristorante. Quando ordini una pizza:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-warning" />
                        <span className="font-semibold text-sm">Approccio Tradizionale</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Il cameriere va in cucina, aspetta che la pizza sia pronta, e solo DOPO torna da te per dirti "ok, la stiamo preparando". 
                        Tu aspetti senza sapere cosa sta succedendo. 😴
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-success" />
                        <span className="font-semibold text-sm">Approccio Ottimistico</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Il cameriere ti dice SUBITO "Perfetto, pizza in arrivo!" e poi va in cucina. 
                        Tu sei già contento e sai che la pizza sta arrivando. 😊
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Concetti chiave */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <ConceptCard
                icon={Smartphone}
                title="Frontend"
                subtitle="La parte visibile"
                description="È quello che vedi sullo schermo: pulsanti, testo, immagini. È come il banco del ristorante dove ordini."
                color="from-primary to-purple-500"
              />
              <ConceptCard
                icon={Cloud}
                title="Backend"
                subtitle="Il cervello nascosto"
                description="È il server che salva i dati. Come la cucina del ristorante: non la vedi ma fa tutto il lavoro pesante."
                color="from-accent to-emerald-400"
              />
              <ConceptCard
                icon={Wifi}
                title="Sincronizzazione"
                subtitle="La comunicazione"
                description="È come il cameriere che porta l'ordine in cucina e torna con la risposta. A volte è veloce, a volte lento."
                color="from-warning to-orange-400"
              />
            </div>

            {/* Il problema e la soluzione */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-destructive/5 to-success/5 border border-border/50">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Il problema che risolviamo
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <WifiOff className="w-5 h-5 text-destructive" />
                    <span className="font-semibold">❌ Senza Optimistic Update</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• Clicco un pulsante</li>
                    <li>• Aspetto 1-3 secondi senza sapere cosa succede...</li>
                    <li>• Finalmente vedo il risultato</li>
                    <li>• <strong className="text-destructive">L'app sembra lenta e poco reattiva!</strong></li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-success" />
                    <span className="font-semibold">✅ Con Optimistic Update</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• Clicco un pulsante</li>
                    <li>• <strong className="text-success">Vedo SUBITO il risultato!</strong></li>
                    <li>• In background, l'app sincronizza col server</li>
                    <li>• Se qualcosa va storto, torno indietro automaticamente</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Nota importante */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3"
            >
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary mb-1">💡 Come usare questa demo</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Qui sotto trovi un <strong>Task Manager di esempio</strong>. Prova ad aggiungere, completare o eliminare delle task.
                  Nella sezione "Log delle Operazioni" a destra vedrai ESATTAMENTE cosa succede dietro le quinte, passo dopo passo.
                  Puoi anche aumentare la "Probabilità di Errore" per vedere come l'app gestisce i problemi!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Card per i concetti
const ConceptCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  description, 
  color 
}: { 
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="p-4 rounded-xl bg-card/60 backdrop-blur border border-border/50 h-full"
    >
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", `bg-gradient-to-br ${color}`)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h4 className="font-bold text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};
