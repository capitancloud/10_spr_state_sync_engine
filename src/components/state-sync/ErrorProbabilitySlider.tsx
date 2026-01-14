import { motion } from 'framer-motion';
import { AlertTriangle, Shield } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface ErrorProbabilitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const ErrorProbabilitySlider = ({ value, onChange }: ErrorProbabilitySliderProps) => {
  const percentage = Math.round(value * 100);
  
  const getLabel = () => {
    if (percentage === 0) return 'Mai';
    if (percentage <= 20) return 'Raro';
    if (percentage <= 50) return 'Moderato';
    if (percentage <= 80) return 'Frequente';
    return 'Sempre';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-4 rounded-xl glass"
    >
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <h3 className="font-semibold">Simula Errori del Backend</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Aumenta la probabilità di errore per vedere come l'app gestisce 
        i fallimenti e il rollback dello stato.
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Affidabile</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Instabile</span>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
        </div>

        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={0}
          max={1}
          step={0.1}
          className="w-full"
        />

        <div className="flex items-center justify-center">
          <motion.div
            key={percentage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium",
              percentage === 0 && "bg-success/20 text-success",
              percentage > 0 && percentage <= 30 && "bg-success/10 text-success",
              percentage > 30 && percentage <= 60 && "bg-warning/20 text-warning",
              percentage > 60 && "bg-destructive/20 text-destructive"
            )}
          >
            {percentage}% - {getLabel()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};