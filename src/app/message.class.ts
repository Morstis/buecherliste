import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericSnackbarComponent } from './generic-snackbar/generic-snackbar.component';

export class Message {
  constructor(protected snackBar: MatSnackBar) {}

  // displays an error message w/ snackbar
  handleError(error: Error, message: string): Observable<never> {
    console.log(error, message); // TODO: add an error catcher

    this.snackBar.openFromComponent(GenericSnackbarComponent, {
      duration: 4000,
      panelClass: ['errorSnackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: { message, icon: 'error' },
    });
    throw error;
  }

  // Displays a success message w/ snackbar
  success(message: string): void {
    this.snackBar.openFromComponent(GenericSnackbarComponent, {
      duration: 4000,
      panelClass: ['successSnackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: { message, icon: 'done' },
    });
  }
}
