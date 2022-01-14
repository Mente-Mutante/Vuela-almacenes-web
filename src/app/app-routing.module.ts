import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './@presentation/pages/login/login.component';
import { OrderComponent } from './@presentation/pages/order/order.component';
import { AuthorizationComponent } from './@presentation/pages/authorization/authorization.component';
import { AdministrationComponent } from './@presentation/pages/administration/administration.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path: 'order', component:OrderComponent},
  {path: 'authorization', component:AuthorizationComponent},
  {path: 'administration', component:AdministrationComponent},
  {path:'',component:OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
