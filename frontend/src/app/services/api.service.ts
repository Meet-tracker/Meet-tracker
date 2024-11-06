import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';


@Injectable()
export class ApiService {

  private readonly _api: string = 'http://localhost:8000';

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.tokenSubject.next(token);
      }
    }
  }

  public login(params: any): Observable<any>{
    return this.http.post(`${this._api}/login`, params)
      .pipe(tap((response: any) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('access_token', response.access_token);
        }
        this.tokenSubject.next(response.access_token);
      }));
  }

  // Выход
  public logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    this.tokenSubject.next(null);
  }

  // Получаем текущий токен
  public getToken(): string | null {
    return this.tokenSubject.value;
  }

  // Проверка статуса аутентификации
  public isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  public getAdmin(): Observable<any> {
    return this.http.post(`${this._api}/admin/`, {'Я админ': 'админ'}).pipe(
      catchError((err: any): Observable<never> => {
        console.log(err)
        return of()
      })
    );
  }

  public getDatabase(): Observable<any> {
    return this.http.post(`${this._api}/database/`, {'Я бд': 'бд'});
  }

  public getProcessing(): Observable<any> {
    return this.http.post(`${this._api}/trascribe/`, {'Я процесс': 'процесс'});
  }

  public getUser(): Observable<any> {
    return this.http.post(`${this._api}/user`, {'Я юзер': 'юзер'});
  }

  public getResult(id: string): Observable<any> {
    try {
      return this.http.post(`${this._api}/result`, {'id': id});
    }
    catch (error) {
      console.log(error);
      return of('');
    }
  }

  public uploadVideo(formData: FormData): Observable<any> {
    return this.http.post(`${this._api}/upload`, formData).pipe(
      catchError((error: any) => {
        console.error('Upload failed:', error);
        return of({ error: 'Upload failed', details: error });
      })
    );

  }
}
