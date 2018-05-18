import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './types/user';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) {
  }

  addNewUser(user: User) {
    return this.httpClient.post<User>(
      '/api/users',
      user
    );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/api/users');
  }

  deleteUser(userId: number) {
    return this.httpClient.delete(`/api/users/${userId}`);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`/api/users/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(
      `/api/users/${user.id}`,
      user
    );
  }

}
