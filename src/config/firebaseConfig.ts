import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

import * as serviceAccount from "./servicekey.json";

// const {
//         FIREBASE_PROJECT_ID,
//         FIREBASE_CLIENT_EMAIL,
//         FIREBASE_PRIVATE_KEY,
//     } = process.env;

//      // Create a service account object with the provided credentials
//     const serviceAccount: ServiceAccount = {
//         projectId: FIREBASE_PROJECT_ID,
//         clientEmail: FIREBASE_CLIENT_EMAIL,
//         // Replace escaped newlines in the private key string with actual newlines
//         privateKey: FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
//     };

// Initialize the Firebase app with the service account credentials
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
// This creates a Firestore instance that you can use to interact with your database
const db: Firestore = getFirestore();

export { db };