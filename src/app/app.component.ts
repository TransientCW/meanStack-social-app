import { Component } from '@angular/core';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts: Post[] = [
    {
      title: 'Post number 1',
      content: 'This is the very first post'
    },
    {
      title: 'Post number 2',
      content: 'This happens to be the second post'
    },
    {
      title: 'Post number 3',
      content: 'And for now, this will be the third post'
    }
  ];

  onAddPost(post: Post) {
    this.posts.push(post);
  }
}
