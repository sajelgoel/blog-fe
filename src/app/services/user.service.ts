import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  URL: string = 'https://jsonplaceholder.typicode.com';

  userDetails$ = this.http
    .get<User[]>(`${this.URL}/users`)
    .pipe(catchError(this.errorHandler));

  getPosts(val) {
    return this.http
      .get(`${this.URL}/posts?userId=${val}&skip=0&limit=10`)
      .pipe(catchError(this.errorHandler));
  }

  getPost(userId, id) {
    return this.http
      .get(`${this.URL}/posts?userId=${userId}&id=${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getComments(postId) {
    return this.http
      .get(`${this.URL}/posts/${postId}/comments`)
      .pipe(catchError(this.errorHandler));
  }

  deletePost(id) {
    return this.http.delete(`${this.URL}/posts/${id}`).pipe(
      map((val) => 'ok'),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = 'There is some error please try again after sometime'; //`Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
