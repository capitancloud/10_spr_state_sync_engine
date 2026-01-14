import { useState, useCallback } from 'react';
import { Task, PendingOperation, OperationLog, SyncStatus } from '@/types/state';

/**
 * HOOK EDUCATIVO: useOptimisticState
 * 
 * Questo hook implementa il pattern degli aggiornamenti ottimistici.
 * 
 * COS'È UN AGGIORNAMENTO OTTIMISTICO?
 * Invece di aspettare la conferma del server, aggiorniamo subito l'UI
 * assumendo che l'operazione avrà successo. Se fallisce, ripristiniamo
 * lo stato precedente (rollback).
 * 
 * VANTAGGI:
 * - UI reattiva e veloce
 * - Migliore esperienza utente
 * - L'app sembra più responsive
 * 
 * SVANTAGGI:
 * - Complessità nella gestione degli errori
 * - Necessità di implementare il rollback
 */

// Simula una chiamata API con ritardo e possibilità di errore
// Delay aumentato per rendere visibili le animazioni educative
const simulateBackendCall = async (
  shouldFail: boolean = false,
  delay: number = 2500 // Delay più lungo per vedere meglio le animazioni
): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, delay));
  if (shouldFail) {
    throw new Error('Errore simulato del backend');
  }
  return true;
};

