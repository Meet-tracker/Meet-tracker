import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { IVideoResponseModel } from '../main/components/list-videos/interfaces/video-response-model.interface';
import { IUserRequestModel } from '../main/components/list-users/interfaces/user-request-model.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _api: string = 'http://localhost:8000';

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private userNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

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
            localStorage.setItem('role_value', response.role);
          }
          this.tokenSubject.next(response.access_token);
          this.userNameSubject.next(params.username);
          this.roleSubject.next(response.role);
        }),
      );
  }

  public isAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('role_value') === 'admin';
    }
    return false;
  }

  // Выход
  public logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    this.tokenSubject.next(null);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${this._api}/admin/users/`);
  }

  // Получаем текущий токен
  public getToken(): string | null {
    return this.tokenSubject.value;
  }

  public getUserName(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('user_name_value');
    }
    return this.userNameSubject.value;
  }

  // Проверка статуса аутентификации
  public isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  public deleteVideo(id: string): Observable<any> {
    return this.http.post(`${this._api}/delete/transcriptions/`, {'id': id});
  }

  public getResult(id: string): Observable<any> {
    try {
      return this.http.post(`${this._api}/result`, {'id': id});
    } catch (error) {
      console.log(error);
      return of('');
    }
  }

  public blockUser(username: string): Observable<any> {
    return this.http.put(`${this._api}/admin/users/${username}/block/`, {});
  }

  public unblockUser(username: string): Observable<any> {
    return this.http.put(`${this._api}/admin/users/${username}/unblock/`, {});
  }

  public addUser(user: IUserRequestModel): Observable<{ message: any }> {
    return this.http.post<{ message: any }>(`${this._api}/admin/users/add/`, user);
  }

  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this._api}/admin/users/${username}/delete/`);
  }

  public makeAdminUser(username: string): Observable<any> {
    return this.http.put(`${this._api}/admin/users/${username}/make_admin/`, {});
  }

  public removeAdminUser(username: string): Observable<any> {
    return this.http.put(`${this._api}/admin/users/${username}/remove_admin/`, {});
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

  public getPrompt(): Observable<{prompt: string}> {
    return this.http.get<{prompt: string}>(`${this._api}/admin/prompt`);
  }
  public postPrompt(prompt: string): Observable<{prompt: string}> {
    return this.http.post<{prompt: string}>(`${this._api}/admin/prompt`, {'prompt': prompt});
  }

  public getWhisper(): Observable<{whisper: string}> {
    return this.http.get<{whisper: string}>(`${this._api}/admin/model/whisper`);
  }
  public postWhisper(whisper: string): Observable<{whisper: string}> {
    return this.http.post<{whisper: string}>(`${this._api}/admin/model/whisper`, {'whisper': whisper});
  }

  public getLLM(): Observable<{llm: string}> {
    return this.http.get<{llm: string}>(`${this._api}/admin/model/llm`);
  }
  public postLLM(llm: string): Observable<{llm: string}> {
    return this.http.post<{llm: string}>(`${this._api}/admin/model/llm`, {'llm': llm});
  }
}
