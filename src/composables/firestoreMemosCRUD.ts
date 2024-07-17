/** 
 * ----------------------------------------------------
 * FireStore CRUD to access 'memos' field. 
 * ----------------------------------------------------
 * @module fireStoreMemosCRUD
 * @function saveMemosToFirestore - To Save Memos data to Firestore DB.
 * @function getMemosFromFirestore - To Reload Memos data from Firestore DB.
 * @function useFirestore - To Reload/save Memos data automatically at lifeCycleHook
*/

import { onMounted, onBeforeUnmount, } from "vue";

/* Firestore DB, APIs */
import { firestoreDB } from '@/composables/firebaseInitialization'
import { collection, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
const collectionRef = collection(firestoreDB,"memos");

/**
 * @function saveMemosToFirestore - To Save Memos data to Firestore DB.
 * @param {string} uid - firebase Authentication uid
 * @param {string[]} sentences - Memo sentences to save firestore 
*/
export async function saveMemosToFirestore(uid:string, sentences:string[]) {
  const memosRef = doc(collectionRef, uid);
  try {
    // await setDoc(doc(memosRef), { memos: sentences });
    await setDoc(memosRef,{
      memos: sentences,
      createdAt: serverTimestamp(),
    })
  } catch (err) {
    console.error('Error in the process of "saveMemoToFirestore()": ', err);
  }
}

/**
 * @function getMemosFromFirestore - To Reload Memos data from Firestore DB.
 * @param uid:string - firebase Authentication uid
 * @return {memosSnapshot.data().memos:string[]} - firestore snapshot field data
*/
export async function getMemosFromFirestore(uid:string) {
  const memosRef = doc(collectionRef, uid);
  try {
    const memosSnapshot = await getDoc(memosRef);
    if (memosSnapshot.exists()){
      console.log("memos data:",memosSnapshot.data().memos);
      return memosSnapshot.data().memos;
    } else {
      console.log("memos data: empty ");
    }
  } catch(err) {
    console.error('Error in the process of "getMemoFromFirestore()": ', err);
  }
}

/**
 * @function useFirestore - launch Firestore Actions at lifeCycleHook
 * @param {string} uid - firebase Authentication uid
 * @param {string[]} sentences - Memo sentences to sync with firestore DB
*/
export async function useFirestore(uid:string,sentences:string[],) {
  onMounted (async() => {
    if(uid) {
      sentences = await getMemosFromFirestore(uid);
    }
  });
  onBeforeUnmount (async() => {
    if(uid) {
      await saveMemosToFirestore(uid, sentences);
    }
  });
  return sentences;
}




