import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'


var build = 'development'
var firebaseConfig

// Your web app's Firebase configuration
if (build === 'production') {
    console.log('using production firebase ...')
    firebaseConfig = {
        apiKey: "XXXXXXXXXXXXX",
        authDomain: "XXXXXXXXXXXXX",
        databaseURL: "XXXXXXXXXXXXX",
        projectId: "XXXXXXXXXXXXX",
        storageBucket: "XXXXXXXXXXXXX",
        messagingSenderId: "XXXXXXXXXXXXX",
        appId: "XXXXXXXXXXXXX"
    };

} else {
    console.log('using development firebase ...')
    firebaseConfig = {
        apiKey: "XXXXXXXXXXXXX",
        authDomain: "XXXXXXXXXXXXX",
        databaseURL: "XXXXXXXXXXXXX",
        projectId: "XXXXXXXXXXXXX",
        storageBucket: "XXXXXXXXXXXXX",
        messagingSenderId: "XXXXXXXXXXXXX",
        appId: "XXXXXXXXXXXXX"
    };
}



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.database()

export default firebase