import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { ProfilsListComponent } from './profils-list/profils-list.component';
import { ProfilsFormComponent } from './profils-list/profils-form/profils-form.component';
import { SingleProfilsComponent } from './profils-list/single-profils/single-profils.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfilService } from './services/profil.service';
import { UserService } from './services/user.service';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { ConversationComponent } from './conversation/conversation.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { NewProfilComponent } from './profils-list/new-profil/new-profil.component';


const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'profils', component: ProfilsListComponent },
  { path: 'new_profil', component: NewProfilComponent },
  { path: 'profils/new', component: ProfilsFormComponent },
  { path: 'profils/view/:id', component: SingleProfilsComponent },
  { path: 'conversation/view/:profilId1/:profilId2', component: ConversationComponent },
  { path: 'users', component: UserListComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    ProfilsListComponent,
    ProfilsFormComponent,
    SingleProfilsComponent,
    ConversationComponent,
    NewUserComponent,
    UserListComponent,
    FourOhFourComponent,
    NewProfilComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false })





  ],
  providers: [AuthService,AuthGuardService,ProfilService,UserService,InMemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
