import admin from 'firebase-admin'; // Corrected import for ES modules
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check if the service account key is available in the environment variables
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccount) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the environment variables');
}

let parsedServiceAccount;
try {
  // Parse the service account key JSON
  parsedServiceAccount = JSON.parse(serviceAccount);
  // console.log('Parsed Service Account esfse:', parsedServiceAccount); // Debugging line
} catch (error) {
  throw new Error('Failed to parse the FIREBASE_SERVICE_ACCOUNT_KEY. Please check the JSON format.');
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(parsedServiceAccount),
});

export default admin;
