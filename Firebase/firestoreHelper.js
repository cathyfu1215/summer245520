import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { doc, deleteDoc,setDoc} from "firebase/firestore"; 
import {updateDoc} from 'firebase/firestore';
import { getDocs } from "firebase/firestore";
import { auth } from "./firebaseSetup";
import { getDoc } from 'firebase/firestore';


export async function writeToDB(data, collectionName) {
	try {
	  await addDoc(collection(database, collectionName), data);
	} catch (err) {
	  console.log("writ to db ", err);
	}
  }



	  export async function deleteFromDB(id, collectionName) {
		try {
		  await deleteDoc(doc(database, collectionName, id));
		} catch (err) {
		  console.log("delete from db ", err);
		}
	  }


	  export async function updateDB(id, collectionName) {
		try {
			const goalRef = doc(database, collectionName, id);
			await updateDoc(goalRef, { warning: true });
		} catch (err) {
		  console.log("update from db ", err);
		}
	  }


	 
	  export async function getFromDB(id, collectionName,subCollectionName) {
		try {  
			const userSnapshot = await getDocs(collection(database, `${collectionName}/${id}/${subCollectionName}`));
			const userList = userSnapshot.docs.map(doc => doc.data());
			return userList;
		  }
		catch (err) {
			console.log(err)
		  }
	  }



	  export async function setUserLocation(location, uid) {
		try {
		  await setDoc(doc(database,"users",uid), {location:location,merge:true});
		} catch (err) {
		  console.log("error setting the location of the user ",uid, err);
		}
	  }

	  export async function getUserDoc(uid) {
		try {
		  const userDocRef = doc(database, "users", uid); // Create a document reference
		  const docSnap = await getDoc(userDocRef); // Get the document snapshot
		  if (docSnap.exists()) {
			console.log('user doc:', docSnap.data());
			return docSnap.data(); // Return the document data
		  } else {
			console.log("No such document!");
			return null;
		  }
		} catch (err) {
		  console.error("Error getting user doc:", uid, err);
		  throw err; // Re-throw the error to handle it further up the call stack if needed
		}
	  }