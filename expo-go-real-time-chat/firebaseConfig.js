import { initializeApp } from 'firebase/app';
import firebaseConfigSecrets from './firebaseConfigSecrets';

console.debug('Setting up Firebase database');
const app = initializeApp(firebaseConfigSecrets);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default app;