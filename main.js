// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示する
const fetchHistoryData = async() => {
    let tags = '';

    // reportsコレクションのデータを取得
    const querySnapshot = await getDocs(collection(db, "reports"));

    // データをテーブル表の形式に合わせてHTMLに挿入
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`;
        document.getElementById('js-history').innerHTML = tags;
    });
};

// Cloud Firestoreから取得したデータを表示する
if (document.getElementById('js-history')) {
    fetchHistoryData();
}
