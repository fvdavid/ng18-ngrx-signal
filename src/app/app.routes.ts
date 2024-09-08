import { Routes } from '@angular/router';
import { PostComponent } from './page/post/post.component';
import { PostListingComponent } from './page/post/post-listing/post-listing.component';
import { PostStore } from './page/post/store/post-store';

export const routes: Routes = [
  {
    path: 'posts',
    component: PostComponent,
    providers: [PostStore],
    children: [
      {
        path: '',
        component: PostListingComponent,
      },
    ],
  },
];
