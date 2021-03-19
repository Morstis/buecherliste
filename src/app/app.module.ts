import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { ListsComponent } from './lists/lists.component';
import { emulators } from './emulators';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { GenericSnackbarComponent } from './generic-snackbar/generic-snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ShowBooksComponent } from './show-books/show-books.component';
import { BasicRouterOutletComponent } from './basic-router-outlet/basic-router-outlet.component';
import {
  NgxMatColorPickerModule,
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';
import { EditComponent } from './edit/edit.component';
import { FormattedStringComponent } from './formatted-string/formatted-string.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentEditableFormDirective } from './content-editable-form.directive';
import { TagchooserComponent } from './tagchooser/tagchooser.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    ListsComponent,
    GenericSnackbarComponent,
    ShowBooksComponent,
    BasicRouterOutletComponent,
    EditComponent,
    FormattedStringComponent,
    ContentEditableFormDirective,
    TagchooserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatCardModule,
    MatSlideToggleModule,
    NgxMatColorPickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [
    ...emulators(),
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
