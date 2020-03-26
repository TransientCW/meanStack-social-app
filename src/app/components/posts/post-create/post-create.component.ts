import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { PostsFacade } from 'src/app/facades/posts.facade';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  @ViewChild('postForm', {static: true}) form: NgForm;
  singlePostSub: Subscription;
  currentId: string;

  constructor(private router: Router, public postsFacade: PostsFacade, public route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('postId')) {
        this.singlePostSub = this.postsService.fetchPost(paramMap.get('postId')).subscribe(value => {
          const post: Post = value['post'];      
          this.form.controls['title'].setValue(post.title);
          this.form.controls['content'].setValue(post.content);
          this.currentId = post.id;
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.singlePostSub && !this.singlePostSub.closed) {
      this.singlePostSub.unsubscribe();
    }
  }

  onAddPost(isEdit: boolean = false) {
    if (this.form.invalid) {
      return;
    }
    const title = this.form.value.title || '';
    const content = this.form.value.content || '';
    if (!isEdit) {
      console.log('adding new post: ', title, ' || ', content);
      this.postsFacade.addNewPost({title, content});
    }
    else {
      console.log('editing post');
      this.postsFacade.editPost({title, content, id: this.currentId});
    }
    
    this.form.resetForm();
    this.router.navigateByUrl('/');
  }
}
