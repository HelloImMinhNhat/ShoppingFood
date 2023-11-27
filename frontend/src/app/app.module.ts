import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DetailsComponent } from './details/details.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { TitleComponent } from './title/title.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CategoryComponent } from './category/category.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { TextInputComponent } from './text-input/text-input.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { InputValidationComponent } from './input-validation/input-validation.component';
import { DefaultButtonComponent } from './default-button/default-button.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderItemsListComponent } from './order-items-list/order-items-list.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaypalButtonComponent } from './paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './order-track-page/order-track-page.component';
import { MapComponent } from './map/map.component';
import { PaymentPageComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './Security/admin/admin.component';
import { FoodComponent } from './Security/admin/food/food.component';
import { UserComponent } from './Security/admin/user/user.component';
import { OrdersComponent } from './Security/admin/orders/orders.component';
import { CategorysComponent } from './Security/admin/categorys/categorys.component';
import { EditComponent } from './Security/admin/Food/edit/edit.component';
import { CreateComponent } from './Security/admin/food/create/create.component';
import { ConfirmdeleteComponent } from './Security/admin/food/confirmdelete/confirmdelete.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateCategoryComponent } from './Security/admin/categorys/create-category/create-category.component';
import { EditCategoryComponent } from './Security/admin/categorys/edit-category/edit-category.component';
import { CreateUserComponent } from './Security/admin/user/create-user/create-user.component';
import { EditUserComponent } from './Security/admin/user/edit-user/edit-user.component';
import { DiscountComponent } from './Security/admin/discount/discount.component';
import { CreateDiscountComponent } from './Security/admin/discount/create-discount/create-discount.component';
import { EditDiscountComponent } from './Security/admin/discount/edit-discount/edit-discount.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DetailsComponent,
    DanhmucComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    CategoryComponent,
    RegisterComponent,
    TextInputComponent,
    InputContainerComponent,
    InputValidationComponent,
    DefaultButtonComponent,
    CheckoutComponent,
    OrderItemsListComponent,
    PaypalButtonComponent,
    OrderTrackPageComponent,
    MapComponent,
    PaymentPageComponent,
    OrderComponent,
    AdminComponent,
    FoodComponent,
    UserComponent,
    OrdersComponent,
    EditComponent,
    CategorysComponent,
    CreateComponent,
    ConfirmdeleteComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CreateUserComponent,
    EditUserComponent,
    DiscountComponent,
    CreateDiscountComponent,
    EditDiscountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    NgxPaginationModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
  ],
  
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
