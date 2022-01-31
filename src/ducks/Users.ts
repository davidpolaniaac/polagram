import { AnyAction, Dispatch } from "redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { IService } from "../services";
import {IState} from './index';

export interface ILogin {
  email: string;
  password: string;
}

const SET_PROFILE_IMAGE = "users/set-profile-image";

export const setProfileImage = (payload: string) => ({
  payload,
  type: SET_PROFILE_IMAGE,
});

export default function reducer(state = {}, action: AnyAction) {
  switch (action.type) {
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.payload,
      };

    default:
      return state;
  }
  return state;
}

export const login =
  ({ email, password }: ILogin) =>
  async (dispatch: Dispatch, getState: () => IState, { auth }: IService) =>
    await signInWithEmailAndPassword(auth, email, password);

export const register =
  ({ email, password }: ILogin) =>
  async (dispatch: Dispatch, getState: () => IState, { auth, db }: IService) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    const id = user && user.uid;
    const document = doc(db, "users", id);
    await setDoc(document, { role: "user" });
  };

export const loadUserInitialData =
  () =>
  async (dispatch: Dispatch, getState: () => IState, { auth , storage}: IService) => {
    if(!auth.currentUser){
      return;
    }
    const { uid } = auth.currentUser;
    const refImg = ref(storage, `profileImages/${uid}.jpeg`);
    const url = await getDownloadURL(refImg);
    dispatch(setProfileImage(url))
  };

  export const handleProfileImageSubmit =
  (payload: any) =>
  async (
    dispatch: Dispatch,
    getState: () => any,
    { auth, storage }: IService
  ) => {
    if (!auth.currentUser) {
      return;
    }
    const { uid } = auth.currentUser;
    const refImg = ref(storage, `profileImages/${uid}.jpeg`);

    const metadata = {
      contentType: "image/jpeg",
    };

    await uploadBytes(refImg, payload.profileImg, metadata);
    const url = await getDownloadURL(refImg);
    dispatch(setProfileImage(url));
  };
