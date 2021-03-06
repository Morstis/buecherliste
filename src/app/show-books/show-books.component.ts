import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { InternelService } from '../internel.service';
import { ListsService } from '../lists.service';
import { Message } from '../message.class';

@Component({
  selector: 'lw-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.scss'],
})
export class ShowBooksComponent extends Message implements OnInit {
  edit$ = this.internal.edit$;
  books$ = this.lists.getAllFromCategory(this.cat);

  constructor(
    private route: ActivatedRoute,
    private lists: ListsService,
    protected snackbar: MatSnackBar,
    private internal: InternelService
  ) {
    super(snackbar);
  }
  get cat(): string {
    const id = this.route.snapshot.paramMap.get('id');
    // Unmöglich | Kann nicht eintreffen!
    if (typeof id !== 'string') {
      const stringErr = new Error('Id ist kein String!');
      this.handleError(stringErr, 'Es ist ein unmöglicher Fehler aufgetreten!');
      throw stringErr;
    }
    return id;
  }
  encode(input: string) {
    return input.replace(/__slash__/g, '/').replace(/__dot__/g, '.');
  }
  ngOnInit(): void {
    this.books$.subscribe((book) => {
      console.log(book);
    });
  }
}
