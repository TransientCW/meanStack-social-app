import { postsReducer, IPostsState } from './posts.state';
import { userReducer, IUserState } from './user.state';
import { ActionReducerMap } from '@ngrx/store';

export interface IRootState {
  currentUser: IUserState;
  posts: IPostsState;
}

export const initialState = {
  currentUser: null,
  posts: null
};

export const reducers: ActionReducerMap<IRootState> = {
  currentUser: userReducer,
  posts: postsReducer
};
