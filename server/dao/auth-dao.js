const db = require('../db/database');

const userRef = db.collection("users");

const extractUser = (data) => {
    let list = []
    data.forEach((document)=>{
        const user = document.data();
        list.push(user);
    })
    return list;
}

const getUserByLogin = async (email) => {
    let data = await userRef.where("email", '==', email).get();
    if(data.size < 1){return null;}
    let user = extractUser(data)[0];
    return user;
}

const getUserById = async (id) => {
    let data = await userRef.doc(id).get();
    if(data.size < 1){return null;}
    let user = extractUser(data)[0];
    return user;
}

const createUser = async (newUser) => {
    let {id} = newUser
    userRef.doc(id).set(newUser).catch((e)=>{
        newUser = null;
    })
    return newUser
}

module.exports = {
    getUserByLogin,
    getUserById,
    createUser
}