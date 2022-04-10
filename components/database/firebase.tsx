// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRc_lafNBicNwvGhpSECQuWsvxirsjcks",
  authDomain: "fir-auth-9e613.firebaseapp.com",
  projectId: "fir-auth-9e613",
  storageBucket: "fir-auth-9e613.appspot.com",
  messagingSenderId: "612719668723",
  appId: "1:612719668723:web:f5b64963df2338b5c5b686"
};


// Initialize Firebase
let app;
if(firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
} else {
  app = firebase.default.app();
}

const auth = firebase.default.auth();

export { auth };
