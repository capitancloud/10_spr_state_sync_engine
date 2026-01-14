import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Check saved preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative w-16 h-8 rounded-full p-1 transition-colors duration-500",
        isDark 
          ? "bg-gradient-to-r from-indigo-900 to-purple-900" 
          : "bg-gradient-to-r from-amber-300 to-orange-400"
      )}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Stars (dark mode) */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-full"
        initial={false}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              opacity: isDark ? [0.3, 1, 0.3] : 0,
              scale: isDark ? [0.8, 1.2, 0.8] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Clouds (light mode) */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-full"
        initial={false}
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute w-3 h-2 bg-white/60 rounded-full"
          style={{ left: '60%', top: '20%' }}
          animate={{ x: isDark ? 0 : [0, 3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-2 h-1.5 bg-white/40 rounded-full"
          style={{ left: '70%', top: '60%' }}
          animate={{ x: isDark ? 0 : [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>

      {/* Toggle ball */}
      <motion.div
        className={cn(
          "relative w-6 h-6 rounded-full shadow-lg flex items-center justify-center",
          isDark 
            ? "bg-slate-200" 
            : "bg-amber-100"
        )}
        initial={false}
        animate={{
          x: isDark ? 32 : 0,
          rotate: isDark ? 360 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Sun icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="w-4 h-4 text-amber-500" />
        </motion.div>

        {/* Moon icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="w-4 h-4 text-indigo-600" />
        </motion.div>

        {/* Moon craters (visible in dark mode) */}
        <AnimatePresence>
          {isDark && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute w-1.5 h-1.5 rounded-full bg-slate-400"
                style={{ top: '25%', left: '55%' }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute w-1 h-1 rounded-full bg-slate-400"
                style={{ top: '55%', left: '35%' }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full pointer-events-none",
          isDark 
            ? "shadow-[0_0_20px_rgba(99,102,241,0.4)]" 
            : "shadow-[0_0_20px_rgba(251,191,36,0.4)]"
        )}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
};