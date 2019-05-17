import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Auth Guard
import { AuthGuard } from './services/auth.guard';

// Components
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { EditableProfileComponent } from './components/editable-profile/editable-profile.component';
import { ActivationComponent } from './components/activation/activation.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ad/:id', component: ProfileComponent },
  { path: 'profile/:id', component: EditableProfileComponent, canActivate: [AuthGuard] },
  { path: 'activation/:token', component: ActivationComponent },
  { path: 'change/password/:token', component: RecoveryPasswordComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
