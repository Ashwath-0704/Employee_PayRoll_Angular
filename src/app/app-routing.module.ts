import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  /* This is the routing configuration. */
  {path:'',redirectTo:'home-page',pathMatch:'full'},
  {path:'home-page',component:HomeComponent},
  {path:'add-user',component:UserComponent},
  {path:'add-user/:id',component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
