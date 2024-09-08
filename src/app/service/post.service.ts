import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../model/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  #http = inject(HttpClient);

  constructor() { }

  #createHttpParams(page: number, pageSize: number) {
    return new HttpParams({
      fromObject: {
        _limit: pageSize,
        page: page
      }
    })
  }

  fetchPost(page: number = 1, pageSize = 10) {
    const fv = this.#http.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
      params: this.#createHttpParams(page, pageSize)
    });
    return fv;
  }
}
