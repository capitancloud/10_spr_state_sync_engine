// Tipi per la gestione dello stato
// Questi tipi rappresentano le strutture dati dell'applicazione

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

// Stati possibili di sincronizzazione
export type SyncStatus = 
  | 'idle'           // Nessuna operazione in corso
  | 'syncing'        // Sincronizzazione in corso
  | 'success'        // Operazione completata con successo
  | 'error';         // Errore durante l'operazione

// Rappresenta un'operazione ottimistica in attesa di conferma
export interface PendingOperation {
  id: string;
  type: 'add' | 'update' | 'delete';
  taskId: string;
  previousState?: Task;     // Stato precedente per rollback
  optimisticState: Task;    // Stato ottimistico applicato
  timestamp: number;
}

// Log delle operazioni per visualizzazione educativa
export interface OperationLog {
  id: string;
  timestamp: number;
  type: 'optimistic' | 'backend' | 'rollback' | 'success' | 'error';
  message: string;
  details?: string;
}