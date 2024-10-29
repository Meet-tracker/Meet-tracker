import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable()
export class ApiService {

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    // Проверяем, есть ли токен при инициализации
    // const token = localStorage.getItem('access_token');
    // if (token) {
    //   this.tokenSubject.next(token);
    // }
  }

  public login(params: any): Observable<any>{
    return this.http.post(`api/login/`, params)
      .pipe(tap((response: any) => {
        // Сохраняем токен в localStorage и BehaviorSubject
        // localStorage.setItem('access_token', response.access_token);
        this.tokenSubject.next(response.access_token);
      }));
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
