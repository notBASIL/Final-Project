import {
    getDocs,
    collection
} from 'firebase/firestore';
import db from './config.js';
// function add data into firestore

const dbCollection = collection(db, 'posts');

// function get data from firestore
const getPosts = async (setRecipes) => {
    const querySnapshot = await getDocs(dbCollection);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
    });
    setRecipes(data);
};


export default getPosts;