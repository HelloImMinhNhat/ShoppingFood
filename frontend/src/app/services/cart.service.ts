import { CartItem } from './../shared/models/CartItem';
import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Food } from '../shared/models/food';
import { Observable } from 'rxjs/internal/Observable';
import { Coupon } from '../shared/models/Coupon';
import { CouponItem } from '../shared/models/CouponItem';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  coupon: Coupon[] = [];

  private percentSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(private toastrService: ToastrService) {}

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);

    if (cartItem) return;

    this.cart.items.push(new CartItem(food));
    this.setCartFromLocalStorage();
  }
  
  addCouponToCart(coupon: Coupon): void {
    if (!this.cart) {
      this.cart = new Cart();
    }
    if (!this.cart.couponItem) {
      this.cart.couponItem = [];
    }
    const existingCouponItem = this.cart.couponItem.find(
      (item) => item.name === coupon.name
    );
    if (existingCouponItem) {
      this.toastrService.info(`Mã giảm giá ${coupon.name} đã được áp dụng.`);
    } else {
      const newCouponItem = new CouponItem({
        id: coupon.id,
        name: coupon.name,
        discountCode: coupon.discountCode,
        discountPercent: coupon.discountPercent,
      });

      if (this.cart.couponItem.length > 0) {
        this.cart.couponItem.shift();
      }

      this.cart.couponItem.push(newCouponItem);
      this.toastrService.success(
        `Áp dụng mã giảm giá ${coupon.name} thành công`,
        'Thành công'
      );
      this.setCartFromLocalStorage();
    }
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.setCartFromLocalStorage();
  }
  removeCouponFromCart(name: string): void {
    this.cart.couponItem = this.cart.couponItem.filter(
      (item) => item.coupon.name != name
    );
    this.setCartFromLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number, percent: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) return;
  
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    cartItem.total_price = cartItem.price;
    
    this.percentSubject.next(percent);
  
    this.setCartFromLocalStorage();
  }
  clearCart() {
    this.cart = new Cart();
    this.setCartFromLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartFromLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalPrice_After = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.total_price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  
  private getCartFromLocalStorage(): Cart {
    const CartJson = localStorage.getItem('Cart');
    return CartJson ? JSON.parse(CartJson) : new Cart();
  }
}
