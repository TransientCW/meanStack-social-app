import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  enteredValue = '';
  post = '';

  onAddPost() {
    this.post = this.enteredValue;
  }
}
