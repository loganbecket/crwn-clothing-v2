import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD5N_Gyf9FT7NO_lcKtiQudfuX-So_-DPk',
  authDomain: 'crwn-clothing-db-2b8c1.firebaseapp.com',
  projectId: 'crwn-clothing-db-2b8c1',
  storageBucket: 'crwn-clothing-db-2b8c1.appspot.com',
  messagingSenderId: '803308210128',
  appId: '1:803308210128:web:69ee456db4d54e3dcc5bd5'
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }

  return userDocRef
}
