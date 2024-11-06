import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';

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
  fileUrl: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileUrl = URL.createObjectURL(this.selectedFile);
    }
  }


  public triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // Отправляем файл на сервер
  onUpload(): void {
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
}
