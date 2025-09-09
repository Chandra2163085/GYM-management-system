
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApajnowXi9pAn-Hkm_3qExxWFSqe5U2LY",
  authDomain: "gym-management-system-c0ad7.firebaseapp.com",
  projectId: "gym-management-system-c0ad7",
  storageBucket: "gym-management-system-c0ad7.firebasestorage.app",
  messagingSenderId: "849487750323",
  appId: "1:849487750323:web:dd6e898802cbc7c7e0bcc6",
  measurementId: "G-GDY69KYR15"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

export { auth, db };

