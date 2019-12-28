import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  filter,
  withLatestFrom,
  map,
  switchMap,
  catchError,
  tap,
  mergeMap
} from 'rxjs/operators';
import { of, iif, defer } from 'rxjs';

import {
  removePost,
  getPostsSelector,
  setPosts,
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsFailure,
  addNewPost,
  removePostSuccess,
  removePostFailure
} from './posts.state';
import { IRootState } from '.';
import { PostsService } from './../services/posts.service';
import { Post, PostsFetch } from '../models/post.model';

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
          map((data: PostsFetch) => data.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          })),
          map(posts => fetchPostsSuccess({ posts })),
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
          map((data: PostsFetch) => data.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            }
          })),
          map(posts => fetchPostsSuccess({posts})),
          catchError(error => of(fetchPostsFailure({error})))
        );
      })
    )
  );

  removePost$ = createEffect(() => 
      this.actions$.pipe(
        ofType(removePost),
        switchMap(({id}) => {
          return this.postsService.removePost(id).pipe(
            map((message) => ({...message, id})),
            switchMap((values) => {
              return iif(
                () => values.message === 'Delete success',
                of(removePostSuccess({id: values.id})),
                of(removePostFailure())
              )
            })
          )
        })
      )
  );

  removePostSuccess$ = createEffect(() =>
        this.actions$.pipe(
          ofType(removePostSuccess),
          withLatestFrom(this.store.select(getPostsSelector)),
          filter(([, posts]) => !!posts && posts.length > 0),
          map(([{id},posts]) => ({filtered: posts.filter(p => p.id !== id)})),
          map(({filtered}) => setPosts({currentPosts: filtered}))
        )
  );
}
