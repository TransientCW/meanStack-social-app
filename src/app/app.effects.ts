import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { filter, withLatestFrom, map } from 'rxjs/operators';

import { IRootState } from './state/index';
import { removePost, getPostsSelector, setPosts } from './state/posts.state';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private store: Store<IRootState>) {}

  removePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removePost),
      withLatestFrom(this.store.select(getPostsSelector)),
      filter(([post, posts]) => !!posts && posts.length > 0),
      map(([{ post }, posts]) =>
        posts.filter(p => p.content !== post.content && p.title !== post.title)
      ),
      map(currentPosts => setPosts({ currentPosts }))
    )
  );
}
