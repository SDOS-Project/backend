import * as firebase from 'firebase-admin';
export declare class FirebaseApp {
    private firebaseApp;
    constructor();
    getAuth: () => firebase.auth.Auth;
}
