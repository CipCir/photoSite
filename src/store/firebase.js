import firebase from "firebase";

let config = {
  apiKey: "AIzaSyBib_AlVc5xpocSlzGj3QiUEn5WwN8Y6zg",
  authDomain: "albumenunti-50776.firebaseapp.com",
  databaseURL: "https://albumenunti-50776.firebaseio.com",
  projectId: "albumenunti-50776",
  storageBucket: "albumenunti-50776.appspot.com",
  messagingSenderId: "118091881921",
  appId: "1:118091881921:web:631c31149c97637b2c6340"
};

firebase.initializeApp(config);

export default {
  database: firebase.database()
};
