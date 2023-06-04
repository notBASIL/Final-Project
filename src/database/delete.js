import {
    doc,
    deleteDoc
}
    from 'firebase/firestore';

import db from './config'

const deleteRecipe = async (id, cb) => {
    const dbDoc = doc(db, 'posts', id);
    deleteDoc(dbDoc)
        .then(() => {
            console.log('Successfully deleted!');
            cb();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};


export default deleteRecipe;