import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicRouterOutletComponent } from './basic-router-outlet/basic-router-outlet.component';
import { EditComponent } from './edit/edit.component';
import { FormattedStringComponent } from './formatted-string/formatted-string.component';
import { ListsComponent } from './lists/lists.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { ShowBooksComponent } from './show-books/show-books.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'formattedString', component: FormattedStringComponent },
  {
    path: 'lists',
    component: BasicRouterOutletComponent,
    children: [
      {
        path: ':id',
        component: BasicRouterOutletComponent,
        children: [
          { path: 'edit/:key', component: EditComponent },
          { path: '', component: ShowBooksComponent, pathMatch: 'full' },
        ],
      },
      {
        path: '',
        component: ListsComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
