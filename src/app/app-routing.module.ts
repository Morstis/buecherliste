import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicRouterOutletComponent } from './basic-router-outlet/basic-router-outlet.component';
import { ListsComponent } from './lists/lists.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { ShowBooksComponent } from './show-books/show-books.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'lists',
    component: BasicRouterOutletComponent,
    children: [
      { path: ':id', component: ShowBooksComponent },
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
