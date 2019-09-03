(() =>{
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

  const auth = firebase.auth();
  let me = null;

  const message = document.getElementById('message');
  const form = document.querySelector('form');
  const messages = document.getElementById('messages');
  const login = document.getElementById('login');
  const logout = document.getElementById('logout');




  login.addEventListener('click',() => {
    auth.signInAnonymously();
  });

  logout.addEventListener('click',() => {
    auth.signOut();
  });

  auth.onAuthStateChanged(user => {
    if(user){
      me = user;

      while(messages.firstChild){
        messages.removeChild(messages.firstChild);
      }

      collection.orderBy('created').onSnapshot(snapshot =>{
        snapshot.docChanges().forEach(change=>{
          if(change.type==='added'){
            const li = document.createElement('li');
            const d = change.doc.data();
            li.textContent = d.uid.substr(0, 8) + ': ' +d.message;
            messages.appendChild(li);
          }
        });
      },error=>{

      });
      console.log(`Logged in as: ${user.uid}`);
      login.classList.add('hidden');
      [logout, form, messages].forEach(el=>{
        el.classList.remove('hidden');
      });
      message.focus();
      return;
    }
    me = null;
    console.log(`Nobody is logged in`);
    login.classList.remove('hidden');
    [logout, form, messages].forEach(el=>{
      el.classList.add('hidden');
    });
  });

  form.addEventListener('submit',e => {
    e.preventDefault();

    const val = message.value.trim();
    if(val === ""){
      return;
    }

    message.value ='';
    message.focus();

    collection.add({
      message: val,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      uid: me ? me.uid : 'nobody'
    }).then(doc=>{
      console.log(`${doc.id} added!`);
    }).catch(error => {
      console.log('document add error!');
      console(error);
    });
  });

})();
