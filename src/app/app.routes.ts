import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { authGuard } from './Guard/auth.guard';
import { AuthComponent } from './Pages/Admin/auth/auth.component';
import { UploadProductComponent } from './Pages/Admin/upload-product/upload-product.component';
import { DashboardsComponent } from './Pages/Admin/dashboards/dashboards.component';
import { adminGuardGuard } from './Guard/Admin/admin-guard.guard';
import { CarDetailsComponent } from './Pages/Car-Details/Car-Details.component';
import { PaymentComponent } from './Pages/payment/payment.component';
import { CategoryComponent } from './Pages/category/category.component';
import { FavouritesComponent } from './Pages/favourites/favourites.component';
import { ProfileComponent } from './Pages/profile/profile.component';

export const routes: Routes = [
  // admin routes
  {
    path:'admin/signup',
    component:AuthComponent
  },
  {
    path:'Upload',
    component:UploadProductComponent
  },
  {
    path:'admin/Dashboard',
    canActivate: [adminGuardGuard],
    component:DashboardsComponent
  },
  // user routes
  {
    path:'',
    redirectTo:'signup',
    pathMatch:'full'
  },
  {
    path:'signup',
    component:LoginComponent
  },
  {
    path:'',
    component:LayoutComponent,
    canActivate:[authGuard],
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'carDetails/:_id',
        component:CarDetailsComponent
      },
      {
        path:'paymentpage/:_id',
        component:PaymentComponent
      },
      {
        path:'category',
        component:CategoryComponent
      },
      {
        path:'favourites',
        component:FavouritesComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      }
    ]
  }
];
