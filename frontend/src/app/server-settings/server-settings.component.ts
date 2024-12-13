import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../modules/header/header.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule, TuiInputMonthRangeModule, TuiTextareaModule } from '@taiga-ui/legacy';
import { TuiButton } from '@taiga-ui/core';
import { ApiService } from '../services/api.service';
import { take } from 'rxjs';


@Component({
  standalone: true,
  templateUrl: 'server-settings.component.html',
  imports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputMonthRangeModule,
    TuiTextareaModule,
    TuiButton
  ],
  styleUrls: ['server-settings.scss']
})
export class ServerSettingsComponent implements OnInit {
  public loadingWhisper: boolean = false;
  public loadingLLM: boolean = false;
  public loadingPrompt: boolean = false;

  protected readonly serverForm = new FormGroup({
    whisper: new FormControl(),
    llm: new FormControl(),
    prompt: new FormControl(),
  });

  constructor(
    private _apiService: ApiService,
  ) {
  }

  public ngOnInit(): void {
    this.getWhisper();
    this.getLLM();
    this.getPrompt();
  }

  public postWhisper() {
    this.loadingWhisper = true;
    if (this.serverForm.controls.whisper.valid) {
      this._apiService.postWhisper(this.serverForm.controls.whisper.value)
        .subscribe({
          complete: () => {
            this.loadingWhisper = false
          }
        });
    }
  }

  public getWhisper() {
    this._apiService.getWhisper()
      .pipe(take(1))
      .subscribe({
        next: (whisperData: {whisper: string}) => {
          this.serverForm.controls.whisper.setValue(whisperData.whisper);
        }
      });
  }

  public postLLM() {
    this.loadingLLM = true;
    if (this.serverForm.controls.llm.valid) {
      this._apiService.postLLM(this.serverForm.controls.llm.value)
        .subscribe({
          complete: () => {
            this.loadingLLM = false
          }
        });
    }
  }

  public getLLM() {
    this._apiService.getLLM()
      .pipe(take(1))
      .subscribe({
        next: (LLMData: {llm: string}) => {
          this.serverForm.controls.llm.setValue(LLMData.llm);
        }
      });
  }

  public postPrompt() {
    this.loadingPrompt = true;
    if (this.serverForm.controls.prompt.valid) {
      this._apiService.postPrompt(this.serverForm.controls.prompt.value)
        .subscribe({
          complete: () => {
            this.loadingPrompt = false
          }
        });
    }
  }

  public getPrompt() {
    this._apiService.getPrompt()
      .pipe(take(1))
      .subscribe({
        next: (promptData: {prompt: string}) => {
          this.serverForm.controls.prompt.setValue(promptData.prompt);
        }
      });
  }
}
