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
  const messages = document.getElementById('messages');

  collection.orderBy('created').get().then(snapshot =>{
    snapshot.forEach(doc=>{
      const li = document.createElement('li');
      li.textContent = doc.data().message;
      messages.appendChild(li);
    });
  });

  form.addEventListener('submit',e => {
    e.preventDefault();

    const li = document.createElement('li');
    li.textContent = message.value;
    messages.appendChild(li);
    
    collection.add({
      message: message.value,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then(doc=>{
      console.log(`${doc.id} added!`);
      message.value ='';
      message.focus();
    }).catch(error => {
      console(error);
    });
  });

  message.focus();
