importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD1W8JjXOOMq5oi3dp2Xhu1i4WZHL8RiqI",
  authDomain: "black-widow-rand.firebaseapp.com",
  projectId: "black-widow-rand",
  storageBucket: "black-widow-rand.firebasestorage.app",
  messagingSenderId: "269000336764",
  appId: "1:269000336764:web:b53c2bb13c8df857faf0f9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("🔥 Background push received:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/logo192.png"
    }
  );
});
