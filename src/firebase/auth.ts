import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"

type FormData = {
    email: string;
    password: string;
};

/*
*Create a new user
 */
export const createUser = ({ email, password }: FormData) => {

    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw error;
        });
}
/*
*Sign in a User
 */
export const signInUser = ({ email, password }: FormData) => {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('this is the user sign in info: ', user)
            // currentUser()
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('This is an error :  ', error)
        });
}

/*
*Get current user
 */

export const currentUser = () => {
    const user = auth.currentUser;
    console.log('This is the user:  ', user)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in:", user);
            //return user info to be used in other pages
            return user;
            // You can set user state here if using React
        } else {
            console.log("User is signed out.");
        }
    });

}