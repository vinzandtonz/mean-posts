import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'thestack-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  newPost = '';
  constructor() {}

  ngOnInit() {}
}
