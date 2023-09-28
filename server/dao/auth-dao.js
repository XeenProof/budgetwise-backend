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

const getNewUserID = () => {
    return userRef.doc().id.toString();
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
    let id = getNewUserID();
    let data = {...newUser, id:id}
    userRef.doc(id).set(data).catch((e)=>{
        data = null;
    })
    return data
}

module.exports = {
    getUserByLogin,
    getUserById,
    createUser
}