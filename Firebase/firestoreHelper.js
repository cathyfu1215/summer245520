import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";

export async function writeToDB(goal) {
	try {  
	     await addDoc(collection(database, "goals"), {
            text: goal.text,
          });
	  }
	catch (err) {
	    console.log(err)
	  }
	}
