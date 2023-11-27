import { COUPON_BY_ID_URL, COUPON_BY_NAME_URL, COUPON_CREATE_URL, COUPON_EDIT_BY_ID_URL, COUPON_URL } from '../shared/constants/urls';
import { Injectable } from '@angular/core';
import { getLocaleCurrencyCode } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Coupon } from '../shared/models/Coupon';
import { ToastrService } from 'ngx-toastr';
const COUPON_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  constructor(private http:HttpClient,private toastrService: ToastrService) { }

  private couponSubject = new BehaviorSubject<Coupon>(this.getCouponFromLocalStorage());
  public couponObservable: Observable<Coupon>;

  getAll():Observable<Coupon[]> {
    return this.http.get<Coupon[]>(COUPON_URL);
  }

  getDiscountByID(id: string): Observable<Coupon>{
    return this.http.get<Coupon>(COUPON_BY_ID_URL + id);
  }

  getDiscountCode(Name: string): Observable<Coupon>{
    return this.http.get<Coupon>(COUPON_BY_NAME_URL + Name);
  }
  createDiscount(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(COUPON_CREATE_URL, coupon).pipe(
      tap({
        next: (Category) => {
          this.setCouponToLocalStorage(Category);
          this.couponSubject.next(Category);
          this.toastrService.success(
            'Thành công',
            `${Category.name} đã được thêm `
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Thêm thất bại');
        }
      })
    );
  }
  updateDiscount(CouponID: string, coupon: Coupon): Observable<Coupon> {
    return this.http.put<Coupon>(COUPON_EDIT_BY_ID_URL + CouponID, coupon).pipe(
      tap({
        next: (food) => {
          this.setCouponToLocalStorage(coupon);
          this.couponSubject.next(coupon);
          this.toastrService.success(
            `Thành công`,
            `${coupon.name} đã được chỉnh sửa `
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'sửa thất bại');
        }
      })
    );
  }
  deleteDiscount(CouponID : string): Observable<void> {
    return this.http.delete<void>(COUPON_BY_ID_URL +CouponID).pipe(
      tap({
        next: (Category) => {
          this.removeCouponFromLocalStorage();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Xóa thất bại');
        }
      })
    );
  }
  private setCouponToLocalStorage(coupon: Coupon) {
    localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
  }
  private getCouponFromLocalStorage(): Coupon {
    const couponJson = localStorage.getItem(COUPON_KEY);
    if (couponJson) return JSON.parse(couponJson) as Coupon;
    return new Coupon();
  }
  private removeCouponFromLocalStorage() {
    localStorage.removeItem(COUPON_KEY);
  }
}

