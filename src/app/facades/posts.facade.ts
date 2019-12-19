import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { getPostsSelector, addNewPost, removePost } from '../state/posts.state';
import { IRootState } from '../state';
import { Post } from '../models/post.model';
import { UserFacade } from './user.facade';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostsFacade {
  constructor(private user: UserFacade, private store: Store<IRootState>) {}

  public get posts$(): Observable<Post[]> {
    return this.store.select(getPostsSelector);
  }

  public addNewPost(post: Post): void {
    if (post) {
      this.store.dispatch(addNewPost({ post }));
    }
  }

  public removePost(post: Post): void {
    if (post) {
      this.store.dispatch(removePost({ post }));
    }
  }
}
