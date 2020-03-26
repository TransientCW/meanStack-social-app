import { fetchPosts, getIsPostDeletingSelector, editPost, isEditing, getIsPostEditingSelector } from './../state/posts.state';
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

  public get isPostDeleting$(): Observable<boolean> {
    return this.store.select(getIsPostDeletingSelector);
  }

  public get isPostEditing$(): Observable<boolean> {
    return this.store.select(getIsPostEditingSelector);
  }

  public editPost(post: Post): void {
    this.store.dispatch(editPost({post}));
  }

  public userIsEditingPost(): void {
    this.store.dispatch(isEditing());
  }

  public fetchPosts(): void {
    this.store.dispatch(fetchPosts());
  }

  public addNewPost(post: Post): void {
    if (post) {
      this.store.dispatch(addNewPost({ post }));
    }
  }

  public removePost(id: string): void {
    if (id) {
      this.store.dispatch(removePost({ id }));
    }
  }

  // Helper functions outside the store
  
}
