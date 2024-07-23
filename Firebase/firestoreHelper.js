import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { doc, deleteDoc } from "firebase/firestore"; 
import {updateDoc} from 'firebase/firestore';

export async function writeToDB(goal) {
	try {  
		// addDoc will automatically generate an id for the document
	     await addDoc(collection(database, "goals"), {
            text: goal.text,
          });
	  }
	catch (err) {
	    console.log(err)
	  }
	}

	export async function deleteFromDB(key) {
		try { 
		  await deleteDoc(doc(database, "goals", key));
		}
		catch (err) {
		  console.log(err)
		}
	  }


	 // Lab 4 Q3
	  export async function updateDB(key) {
		
		try {
			const goalRef = doc(database, "goals", key);
			await updateDoc(goalRef, { warning: true });
		}
		catch (err) {
		  console.log(err)
		}
	  }