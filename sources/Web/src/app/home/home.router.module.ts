
/**
* HomeModule
* routing of the home components based on the account types.
* @package HomeRoutes
* @subpackage app\home\HomeRoutes
* @author SEPA Cyber Technologies, Sayyad M.
*/ 
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/gaurds/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SandboxComponent } from './business/sandbox/sandbox.component';
import { NgModule } from '@angular/core';
import { AddAccountComponent } from './accounts/account-index/add-account.component';
import { ApplicationComponent } from './business/application/bus-application.component';
import { AddMoneyComponent } from './accounts/add-money/add-money.component';
import { ExchangeComponent } from './accounts/exchange/exchange.component';
import { UsersComponent } from './profile/users.component';
import { ApplicationsComponent } from './business/applications/applications.component';
import { PaymentsComponent } from './payments/payments.component';


export const HomeRoutes: Routes = [
    {path:'',component:HomeComponent,
    children:[
    {path:'account-index',component:AddAccountComponent,canActivate:[AuthGuard],data:{userAccount:['Personal']},
    children:[
      {path:'',loadChildren:'src/app/home/accounts/account-index/account-index.module#AccountIndexModule'}]
     },  
    {path:'add-money',component:AddMoneyComponent,canActivate:[AuthGuard],data:{userAccount:['Personal']},
    children:[
      {path:'',loadChildren:'src/app/home/accounts/add-money/add-money.module#AddMoneyModule'}]
      },

    {path:'exchange',component:ExchangeComponent,canActivate:[AuthGuard],data:{userAccount:['Personal']},
    children:[ {path:'',loadChildren:'src/app/home/accounts/exchange/exchange.module#ExchangeModule'}]
     },

     {path:'profile',component:UsersComponent,canActivate:[AuthGuard],data:{userAccount:['Personal']},
    children:[
      {path:'',loadChildren:'src/app/home/profile/users.module#UsersModule'}]
     }, 

     {path:'payments',component:PaymentsComponent,canActivate:[AuthGuard],data:{userAccount:['Personal']},
    children:[
      {path:'',loadChildren:'src/app/home/payments/payments.module#PaymentsModule'}]
     }, 




     {path:'application',component:ApplicationsComponent,canActivate:[AuthGuard],data:{userAccount:['Business']},
     children:[
       {path:'',loadChildren:'src/app/home/business/applications/applications.module#ApplicationsModule'}]
     }, 
     {path:'business-account-index',component:AddAccountComponent,canActivate:[AuthGuard],data:{userAccount:['Business']},
     children:[
       {path:'',loadChildren:'src/app/home/accounts/account-index/account-index.module#AccountIndexModule'}]
      }, 
      {path:'business-add-money',component:AddMoneyComponent,canActivate:[AuthGuard],data:{userAccount:['Business']},
      children:[
        {path:'',loadChildren:'src/app/home/accounts/add-money/add-money.module#AddMoneyModule'}]
      },
      {path:'business-exchange',component:ExchangeComponent,canActivate:[AuthGuard],data:{userAccount:['Business']},
      children:[ {path:'',loadChildren:'src/app/home/accounts/exchange/exchange.module#ExchangeModule'}]
       },
       {path:'payments_tab',component:PaymentsComponent,canActivate:[AuthGuard],data:{userAccount:['Business']},
      children:[
      {path:'',loadChildren:'src/app/home/payments/payments.module#PaymentsModule'}]
       }, 

    {path:'business-application',component:ApplicationComponent,canActivate:[AuthGuard],data:{userAccount:['Business']}},
    {path:'sandbox',component:SandboxComponent,canActivate:[AuthGuard],data:{userAccount:['sandbox']}},
    {path:'error-page',component:ErrorPageComponent},
    ]
   }]
   
@NgModule({
  imports: [RouterModule.forChild(HomeRoutes)],
  exports:[RouterModule]

})
   export class HomeRouterModule { }
