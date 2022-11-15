import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth"
import {app} from '../firebase/firebase.config'

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const googleSignIn =()=>{
        return signInWithPopup(auth, googleProvider);
    }

    const createUser = (email, password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const updateUserProfile =(userInfo)=>{
        return updateProfile(auth.currentUser, userInfo)
    }
    const loginUser = (email, password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOutUser = ()=>{
        return signOut(auth);
    }

    const forgetPasswordEmail = (email)=>{
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser);
            setUser(currentUser);
            setLoader(false)
        });

        return () => unsubscribe();
    },[])
    const authInfo ={
        googleSignIn,
        createUser,
        updateUserProfile,
        loginUser,
        user,
        logOutUser,
        loader,
        forgetPasswordEmail
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;