import { IPostsState } from './posts.state';
import { Post } from '../models/post.model';
import {
  createReducer,
  createAction,
  props,
  on,
  createSelector
} from '@ngrx/store';
import { IRootState } from '.';

export const setPosts = createAction(
  '[Posts] Set Posts',
  props<{ currentPosts: Post[] }>()
);

export interface IPostsState {
  posts: Post[];
}

export const initialPostsState = {
  posts: []
};

const reducer = createReducer(
  initialPostsState,
  on(setPosts, (state, { currentPosts }) => {
    return {
      ...state,
      posts: [...currentPosts]
    };
  })
);

export function postsReducer(state, action) {
  return reducer(state, action);
}

export const mapToRootState = (state: IRootState): IPostsState => {
  return state.posts;
};

export const mapToPosts = (state: IPostsState): Post[] => {
  return state.posts;
};

export const posts = createSelector(mapToRootState, mapToPosts);
