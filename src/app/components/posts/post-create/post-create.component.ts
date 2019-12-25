import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  @Output() newPostEmitter = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const title = form.value.title || '';
    const content = form.value.content || '';
    this.newPostEmitter.emit({ title, content });
    form.resetForm();
  }
}
