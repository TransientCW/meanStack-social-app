import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  filter,
  withLatestFrom,
  map,
  switchMap,
  catchError,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs';

import {
  removePost,
  getPostsSelector,
  setPosts,
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsFailure,
  addNewPost
} from './posts.state';
import { IRootState } from '.';
import { PostsService } from './../services/posts.service';
import { Post } from '../models/post.model';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IRootState>,
    private postsService: PostsService
  ) {}

  addNewPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewPost),
      map(action => action.post),
      switchMap(post => {
        return this.postsService.addNewPost(post).pipe(
          filter(data => !!data.posts),
          map(data => fetchPostsSuccess({ posts: data.posts })),
          catchError(error => of(fetchPostsFailure({ error })))
        );
      })
    )
  );

  fetchPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPosts),
      switchMap(() => {
        return this.postsService.fetchPosts().pipe(
          tap((posts: Post[]) => console.log('POSTS: ', posts)),
          map((posts: Post[]) => fetchPostsSuccess({ posts })),
          catchError(error => of(fetchPostsFailure({ error })))
        );
      })
    )
  );

  removePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removePost),
      withLatestFrom(this.store.select(getPostsSelector)),
      filter(([, posts]) => !!posts && posts.length > 0),
      map(([{ post }, posts]) => posts.filter(p => p.id !== post.id)),
      map(currentPosts => setPosts({ currentPosts }))
    )
  );
}
