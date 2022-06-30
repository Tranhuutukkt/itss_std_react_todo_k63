import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {doc, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc} from 'firebase/firestore';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBJr6jr6QbLTA5IkJ_JpvklRVeOBqbdR9U",
    authDomain: "itss-firebase-217d0.firebaseapp.com",
    projectId: "itss-firebase-217d0",
    storageBucket: "itss-firebase-217d0.appspot.com",
    messagingSenderId: "685926460845",
    appId: "1:685926460845:web:be4e9c776ae1d9f17d0524"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default firebase;

export const getFbItems = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'todos'));
        let items = [];
        snapshot.forEach(doc => {
            items.push({...doc.data(), id: doc.id});
        });
        return items;
    }
    catch (ex){
        console.log(ex);
        return [];
    }
}

export const addFbItems = async (item) => {
    try {
        await addDoc(collection(db, 'todos'), item);
    }
    catch (e) {
        console.log(e);
    }
}

export const updateFbItems = async (item, id) => {
  try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, item);
  }
  catch (e) {
      console.log(e);
  }
}

export const deleteFbItems = async (item) => {
    await deleteDoc(doc(db, "todos", item.id))
        .then(function () {})
        .catch(function (ex) {
            console.log(ex);
        });
};

/*---User---*/

export const auth = firebase.auth();

export const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

export const storeUserInfo = async user => {
    const {uid} = user;
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()){
        await setDoc(doc(db, 'users', uid), {name: user.displayName});
        return {name: user.displayName, id: uid};
    }
    else return {id: uid, ...userDoc.data()};
}

/*---Avatar---*/
export const updateUser = async (user, image) => {
    try {
        const userRef = doc(db, 'users', user.id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists())
            await updateDoc(userRef, {...userDoc.data(), image: image});
    }
    catch (e) {
        console.log(e);
    }
}

export const uploadImage = async (image) => {
    const imageRef = ref(getStorage(), `/images/${image.name}`);
    let downloadUrl = '';
    try {
        const upload = await uploadBytesResumable(imageRef, image);
        downloadUrl = await getDownloadURL(upload.snapshot.ref);
    }
    catch (e) {
        console.log(e);
    }
    return downloadUrl;
}
