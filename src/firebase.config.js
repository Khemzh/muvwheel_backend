// Import the functions you need from the SDKs you need
const firebase = require('firebase')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCUP4lwuTEXSPnFmJIY_eGSEnOGDGPxMRg',
  authDomain: 'muvwheel.firebaseapp.com',
  projectId: 'muvwheel',
  storageBucket: 'muvwheel.appspot.com',
  messagingSenderId: '311607180749',
  appId: '1:311607180749:web:7d4521e795d2023efa9884',
  measurementId: 'G-XHVX8FYGV5',
  databaseURL:
    'https://muvwheel-default-rtdb.asia-southeast1.firebasedatabase.app/',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const user = db.collection('users')

// export const auth = getAuth(app);
module.exports = user
