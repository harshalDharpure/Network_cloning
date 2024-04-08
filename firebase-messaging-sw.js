importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyBWAscuVVmMlT57Mbh5usgkcbQiiqY3dOc",
authDomain: "catzby.firebaseapp.com",
projectId: "catzby",
storageBucket: "catzby.appspot.com",
messagingSenderId: "508696127749",
appId: "1:508696127749:web:2dbea26e1bd694f38c2f6c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

self.addEventListener('notificationclick', function(event) {
let url = event.notification.data.click_action;
event.notification.close(); // closes the notification
event.waitUntil(
clients.matchAll(
{ includeUncontrolled: true, type: 'window' }
).then( windowClients => {

//check if @notification page is already opened
for (var i = 0; i < windowClients.length; i++) {
var client = windowClients[i];

//if @notification page is already opened then focus it
if (client.url === url && 'focus' in client) {
//if (clienturldomain === 'catzby.com' && 'focus' in client) {
return client.focus();
}
}
//if @notification page is NOT already opened then open it 
//in a new tab or window
if (clients.openWindow) {
return clients.openWindow(url);
}
}));
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
const notificationTitle = payload.data.title;
const notificationOptions = {
body: payload.data.body,
icon: payload.data.icon,
badge: payload.data.badge,
data: {
time: new Date(Date.now()).toString(),
click_action: payload.data.click_action
}
};
return self.registration.showNotification(notificationTitle,
notificationOptions);
});
