import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBHNW0v-9Y6wTgAU7fwFIx-j_KeeNR8obA',
	authDomain: 'ecomm-db-1100e.firebaseapp.com',
	projectId: 'ecomm-db-1100e',
	storageBucket: 'ecomm-db-1100e.firebasestorage.app',
	messagingSenderId: '925760319271',
	appId: '1:925760319271:web:1b2a5af253db0793448302',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log('error creating users', error.message);
		}
	}

	return userDocRef;
};
