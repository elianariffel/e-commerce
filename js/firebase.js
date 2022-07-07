import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
  
import {
   getFirestore,
   collection,
   getDocs,
   doc, 
   getDoc
   } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyArTAz7qZbdWjdBdKnWqczDe_91_vhdEJ0",
    authDomain: "e-commerce-4b973.firebaseapp.com",
    projectId: "e-commerce-4b973",
    storageBucket: "e-commerce-4b973.appspot.com",
    messagingSenderId: "963251206337",
    appId: "1:963251206337:web:42abe111126bd0a5e97c40"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const obtenerProductos = async () => {

    const querySnapshot = await getDocs(collection(db, "productos"));

    const productos = []

    querySnapshot.forEach((doc) => {

    productos.push(doc);

 });
      
    return productos;

  }

export const obtenerProducto = async (id) => {

  const docRef = doc(db, "productos", id);

  const docSnap = await getDoc(docRef);

   if (docSnap.exists()) {

      return docSnap;

    } else {

      console.log("No such document!");

    }

}