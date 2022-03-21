import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import{UserProfileComponent} from '../components/user-profile/user-profile.component'
const routes: Routes = [
  {path:'', redirectTo:'sign-in', pathMatch:'full'},
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

// @NgModule({
//   declarations: [],
//   imports: [RouterModule.forRoot(routes)],
  
// })

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}