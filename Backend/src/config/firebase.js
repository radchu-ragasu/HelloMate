import * as firebaseAdmin from 'firebase-admin';
const serviceAccount = require('./hellomate-c68-firebase-adminsdk.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://hellomate-c682a-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

const db = firebaseAdmin.database();

export { firebaseAdmin as admin, db };