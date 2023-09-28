const admin = require("firebase-admin");
const serviceAccount = require("../firestore-private.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


let userRef = db.collection("users");

let result = userRef.where("username", "==", "apple").get().then((query)=>{
    console.log(query.size)
})

console.log(result)

// userRef.get().then((snapshot)=>{
//     snapshot.forEach((document)=>{
//         console.log(document.data());
//     })
// })

module.exports = db;