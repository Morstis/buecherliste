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
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { ListsComponent } from './lists/lists.component';
import { emulators } from './emulators';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { GenericSnackbarComponent } from './generic-snackbar/generic-snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ShowBooksComponent } from './show-books/show-books.component';
import { BasicRouterOutletComponent } from './basic-router-outlet/basic-router-outlet.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    ListsComponent,
    GenericSnackbarComponent,
    ShowBooksComponent,
    BasicRouterOutletComponent,
  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [...emulators()],
  bootstrap: [AppComponent],
})
export class AppModule {}
