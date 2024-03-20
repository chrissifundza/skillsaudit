const { initializeApp } = require('firebase/app');
const { getAuth } = require("firebase/auth");
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require("firebase/storage");
const firebaseConfig = {
  apiKey: "AIzaSyDOzhDiZdtQ7QcvoEjS2VO21BUJfVIy9iU",
  authDomain: "skills-audit-ggxtld.firebaseapp.com",
  projectId: "skills-audit-ggxtld",
  storageBucket: "skills-audit-ggxtld.appspot.com",
  messagingSenderId: "173767162784",
  appId: "1:173767162784:web:fea49284e544478ab1c2c5"
};
  const app = initializeApp(firebaseConfig);
  const auth = getAuth()  
  const db = getFirestore();
  const storage=getStorage()
  module.exports= {auth,db,storage}