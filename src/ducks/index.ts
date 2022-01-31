import { IDataPost } from "./Posts";

export { default as Users } from "./Users";
export { default as Posts } from "./Posts";

export interface IState {
  Posts: {
    data: IDataPost;
    fetched: boolean;
    fetching: boolean;
  };
  Users: {
    profileImage?: string;
  };
}
