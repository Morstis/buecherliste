import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InternelService } from './internel.service';

@Component({
  selector: 'lw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isChecked = this.internel.edit$;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  change(event: any) {
    console.log(event);
    this.isChecked.next(event.checked);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private internel: InternelService
  ) {}
}
