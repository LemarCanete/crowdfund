import { NextResponse } from 'next/server'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from './src/utils/firebase-config';


// This function can be marked `async` if using `await` inside
export function middleware(request) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // const uid = user.uid;
            console.log("Loggedin")
            console.log(Loggedin, user)
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    });

}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: '/About',
}