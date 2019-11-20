import { User } from '../models/user.model';
import { createReducer, createAction, props, on } from '@ngrx/store';

export const setUser = createAction(
  '[User] Set User',
  props<{ currentUser: User }>()
);

export const setIsLoggedIn = createAction(
  '[User] User Logged In',
  props<{ isLoggedIn: boolean }>()
);

export interface IUserState {
  currentUser: User;
  isLoggedIn: boolean;
}

export const initialUserState = {
  currentUser: null,
  isLoggedIn: false
};

const reducer = createReducer(
  initialUserState,
  on(setIsLoggedIn, (state, { isLoggedIn }) => {
    return {
      ...state,
      isLoggedIn
    };
  }),
  on(setUser, (state, { currentUser }) => {
    return {
      ...state,
      ...currentUser
    };
  })
);

export function userReducer(state, action) {
  return reducer(state, action);
}
