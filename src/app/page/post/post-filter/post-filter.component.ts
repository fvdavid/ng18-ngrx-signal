import { Component, inject } from '@angular/core';
import { PostStore } from '../store/post-store';

@Component({
  selector: 'app-post-filter',
  standalone: true,
  imports: [],
  templateUrl: './post-filter.component.html',
  styleUrl: './post-filter.component.scss'
})
export class PostFilterComponent {

  store = inject(PostStore);

  updateName(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.store.updateFiltersName(newValue);
  }
}
