import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, Loader2, KeyRound, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Inserisci il codice di accesso');
      return;
    }

    setError('');
    setIsVerifying(true);

    // Simula un breve delay per UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = await login(code);
    
    if (!success) {
      setError('Codice di accesso non valido');
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px]"
          animate={{ 
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[80px]"
          animate={{ 
            x: [0, -25, 0],
            y: [0, -25, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Logo */}
            <motion.div 
              className="relative inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-accent shadow-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                State Sync Engine
              </span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Inserisci il codice di accesso per continuare
            </p>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20"
          >
            <div className="flex items-start gap-3">
              <KeyRound className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Accesso Protetto</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Questa applicazione educativa è protetta da un codice di accesso. 
                  Il codice viene verificato in modo sicuro utilizzando una funzione di hash crittografica.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium mb-2">
                Codice di Accesso
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showCode ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Inserisci il codice..."
                  className="pl-10 pr-12 h-12 text-base bg-background/50 border-border/50 focus:border-primary/50"
                  disabled={isVerifying}
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showCode ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                disabled={isVerifying}
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Verifica in corso...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Accedi
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Security Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-xs text-muted-foreground"
          >
            🔒 Il codice viene verificato localmente tramite hash SHA-256
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
