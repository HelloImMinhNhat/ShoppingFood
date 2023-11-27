import { Coupon } from "./Coupon";

export class CouponItem{
    constructor(public coupon: Coupon){}
    name:string = this.coupon.name;
    discountPercent: number = this.coupon.discountPercent;
}