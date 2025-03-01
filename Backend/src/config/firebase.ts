import admin from 'firebase-admin';
import serviceAccount from './FirebaseServiceKey.json'; // Path to your JSON key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://serviceproviders-ffc00-default-rtdb.firebaseio.com/', // Replace with your database URL
});

const db = admin.database();
export default db;
