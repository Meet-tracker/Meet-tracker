import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormControl, Validators } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';

@Component({
  selector: 'content-block',
  templateUrl: 'content-block.component.html',
  styleUrls: ['content-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBlockComponent {

  constructor(
    private _apiService: ApiService
  ) {}
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  public selectedFile: File | null = null;

  protected readonly control = new FormControl<TuiFileLike | null>(
    null,
    Validators.required,
  );

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Отправляем файл на сервер
  public onUpload(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);

      this._apiService.uploadVideo(formData)
        .subscribe(
        (response) => {
          console.log('Upload successful', response);
        },
        (error) => {
          console.error('Upload failed', error);
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
