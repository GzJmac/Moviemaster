import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Firebase configuration
// Note: In production, these should be in environment variables
const firebaseConfig = {
  apiKey: "AIzaSyDemoKey-Replace-With-Your-Key",
  authDomain: "moviemaster-demo.firebaseapp.com",
  projectId: "moviemaster-demo",
  storageBucket: "moviemaster-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return { user: null, error: error.message };
  }
};

// Sign in with email/password
export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    console.error("Error signing in:", error);
    return { user: null, error: error.message };
  }
};

// Sign up with email/password
export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Create initial user profile
    await createUserProfile(result.user.uid, {
      email: result.user.email,
      createdAt: new Date().toISOString()
    });
    return { user: result.user, error: null };
  } catch (error) {
    console.error("Error signing up:", error);
    return { user: null, error: error.message };
  }
};

// Sign out
export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.error("Error signing out:", error);
    return { error: error.message };
  }
};

// Listen to auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Save user data to Firestore
export const saveUserData = async (userId, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, data, { merge: true });
    return { success: true, error: null };
  } catch (error) {
    console.error("Error saving user data:", error);
    return { success: false, error: error.message };
  }
};

// Get user data from Firestore
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return { data: docSnap.data(), error: null };
    } else {
      return { data: null, error: "No user data found" };
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return { data: null, error: error.message };
  }
};

// Create user profile
export const createUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      likes: [],
      ratings: {},
      watchlist: [],
      watchedMovies: [],
      preferences: {}
    }, { merge: true });
    return { success: true, error: null };
  } catch (error) {
    console.error("Error creating user profile:", error);
    return { success: false, error: error.message };
  }
};
