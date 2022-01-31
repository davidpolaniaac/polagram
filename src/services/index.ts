import * as firebase from './firebase';

import { Auth } from "firebase/auth";
import { FirebaseStorage } from "firebase/storage";
import { Firestore } from "firebase/firestore";

const services = {
    ...firebase
}

export interface IService {
    db: Firestore,
    storage: FirebaseStorage,
    auth: Auth
}

export default services;