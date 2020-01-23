import { PostsService } from './../posts.service';
import { IPost } from '../post.interface';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'thestack-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  private postsUpdatedSubscription: Subscription;
  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.postsUpdatedSubscription = this.postService
      .getPostsUpdatedEventListener()
      .subscribe((posts: IPost[]) => (this.posts = posts));
  }

  ngOnDestroy() {
    if (this.postsUpdatedSubscription) {
      this.postsUpdatedSubscription.unsubscribe();
    }
  }
}
