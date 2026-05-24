// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBS7tyLbP6ljA1WFDRXbez189aRf9nWWgw",
  authDomain: "devfest-32d78.firebaseapp.com",
  projectId: "devfest-32d78",
  storageBucket: "devfest-32d78.appspot.com",
  messagingSenderId: "724324993217",
  appId: "1:724324993217:web:29e5499fc34bd6f012ec40",
  measurementId: "G-T62HX7798B"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification.title,
    { body: payload.notification.body }
  );
});