import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  @Output() newPostEmitter = new EventEmitter<Post>();

  onAddPost(title: string = '', content: string = '') {
    this.newPostEmitter.emit({ title, content });
  }
}
