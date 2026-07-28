import { initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = JSON.parse(import.meta.env.VITE_KEY);

const app = initializeApp(firebaseConfig);  // connects your React app to your Firebase project.

const auth = getAuth(app)   // creates an authentication instance tied to your app.
const provider = new GoogleAuthProvider();  //sets up Google login as a provider.

export {auth, provider};