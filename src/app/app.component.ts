import { PostsFacade } from './facades/posts.facade';
import { Component, OnInit } from '@angular/core';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private postsFacade: PostsFacade) {}

  ngOnInit() {
    this.postsFacade.fetchPosts();
  }
}
