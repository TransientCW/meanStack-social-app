import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post, PostsFetch } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  url = `${environment.fetchUrl}:${environment.port}/api/posts`;

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  public editPost(post: Post): Observable<{message: string}> {
    return this.http.patch<{message: any}>(this.url, post);
  }

  public fetchPosts(): Observable<PostsFetch> {
    return this.http.get<PostsFetch>(this.url);
  }

  public fetchPost(id: string): Observable<Post> {
    return this.http.get<Post>(this.url + '/' + id);
  }

  public addNewPost(
    post: Post
  ): Observable<PostsFetch> {
    return this.http.post<PostsFetch>(this.url, post);
  }

  public removePost(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(this.url + '/' + id);
  }
}
