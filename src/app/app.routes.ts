import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { authGuard } from './Guard/auth.guard';
import { AuthComponent } from './Pages/Admin/auth/auth.component';
import { UploadProductComponent } from './Pages/Admin/upload-product/upload-product.component';
import { DashboardsComponent } from './Pages/Admin/dashboards/dashboards.component';
import { adminGuardGuard } from './Guard/Admin/admin-guard.guard';

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
      }
    ]
  }
];
