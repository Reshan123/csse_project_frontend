import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcWBfcVdcQxKUqOn_ZgId0rxCJnWjEuJA",
  authDomain: "csse-663ab.firebaseapp.com",
  projectId: "csse-663ab",
  storageBucket: "csse-663ab.appspot.com",
  messagingSenderId: "171447003407",
  appId: "1:171447003407:web:1b2caf888f94c47954f67a",
  measurementId: "G-Q04F4080BW"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
