import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersService} from './users.service';
import {RouterModule, Routes} from '@angular/router';
import {NewUserFormComponent} from './new-user-form/new-user-form.component';
import {FormsModule} from '@angular/forms';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: 'new',
    component: NewUserFormComponent
  },
  {
    path: 'users/:id/edit',
    component: EditUserFormComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    NewUserFormComponent,
    EditUserFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
