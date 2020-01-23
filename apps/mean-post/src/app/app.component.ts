import { IPost } from './posts/post.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'thestack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mean-post';
  posts: IPost[] = [];

  onPostAdded(post: IPost) {
    this.posts.push(post);
  }
}
