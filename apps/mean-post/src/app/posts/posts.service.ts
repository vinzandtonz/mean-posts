import { IPost, IPostResponse } from './post.interface';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<IPostResponse>('http://localhost:3000/posts')
      .subscribe(response => {
        console.log('possss', response);
        this.posts = response.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdatedEventListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(postId: string): Observable<any> {
    return this.http.get<IPost>('http://localhost:3000/posts/' + postId);
  }

  addPost(post: IPost) {
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/posts',
        post
      )
      .subscribe(response => {
        post.id = response.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(post: IPost) {
    this.http
      .put<{ message: string }>('http://localhost:3000/posts/' + post.id, post)
      .pipe(
        tap(response => {
          const updatePosts = [...this.posts];
          const updateIndex = updatePosts.findIndex(p => p.id === post.id);
          updatePosts[updateIndex] = post;
          this.posts = updatePosts;
          this.postsUpdated.next([...this.posts]);
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/posts/' + postId)
      .subscribe(response => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
