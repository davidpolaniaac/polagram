import { AnyAction, Dispatch } from "redux";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getBlob, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { IService } from "../services";
import { IState } from "./index";

const START = "posts/fetch-start";
const SUCCESS = "posts/fetch-success";
const ERROR = "posts/fetch-error";
const ADD = "posts/add";

export interface IPost {
  comment: string;
  userId: string;
  createAt: Timestamp;
  imageURL: string;
}

export interface IDataPost {
  [key: string]: IPost;
}

const fetchStart = () => ({
  type: START,
});

const fetchSuccess = (payload: IDataPost) => ({
  type: SUCCESS,
  payload,
});

const fetchError = (error: any) => ({
  type: ERROR,
  error,
});

const add = (payload: IDataPost) => ({
  type: ADD,
  payload,
});

const initialState = {
  data: {},
  IDataPost: false,
  fetching: false,
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case START:
      return {
        ...state,
        fetching: true,
      };
    case SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetched: true,
        fetching: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false,
      };
    case ADD:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export const fetchPosts =
  () =>
  async (
    dispatch: Dispatch,
    getState: () => IState,
    { db, storage }: IService
  ) => {
    dispatch(fetchStart());
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts: any = {};
      querySnapshot.forEach((doc) => (posts[doc.id] = doc.data()));
      const imgIds = await Promise.all(
        Object.keys(posts).map(async (x) => {
          const refImg = ref(storage, `posts/${x}.jpeg`);
          const url = await getDownloadURL(refImg);
          return [x, url];
        })
      );
      const keyedImages: any = {};
      imgIds.forEach((x) => (keyedImages[x[0]] = x[1]));
      Object.keys(posts).forEach(
        (x) =>
          (posts[x] = {
            ...posts[x],
            imageURL: keyedImages[x],
          })
      );
      dispatch(fetchSuccess(posts));
    } catch (error) {
      console.log(error);
      dispatch(fetchError(error));
    }
  };

export const like =
  (id: string) =>
  async (dispatch: Dispatch, getState: () => IState, { auth }: IService) => {
    if (!auth.currentUser) {
      return;
    }
    const token = await auth.currentUser?.getIdToken();
    await fetch(`/api/posts/${id}/like`, {
      headers: {
        authorization: token,
      },
    });
  };

export const share =
  (id: string) =>
  async (
    dispatch: Dispatch,
    getState: () => IState,
    { auth, db, storage }: IService
  ) => {
    if (!auth.currentUser) {
      return;
    }
    const token = await auth.currentUser?.getIdToken();
    const result = await fetch(`/api/posts/${id}/share`, {
      headers: {
        authorization: token,
      },
    });

    const refImg = ref(storage, `posts/${id}.jpeg`);
    const blob = await getBlob(refImg);
    const metadata = {
      contentType: "image/jpeg",
    };
    //const url = await getDownloadURL(refImg);
    //const blob: any = download(url);

    const { id: postId }: { id: string } = await result.json();

    const refNewImg = ref(storage, `posts/${postId}.jpeg`);
    await uploadBytes(refNewImg, blob, metadata);
    const imageURL = await getDownloadURL(refNewImg);
    const snap = await getDoc(doc(db, "posts", postId));

    dispatch(
      add({
        [snap.id]: {
          ...snap.data(),
          imageURL,
        },
      } as IDataPost)
    );
  };


