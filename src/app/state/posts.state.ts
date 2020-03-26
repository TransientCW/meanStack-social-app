import { Post } from '../models/post.model';
import {
  createReducer,
  createAction,
  props,
  on,
  createSelector
} from '@ngrx/store';
import { IRootState } from '.';

export const fetchPosts = createAction('[Posts] Fetch All Posts');

export const fetchPostsSuccess = createAction(
  '[Posts] Fetch All Posts Success',
  props<{ posts: Post[] }>()
);

export const fetchPostsFailure = createAction(
  '[Posts] Fetch All Posts Failure',
  props<{ error: string }>()
);

export const setPosts = createAction(
  '[Posts] Set Posts',
  props<{ currentPosts: Post[] }>()
);

export const addNewPost = createAction(
  '[Posts] Add New Post',
  props<{ post: Post }>()
);

export const editPost = createAction(
  '[Post] Edit Post',
  props<{post: Post}>()
);

export const isEditing = createAction(
  '[Post] Is Editing'
);

export const removePost = createAction(
  '[Post] Remove Post',
  props<{ id: string }>()
);

export const removePostSuccess = createAction(
  '[Post] Remove Post Success',
  props<{ id: string }>()
);

export const removePostFailure = createAction(
  '[Post] Remove Post Failure'
);

export interface IPostsState {
  posts: Post[];
  postIsDeleting: boolean;
  postIsEditing: boolean;
}

export const initialPostsState = {
  posts: [],
  postIsDeleting: false,
  postIsEditing: false
};

const reducer = createReducer(
  initialPostsState,
  on(fetchPostsSuccess, (state, { posts }) => {
    return {
      ...state,
      posts
    };
  }),
  on(setPosts, (state, { currentPosts }) => {
    return {
      ...state,
      posts: currentPosts
    };
  }),
  on(addNewPost, (state, { post }) => {
    return {
      ...state,
      posts: [...state.posts, post]
    };
  }),
  on(removePost, (state) => {
    return {
      ...state,
      postIsDeleting: true
    }
  }),
  on(removePostSuccess, (state) => {
    return {
      ...state,
      postIsDeleting: false
    }
  }),
  on(isEditing, (state) => {
    return {
      ...state,
      postIsEditing: true
    }
  }),
  on(editPost, (state) => {
    return {
      ...state,
      postIsEditing: false
    }
  })
);

// Mapper/Projector functions for use in selectors
export function postsReducer(state, action) {
  return reducer(state, action);
}

export const mapToRootState = (state: IRootState): IPostsState => {
  return state.posts;
};

export const mapToPosts = (state: IPostsState): Post[] => {
  return state.posts;
};

export const mapToIsPostDeleting = (state: IPostsState): boolean => {
  return state.postIsDeleting;
}

export const mapToIsPostEditing = (state: IPostsState): boolean => state.postIsEditing;

// Memoized selector functions
export const getPostsSelector = createSelector(mapToRootState, mapToPosts);
export const getIsPostDeletingSelector = createSelector(mapToRootState, mapToIsPostDeleting);
export const getIsPostEditingSelector = createSelector(mapToRootState, mapToIsPostEditing);
