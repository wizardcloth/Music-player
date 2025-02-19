import admin from "firebase-admin";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Firebase Service Account Key
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccount) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the environment variables");
}

let parsedServiceAccount;
try {
  parsedServiceAccount = JSON.parse(serviceAccount);
} catch (error) {
  throw new Error("Failed to parse the FIREBASE_SERVICE_ACCOUNT_KEY. Please check the JSON format.");
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(parsedServiceAccount),
});
if(admin){
  console.log('admin is ready');
}
export default admin;
