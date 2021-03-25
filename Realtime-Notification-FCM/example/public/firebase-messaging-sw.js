/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');
   
/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
* New configuration for app@pulseservice.com
*/
firebase.initializeApp({
        apiKey: "AIzaSyCeBQj---ZeEbmVEUUsU",
        authDomain: "test---.firebaseapp.com",
        projectId: "test---",
        storageBucket: "test---.appspot.com",
        messagingSenderId: "876---809396",
        appId: "1:8----09396:web:4----4f6a7a1",
        measurementId: "G-F----12B8"
    });
  
/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    /* Customize notification here */
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: "-",
    };
  
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});

// loggings
self.addEventListener('install', (event) => {
  console.log('Inside the install handler:', event);
});
self.addEventListener('activate', (event) => {
  console.log('Inside the activate handler:', event);
});
self.addEventListener(fetch, (event) => {
  console.log('Inside the fetch handler:', event);
});