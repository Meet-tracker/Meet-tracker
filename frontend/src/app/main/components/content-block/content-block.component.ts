import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, EMPTY, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'content-block',
  templateUrl: 'content-block.component.html',
  styleUrls: ['content-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBlockComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  public selectedFile: File | null = null;

  public showVideoResult: boolean = false;
  public videoId: string = '';
  public loading: boolean = false;

  public videoResult: string = '';

  protected readonly control = new FormControl<TuiFileLike | null>(
    null,
    Validators.required,
  );

  constructor(
    private _apiService: ApiService,
    private _route: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.loading = true
    combineLatest([this._route.params, this._route.data])
      .pipe(
        switchMap(([params, data]): Observable<any> => {
          this.showVideoResult = data['showVideo'] ?? false;
          this.videoId = params['id'] ?? '';

          if (this.showVideoResult && this.videoId) {
            return this._apiService.getResult(this.videoId);
          } else {
            this.loading = false;
            return EMPTY;
          }
        }),
      )
      .subscribe({
        next: ((result: any): void => {
          if (result.result === 'False') {
            this.videoResult = 'В обработке';
          } else {
            this.videoResult = result.result;
          }
          this.loading = false;
          this._cdr.detectChanges();
        })
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Отправляем файл на сервер
  public onUpload(): void {
    this.loading = true;
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);

      this._apiService.uploadVideo(formData)
        .subscribe({
            complete: () => {
              this.loading = false;
              this._cdr.detectChanges();
            }
          }
        );
    } else {
      console.warn('No file selected');
    }
  }

  public removeFile(): void {
    this.selectedFile = null;
  }
}
