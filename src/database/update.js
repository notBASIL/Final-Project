import {
    doc,
    updateDoc
}
    from 'firebase/firestore';

import db from './config'

const updateRecipe = async (id, data, cb) => {
    const dbDoc = doc(db, 'posts', id);
    updateDoc(dbDoc,data)
        .then(() => {
            console.log('Successfully updated!');
            cb();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};


export default updateRecipe;