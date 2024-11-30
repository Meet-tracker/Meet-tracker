import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { IVideoResponseModel } from '../main/components/list-videos/interfaces/video-response-model.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _api: string = 'http://localhost:8000';

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private userNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      const userName = localStorage.getItem('user_name_value');
      if (token) {
        this.tokenSubject.next(token);
      }

      if (userName) {
        this.userNameSubject.next(userName);
      }
    }
  }

  public login(params: any): Observable<any> {
    return this.http.post(`${this._api}/login/`, params)
      .pipe(
        tap((response: any) => {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user_name_value', params.username);
          }
          this.tokenSubject.next(response.access_token);
          this.userNameSubject.next(params.username);
        }),

      );
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

  public getUserName(): string | null {
    return this.userNameSubject.value;
  }

  // Проверка статуса аутентификации
  public isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  public getResult(id: string): Observable<any> {
    try {
      return this.http.post(`${this._api}/result`, {'id': id});
    } catch (error) {
      console.log(error);
      return of('');
    }
  }

  public getListVideos(): Observable<IVideoResponseModel[]> {
    return this.http.get<IVideoResponseModel[]>(`${this._api}/user/transcriptions/`)
  }

  public uploadVideo(formData: FormData): Observable<any> {
    return this.http.post(`${this._api}/upload`, formData).pipe(
      catchError((error: any) => {
        console.error('Upload failed:', error);
        return of({error: 'Upload failed', details: error});
      })
    );

  }
}
