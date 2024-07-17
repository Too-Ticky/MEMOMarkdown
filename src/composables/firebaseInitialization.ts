import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
   /* Firebase project configuration */
      apiKey: import.meta.env.VITE_FB_API_KEY,
      authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FB_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FB_APP_ID,
      measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
   /* Firebase realtime Database configuration */
      databaseURL: import.meta.env.VITE_FB_RTDB,  
};

export const firebaseApp = initializeApp(firebaseConfig); // Initialize 'Firebase'
export const firestoreDB = getFirestore(firebaseApp); // Initialize 'Firestore' and get a reference to the service
export const auth = getAuth(firebaseApp); // Initialize 'Firebase/Auth' and get a reference to the service