import { TUI_ICON_RESOLVER, TuiRoot } from "@taiga-ui/core";
import { Component, SkipSelf } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot],
  providers: [
    ApiService,
    {
      provide: TUI_ICON_RESOLVER,
      deps: [[new SkipSelf(), TUI_ICON_RESOLVER]],
      useFactory(defaultResolver: TuiStringHandler<string>) {
        return (name: string) =>
          name.startsWith('@tui.')
            ? defaultResolver(name)
            : `/assets/icons/${name}.svg`;
      },
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'

})
export class AppComponent {
  title = 'frontend';
}
