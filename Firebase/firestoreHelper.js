import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { doc, deleteDoc } from "firebase/firestore"; 
import {updateDoc} from 'firebase/firestore';
import { getDocs } from "firebase/firestore";

// export async function writeToDB(goal) {
// 	try {  
// 		// addDoc will automatically generate an id for the document
// 	     await addDoc(collection(database, "goals"), {
//             text: goal.text,
//           });
// 	  }
// 	catch (err) {
// 	    console.log(err)
// 	  }
// 	}

/* generalized function taken from Neda's github */
export async function writeToDB(data, collectionName) {
	try {
	  await addDoc(collection(database, collectionName), data);
	} catch (err) {
	  console.log("writ to db ", err);
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


	  export async function addUser(user,goalID) {
		try {  
			// addDoc will automatically generate an id for the document
			 await addDoc(collection(database, `goals/${goalID}/users`), {
				user
			  });
		  }
		catch (err) {
			console.log(err)
		  }
	  }


	  // need some fixing here
	//   export async function getUsers(goalID) {
	// 	try {  
	// 		const userSnapshot = await getDocs(collection(database, `goals/${goalID}/users`));
	// 		const userList = userSnapshot.docs.map(doc => doc.data());
	// 		//console.log('getting user list:',userList);
	// 		return userList;
	// 	  }
	// 	catch (err) {
	// 		console.log(err)
	// 	  }
	//   }