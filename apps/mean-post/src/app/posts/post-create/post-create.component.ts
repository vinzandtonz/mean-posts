import { PostsService } from './../posts.service';
import { IPost } from '../post.interface';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Mode } from '../post.enum';

@Component({
  selector: 'thestack-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  postId: string;
  post: IPost;
  mode = Mode.CREATE;
  isLoading = false;
  constructor(
    public postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(tap(paramMap => this.initialize(paramMap)))
      .subscribe();
  }

  initialize(paramMap: ParamMap) {
    if (paramMap.has('postId')) {
      this.postId = paramMap.get('postId');
      this.postsService
        .getPost(this.postId)
        .pipe(tap(post => (this.post = { ...post })))
        .subscribe();
      this.mode = Mode.EDIT;
    } else {
      this.postId = this.post = null;
      this.mode = Mode.CREATE;
    }
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const post: IPost = {
      id: null,
      title: form.value.title,
      content: form.value.content
    };
    if (this.mode === Mode.CREATE) {
      this.postsService.addPost(post);
    } else {
      post.id = this.postId;
      this.postsService.updatePost(post);
    }
    form.resetForm();
  }
}
