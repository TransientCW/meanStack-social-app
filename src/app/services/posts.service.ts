import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  url = `${environment.fetchUrl}:${environment.port}/api/posts`;

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  public fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  public addNewPost(
    post: Post
  ): Observable<{ message: string; posts: Post[] }> {
    return this.http.post<{ message: string; posts: Post[] }>(this.url, post);
  }
}
