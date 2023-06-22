import {
    addDoc,
    collection
} from 'firebase/firestore';
import db from './config.js';

const dbCollection = collection(db, 'posts');

// post data to firestore
const postData = async (data, cb) => {
    addDoc(dbCollection, data)
        .then((docRef) => {
            console.log('Success:', docRef);
            cb();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

export default postData;