import { PostsService } from './../posts.service';
import { IPost } from '../post.interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'thestack-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: IPost = {
      title: form.value.title,
      content: form.value.content
    };
    this.postsService.addPost(post);
    form.resetForm();
  }
}
