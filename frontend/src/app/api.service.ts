import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class ApiService {

  private apiPath: string = '';

  constructor(private http: HttpClient) {

  }

  public getAdmin(): Observable<any> {
    return this.http.post('api/admin/', {'Я админ': 'админ'}).pipe(
      catchError((err: any): Observable<never> => {
        console.log(err)
        return of()
      })
    );
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
