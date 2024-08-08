import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { doc, deleteDoc,setDoc,getDoc } from "firebase/firestore"; 
import {updateDoc} from 'firebase/firestore';
import { getDocs } from "firebase/firestore";
import { auth } from "./firebaseSetup";

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

	// export async function deleteFromDB(key) {
	// 	try { 
	// 	  await deleteDoc(doc(database, "goals", key));
	// 	}
	// 	catch (err) {
	// 	  console.log(err)
	// 	}
	//   }

	/* generalized function taken from Neda's github */

	  export async function deleteFromDB(id, collectionName) {
		try {
		  await deleteDoc(doc(database, collectionName, id));
		} catch (err) {
		  console.log("delete from db ", err);
		}
	  }


	 // Lab 4 Q3
	//   export async function updateDB(key) {
		
	// 	try {
	// 		const goalRef = doc(database, "goals", key);
	// 		await updateDoc(goalRef, { warning: true });
	// 	}
	// 	catch (err) {
	// 	  console.log(err)
	// 	}
	//   }

	  export async function updateDB(id, collectionName) {
		try {
			const goalRef = doc(database, collectionName, id);
			await updateDoc(goalRef, { warning: true });
		} catch (err) {
		  console.log("update from db ", err);
		}
	  }


	//   export async function addUser(user,goalID) {
	// 	try {  
	// 		// addDoc will automatically generate an id for the document
	// 		 await addDoc(collection(database, `goals/${goalID}/users`), {
	// 			user
	// 		  });
	// 	  }
	// 	catch (err) {
	// 		console.log(err)
	// 	  }
	//   }


	 
	  export async function getFromDB(id, collectionName,subCollectionName) {
		try {  
			const userSnapshot = await getDocs(collection(database, `${collectionName}/${id}/${subCollectionName}`));
			const userList = userSnapshot.docs.map(doc => doc.data());
			//console.log('getting user list:',userList);
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