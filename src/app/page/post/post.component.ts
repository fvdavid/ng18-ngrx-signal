import { Component, inject } from '@angular/core';
import { PostStore } from './store/post-store';
import { PostFilterComponent } from './post-filter/post-filter.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    PostFilterComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  store = inject(PostStore);

  constructor() {}
}
