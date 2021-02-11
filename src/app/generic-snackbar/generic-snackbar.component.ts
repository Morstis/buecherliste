import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'lw-generic-snackbar',
  templateUrl: './generic-snackbar.component.html',
  styleUrls: ['./generic-snackbar.component.scss'],
})
export class GenericSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; icon: string },
    private snackBarRef: MatSnackBarRef<GenericSnackbarComponent>
  ) {}

  dismiss() {
    this.snackBarRef.dismiss();
  }
}
