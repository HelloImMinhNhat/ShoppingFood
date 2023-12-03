import { DiscountService } from './../services/discount.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CartItem } from './../shared/models/CartItem';
import { CartService } from './../services/cart.service';
import { Cart } from './../shared/models/Cart';
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Coupon } from '../shared/models/Coupon';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CouponItem } from '../shared/models/CouponItem';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  @ViewChild('couponInput') couponInput: ElementRef;
  cart!: Cart;
  couponform: FormGroup;
  coupon: Coupon[] = [];
  couponItem: CouponItem[] = [];
  tietkiem: number;
  percent: number = 1;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private discountService: DiscountService,
    private couponService: DiscountService,
    private cd: ChangeDetectorRef,
    private toastrService: ToastrService
  ) {
    let CouponObservable: Observable<Coupon[]>;
    activatedRoute.params.subscribe((params) => {
      CouponObservable = this.couponService.getAll();
      CouponObservable.subscribe((serverCoupons) => {
        this.coupon = serverCoupons;
      });
    });
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });

    this.couponform = this.formBuilder.group({
      discountCode: new FormControl(''),
    });

  }

  ngOnInit(): void {
    if (this.cart.couponItem && this.cart.couponItem.length > 0) {
      this.percent = this.cart.couponItem[0].discountPercent;
      this.cart.totalPrice_After = this.cart.totalPrice - this.cart.totalPrice * (this.percent / 100);
    }
    if (this.cart.totalPrice > 1000000){
      const matchedDiscount = this.coupon.find(
        (discount) => discount.discountCode === "1000000Coupon"
      );
      const discountPercent = matchedDiscount.discountPercent / 100;
      this.percent = discountPercent * 100;
      this.cartService.addCouponToCart(matchedDiscount);
      this.cart.totalPrice_After = this.cart.totalPrice - this.cart.totalPrice * (this.percent / 100);
    }
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }
  removeCouponFromCart(couponItem: CouponItem) {
    this.cartService.removeCouponFromCart(couponItem.name);
    this.percent = 1;
    this.tietkiem = 0;
  }
  changeQuantity(
    cartItem: CartItem,
    quantityInString: string,
    percent: number
  ) {
    const quantity = parseInt(quantityInString);

    this.cartService.changeQuantity(cartItem.food.id, quantity, this.percent);
    if(this.percent > 1){
      this.cart.totalPrice_After = this.cart.totalPrice - this.cart.totalPrice * (this.percent / 100);
    }
    if (this.cart.totalPrice > 1000000 && this.cart.totalPrice < 2000000){
      const matchedDiscount = this.coupon.find(
        (discount) => discount.discountCode === "1000000Coupon"
      );
      const discountPercent = matchedDiscount.discountPercent / 100;
      this.percent = discountPercent * 100;
      this.cartService.addCouponToCart(matchedDiscount);
      this.cart.totalPrice_After = this.cart.totalPrice - this.cart.totalPrice * (this.percent / 100);
    }
    if (this.cart.totalPrice > 2000000 ){
      const matchedDiscount = this.coupon.find(
        (discount) => discount.discountCode === "2000000Voucher"
      );
      const discountPercent = matchedDiscount.discountPercent / 100;
      this.percent = discountPercent * 100;
      this.cartService.addCouponToCart(matchedDiscount);
      this.cart.totalPrice_After = this.cart.totalPrice - this.cart.totalPrice * (this.percent / 100);
    }
  }

  submit() {
    if (this.couponform.invalid) return;

    const couponCode = this.couponform.value.discountCode;
    this.couponInput.nativeElement.value = '';
    const matchedDiscount = this.coupon.find(
      (discount) => discount.discountCode === couponCode
    );

    if (matchedDiscount) {
      const discountPercent = matchedDiscount.discountPercent / 100;
      this.percent = discountPercent * 100;
      this.cartService.addCouponToCart(matchedDiscount);
      this.cart.totalPrice_After = this.cart.totalPrice - this.cart.totalPrice * (this.percent / 100);
      this.tietkiem = this.cart.totalPrice - this.cart.totalPrice_After;
    } else {
      this.toastrService.error(
        `Mã ${this.couponform.value.discountCode} không tồn tại`,
        'Thất Bại'
      );
    }
  }
}
