import { Color } from '@angular-material-components/color-picker';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Buch } from '../buch';
import { InternelService } from '../internel.service';
import { ListsService } from '../lists.service';
import { Message } from '../message.class';

@Component({
  selector: 'lw-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends Message implements OnInit {
  book$ = this.lists.getBook(this.key.replace(':', '/'));

  book: Buch = {} as Buch;
  data = {
    data: 'test',
    color: '#f53206',
  };
  constructor(
    private route: ActivatedRoute,
    private lists: ListsService,
    protected snackbar: MatSnackBar,
    private internal: InternelService
  ) {
    super(snackbar);
    this.book$.subscribe((res) => {
      console.log(res);
      this.book = res;
    });
  }
  get key(): string {
    const id = this.route.snapshot.paramMap.get('key');
    // Unmöglich | Kann nicht eintreffen!
    if (typeof id !== 'string') {
      const stringErr = new Error('Id ist kein String!');
      this.handleError(stringErr, 'Es ist ein unmöglicher Fehler aufgetreten!');
      throw stringErr;
    }
    return id;
  }

  ngOnInit(): void {}
}
