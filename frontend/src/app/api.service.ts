import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  private apiPath: string = '';

  constructor(private http: HttpClient) {

  }

  public getAdmin(): Observable<any> {
    return this.http.post('api/admin/', {'Я админ': 'админ'});
  }

  public getDatabase(): Observable<any> {
    return this.http.post('api/database/', {'Я бд': 'бд'});
  }

  public getProcessing(): Observable<any> {
    return this.http.post('api/trascribe/', {'Я процесс': 'процесс'});
  }

  public getUser(): Observable<any> {
    return this.http.post('api/user', {'Я юзер': 'юзер'});
  }
}