// Genera un ID univoco
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useOptimisticState = () => {
  // Stato principale delle task
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Impara gli aggiornamenti ottimistici', completed: false, createdAt: Date.now() - 10000 },
    { id: '2', text: 'Comprendi il rollback degli errori', completed: false, createdAt: Date.now() - 5000 },
  ]);

  // Operazioni in attesa di conferma dal "backend"
  const [pendingOperations, setPendingOperations] = useState<PendingOperation[]>([]);

  // Log delle operazioni per la visualizzazione educativa
  const [logs, setLogs] = useState<OperationLog[]>([]);

  // Stato della sincronizzazione
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');

  // Probabilità di errore (configurabile per demo)
  const [errorProbability, setErrorProbability] = useState(0.3);

  // Aggiunge un log
  const addLog = useCallback((
    type: OperationLog['type'],
    message: string,
    details?: string
  ) => {
    const log: OperationLog = {
      id: generateId(),
      timestamp: Date.now(),
      type,
      message,
      details,
    };
    setLogs(prev => [log, ...prev].slice(0, 20)); // Mantieni solo gli ultimi 20 log
  }, []);

  /**
   * STEP 1: Aggiornamento Ottimistico
   * Applichiamo immediatamente la modifica all'UI
   */
  const addTask = useCallback(async (text: string) => {
    const taskId = generateId();
    const now = Date.now();
    
    // Creiamo la nuova task
    const newTask: Task = {
      id: taskId,
      text,
      completed: false,
      createdAt: now,
    };

    // STEP 1: Aggiornamento ottimistico - UI aggiornata subito!
    addLog('optimistic', `Task "${text}" aggiunta all'UI`, 
      'L\'interfaccia mostra subito la nuova task, senza aspettare il server');
    
    setTasks(prev => [...prev, newTask]);
    setSyncStatus('syncing');

    // Registriamo l'operazione in attesa
    const operation: PendingOperation = {
      id: generateId(),
      type: 'add',
      taskId,
      optimisticState: newTask,
      timestamp: now,
    };
    setPendingOperations(prev => [...prev, operation]);

    // Piccolo delay per rendere visibile la separazione tra i log
    await new Promise(resolve => setTimeout(resolve, 800));

    // STEP 2: Inviamo la richiesta al "backend"
    addLog('backend', 'Sincronizzazione con il backend...', 
      'Mentre l\'utente vede già la task, stiamo salvando sul server');

    try {
      // Simula chiamata API (può fallire basandosi su errorProbability)
      const shouldFail = Math.random() < errorProbability;
      await simulateBackendCall(shouldFail);

      // STEP 3: Successo! L'operazione è confermata
      addLog('success', `Task "${text}" salvata sul server`, 
        'Il backend ha confermato il salvataggio');
      
      setPendingOperations(prev => prev.filter(op => op.id !== operation.id));
      setSyncStatus('success');
      
      setTimeout(() => setSyncStatus('idle'), 2000);

    } catch (error) {
      // STEP 3 (alternativo): Errore! Dobbiamo fare rollback
      addLog('error', `Errore nel salvare "${text}"`, 
        'Il server ha rifiutato l\'operazione');
      
      // Delay per vedere l'errore prima del rollback
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // ROLLBACK: Rimuoviamo la task che avevamo aggiunto ottimisticamente
      addLog('rollback', `Rollback: rimossa "${text}"`, 
        'Ripristiniamo lo stato precedente perché il server ha fallito');
      
      setTasks(prev => prev.filter(t => t.id !== taskId));
      setPendingOperations(prev => prev.filter(op => op.id !== operation.id));
      setSyncStatus('error');
      
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  }, [addLog, errorProbability]);

  /**
   * Toggle completamento task con aggiornamento ottimistico
   */
  const toggleTask = useCallback(async (taskId: string) => {
    // Trova la task corrente
    const currentTask = tasks.find(t => t.id === taskId);
    if (!currentTask) return;

    const previousState = { ...currentTask };
    const newCompleted = !currentTask.completed;

    // STEP 1: Aggiornamento ottimistico
    addLog('optimistic', 
      `Task "${currentTask.text}" ${newCompleted ? 'completata' : 'riaperta'}`,
      'Aggiorniamo subito l\'UI, poi sincronizziamo');
    
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: newCompleted } : t
    ));
    setSyncStatus('syncing');

    const operation: PendingOperation = {
      id: generateId(),
      type: 'update',
      taskId,
      previousState,
      optimisticState: { ...currentTask, completed: newCompleted },
      timestamp: Date.now(),
    };
    setPendingOperations(prev => [...prev, operation]);

    // Piccolo delay per rendere visibile la separazione tra i log
    await new Promise(resolve => setTimeout(resolve, 800));

    addLog('backend', 'Sincronizzazione con il backend...');

    try {
      const shouldFail = Math.random() < errorProbability;
      await simulateBackendCall(shouldFail);

      addLog('success', 'Stato task aggiornato sul server');
      setPendingOperations(prev => prev.filter(op => op.id !== operation.id));
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 2000);

    } catch (error) {
      addLog('error', 'Impossibile aggiornare la task');
      
      // Delay per vedere l'errore prima del rollback
      await new Promise(resolve => setTimeout(resolve, 800));
      
      addLog('rollback', `Rollback: ripristinato stato precedente`,
        'La task torna allo stato originale');
      
      // Rollback allo stato precedente
      setTasks(prev => prev.map(t => 
        t.id === taskId ? previousState : t
      ));
      setPendingOperations(prev => prev.filter(op => op.id !== operation.id));
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  }, [tasks, addLog, errorProbability]);

  /**
   * Elimina una task con aggiornamento ottimistico
   */
  const deleteTask = useCallback(async (taskId: string) => {
    const currentTask = tasks.find(t => t.id === taskId);
    if (!currentTask) return;

    const previousState = { ...currentTask };

    addLog('optimistic', `Task "${currentTask.text}" rimossa dall'UI`);
    
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setSyncStatus('syncing');

    const operation: PendingOperation = {
      id: generateId(),
      type: 'delete',
      taskId,
      previousState,
      optimisticState: currentTask,
      timestamp: Date.now(),
    };
    setPendingOperations(prev => [...prev, operation]);

    // Piccolo delay per rendere visibile la separazione tra i log
    await new Promise(resolve => setTimeout(resolve, 800));

    addLog('backend', 'Eliminazione in corso sul server...');

    try {
      const shouldFail = Math.random() < errorProbability;
      await simulateBackendCall(shouldFail);

      addLog('success', 'Task eliminata dal server');
      setPendingOperations(prev => prev.filter(op => op.id !== operation.id));
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 2000);

    } catch (error) {
      addLog('error', 'Impossibile eliminare la task');
      
      // Delay per vedere l'errore prima del rollback
      await new Promise(resolve => setTimeout(resolve, 800));
      
      addLog('rollback', `Rollback: "${currentTask.text}" ripristinata`);
      
      // Rollback: riaggiungiamo la task
      setTasks(prev => [...prev, previousState]);
      setPendingOperations(prev => prev.filter(op => op.id !== operation.id));
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  }, [tasks, addLog, errorProbability]);

  const clearLogs = useCallback(() => setLogs([]), []);

  return {
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
  };
};