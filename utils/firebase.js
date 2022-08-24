import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWi0bF4WlAk4X8wpGVmyYHcnZdj3QSvMY",
  authDomain: "tiktok-e6d66.firebaseapp.com",
  projectId: "tiktok-e6d66",
  storageBucket: "tiktok-e6d66.appspot.com",
  messagingSenderId: "1729806739",
  appId: "1:1729806739:web:f714dccf00de009e90a866",
  measurementId: "G-BYC17P046P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);