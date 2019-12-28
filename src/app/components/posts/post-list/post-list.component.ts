import { PostsFacade } from './../../../facades/posts.facade';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() posts: Post[];
  @Output() deletePostEmitter = new EventEmitter<Post>();
  @Output() editPostEmitter = new EventEmitter<Post>();

  constructor(private postsFacade: PostsFacade) {}
}
