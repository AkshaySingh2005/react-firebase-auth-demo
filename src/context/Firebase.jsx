import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { getDatabase, set, ref, get, child } from 'firebase/database'; // Import get and child for fetching data


const firebaseConfig = {
  // add your own  firebase config
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Create Firebase context
const FirebaseContext = createContext(null);

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase Provider Component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  // Function to sign up user with email and password
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Function to log in user with email and password
  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // Function to log out user
  const logoutUser = () => {
    return signOut(firebaseAuth);
  };

  // Function to store data in Firebase database
  const putData = (key, data) => {
    return set(ref(database, key), data)
      .then(() => console.log(`Data stored successfully at ${key}`))
      .catch((error) => console.error(`Error storing data at ${key}:`, error));
  };

  // Function to retrieve data from Firebase database
  const getData = async (key) => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, key));
      if (snapshot.exists()) {
        return snapshot.val(); 
      } else {
        console.log(`No data available at ${key}`);
        return null;
      }
    } catch (error) {
      console.error(`Error retrieving data at ${key}:`, error);
      return null;
    }
  };

  // Function to sign in with Google
  const signupWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        setUser(result.user); // Set the user state upon successful login
        console.log("Google Sign-in successful:", result.user);
      })
      .catch((error) => {
        console.error("Error during Google Sign-in:", error);
      });
  };

  return (
    <FirebaseContext.Provider value={{ 
      user, 
      loading, 
      signupUserWithEmailAndPassword, 
      loginUserWithEmailAndPassword, 
      logoutUser, 
      putData, 
      getData, 
      signupWithGoogle 
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};
