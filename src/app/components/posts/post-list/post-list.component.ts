import { PostsFacade } from './../../../facades/posts.facade';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  constructor(private postsFacade: PostsFacade, public router: Router) {}

  editPost(id: string): void {
    this.postsFacade.userIsEditingPost();
    this.router.navigateByUrl(`edit/${id}`);
  }

}
