import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const initApp = () => {
    if (getApps().length) return getAuth();
    console.log('Initialising Firebase App');
    const serviceAccount = JSON.parse(process.env.FIREBASE_CERT);
    const app = initializeApp({
        credential: cert(serviceAccount)
    });
    return getAuth(app);
}

export default function getFirebaseAuth() {
    return initApp();
}
