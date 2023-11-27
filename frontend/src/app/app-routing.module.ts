import { CartPageComponent } from './cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { OrderTrackPageComponent } from './order-track-page/order-track-page.component';
import { PaymentPageComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './Security/admin/admin.component';
import { FoodComponent } from './Security/admin/food/food.component';
import { UserComponent } from './Security/admin/user/user.component';
import { OrdersComponent } from './Security/admin/orders/orders.component';
import { CategorysComponent } from './Security/admin/categorys/categorys.component';
import { CreateComponent } from './Security/admin/food/create/create.component';
import { EditComponent } from './Security/admin/Food/edit/edit.component';
import { AuthGuardAdmin } from './auth/guards/authadmin.guard';
import { CreateCategoryComponent } from './Security/admin/categorys/create-category/create-category.component';
import { EditCategoryComponent } from './Security/admin/categorys/edit-category/edit-category.component';
import { CreateDiscountComponent } from './Security/admin/discount/create-discount/create-discount.component';
import { EditDiscountComponent } from './Security/admin/discount/edit-discount/edit-discount.component';
import { DiscountComponent } from './Security/admin/discount/discount.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'search/:searchTerm',component:HomeComponent},
  {path: 'food/:id', component:DetailsComponent},
  {path: 'category/:id', component:DanhmucComponent},
  {path: 'category', component:DanhmucComponent},
  {path: 'cart-page', component:CartPageComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'checkout', component:CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'payment', component:PaymentPageComponent,canActivate: [AuthGuard]},
  {path: 'track/:orderId', component: OrderTrackPageComponent, canActivate:[AuthGuard]},
  {path: 'orders/:id', component:OrderComponent,canActivate: [AuthGuard]},
  {path: 'Admin',component: AdminComponent,canActivate:[AuthGuardAdmin]},
  {path: 'AdminFood',component: FoodComponent,canActivate:[AuthGuardAdmin]},
  {path: 'AdminUser',component: UserComponent,canActivate:[AuthGuardAdmin]},
  {path: 'AdminOrder',component: OrdersComponent,canActivate:[AuthGuardAdmin]},
  {path: 'AdminCategory',component: CategorysComponent,canActivate:[AuthGuardAdmin]},
  {path: 'AdminDiscount',component: DiscountComponent,canActivate:[AuthGuardAdmin]},
  {path: 'createFood',component: CreateComponent,canActivate:[AuthGuardAdmin]},
  {path: 'editFood/:id',component: EditComponent,canActivate:[AuthGuardAdmin]},
  {path: 'createCategory',component: CreateCategoryComponent,canActivate:[AuthGuardAdmin]},
  {path: 'editCategory/:id',component: EditCategoryComponent,canActivate:[AuthGuardAdmin]},
  {path: 'createDiscount',component: CreateDiscountComponent,canActivate:[AuthGuardAdmin]},
  {path: 'editDiscount/:id',component: EditDiscountComponent,canActivate:[AuthGuardAdmin]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
