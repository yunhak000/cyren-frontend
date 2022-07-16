import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASEREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const getTokenValue = async (setTokenFound) => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
    if (currentToken) {
      setTokenFound(currentToken);
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};
