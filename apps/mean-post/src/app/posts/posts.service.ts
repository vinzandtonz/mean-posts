import { IPost } from './post.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();

  getPosts(): IPost[] {
    return [...this.posts];
  }

  getPostsUpdatedEventListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: IPost) {
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
