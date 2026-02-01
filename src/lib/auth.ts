// Utility per la gestione dell'autenticazione con hash

// Hash SHA-256 del codice di accesso
// Codice originale: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
const VALID_CODE_HASH = '5c8e9a4b7d1f2e3a6b9c0d8e7f4a5b2c1d6e9f0a3b8c5d2e7f4a1b6c9d0e3f8a';

// Funzione per calcolare l'hash SHA-256 di una stringa
export async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Pre-calcoliamo l'hash del codice valido al caricamento
let validHash: string | null = null;

export async function initializeAuth(): Promise<void> {
  // Hash del codice di accesso corretto
  const correctCode = 'gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E';
  validHash = await hashCode(correctCode);
}

// Verifica se il codice inserito è corretto
export async function verifyCode(inputCode: string): Promise<boolean> {
  if (!validHash) {
    await initializeAuth();
  }
  const inputHash = await hashCode(inputCode);
  return inputHash === validHash;
}

// Gestione della sessione con localStorage
const AUTH_KEY = 'state_sync_authenticated';

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function setAuthenticated(value: boolean): void {
  if (value) {
    localStorage.setItem(AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function logout(): void {
  setAuthenticated(false);
}
