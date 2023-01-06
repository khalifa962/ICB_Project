import { initializeApp } from "firebase/app";
//import { getDatabase } from "firebase/database";
import { getDatabase, ref, child, get } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCahd8e0aj8Pz0UmAJJ1DcCV4ebZoUeMiU",
  authDomain: "foodapp-b079c.firebaseapp.com",
  databaseURL: "https://foodapp-b079c-default-rtdb.firebaseio.com",
  projectId: "foodapp-b079c",
  storageBucket: "foodapp-b079c.appspot.com",
  messagingSenderId: "1080220846319",
  appId: "1:1080220846319:web:2e7ca6b9fc9fc59036331a"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbRef = ref(getDatabase());
get(child(dbRef, `meals`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

