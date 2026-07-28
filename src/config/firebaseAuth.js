import { initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  "apiKey": import.meta.env.VITE_APIKEY, 
  "authDomain": import.meta.env.VITE_AUTHDOMAIN, 
  "projectId": import.meta.env.VITE_PROJECTID, 
  "storageBucket": import.meta.env.VITE_STORAGEBUCKET, 
  "messagingSenderId": import.meta.env.VITE_MESSAGEID, 
  "appId": import.meta.env.VITE_APIID
}

const app = initializeApp(firebaseConfig);  // connects your React app to your Firebase project.

const auth = getAuth(app)   // creates an authentication instance tied to your app.
const provider = new GoogleAuthProvider();  //sets up Google login as a provider.

export {auth, provider};