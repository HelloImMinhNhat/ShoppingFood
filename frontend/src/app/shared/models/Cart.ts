import { CartItem } from "./CartItem";
import { Coupon } from "./Coupon";
import { CouponItem } from "./CouponItem";

export class Cart{
    items: CartItem[] = [];
    couponItem: CouponItem[] = [];
    totalPrice: number = 0;
    totalCount: number = 0;
    discountCode:string;
    disCountPercent: number = 1;
    totalPrice_After: number = 0;
}