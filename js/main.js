'use strict';


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC5i_4dP-S2nq7_-N8jsC_i5JXr0yPtatg",
    authDomain: "chattry-223c0.firebaseapp.com",
    databaseURL: "https://chattry-223c0.firebaseio.com",
    projectId: "chattry-223c0",
    storageBucket: "chattry-223c0.appspot.com",
    messagingSenderId: "701860996873",
    appId: "1:701860996873:web:5ad6a7a3423788c0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const collection = db.collection('messages');

  const message = document.getElementById('message');
  const form = document.querySelector('form');

  form.addEventListener('submit',e => {
    e.preventDefault();

    collection.add({
      messsage: message.value
    }).then(doc=>{
      console.log(`${doc.id} added!`);
      message.value ='';
      message.focus();
    }).catch(error => {
      console(error);
    });
  });

  message.focus();
