import { Injectable } from '@angular/core';
import { category } from '../shared/models/category';
import { sample_category_food } from 'src/data';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CATEGORY_BY_ID_URL, CATEGORY_CREATE_URL, CATEGORY_EDIT_BY_ID_URL, CATEGORY_URL } from '../shared/constants/urls';
const CATEGORY_KEY = '';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  private cateSubject = new BehaviorSubject<category>(this.getCateFromLocalStorage());
  public categoryObservable: Observable<category>;

  getAll(): Observable<category[]> {
    return this.http.get<category[]>(CATEGORY_URL);
  }
  getCateByID(CateId: string): Observable<category> {
    return this.http.get<category>(CATEGORY_BY_ID_URL + CateId);
  }
  getCateByIDD(CateId: string): Observable<category[]> {
    return this.http.get<category[]>(CATEGORY_EDIT_BY_ID_URL + CateId);
  }

  create(Category: category): Observable<category> {
    return this.http.post<category>(CATEGORY_CREATE_URL, Category).pipe(
      tap({
        next: (Category) => {
          this.setCateToLocalStorage(Category);
          this.cateSubject.next(Category);
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
  updateCate(CateID: string, Category: category): Observable<category> {
    return this.http.put<category>(CATEGORY_EDIT_BY_ID_URL + CateID, Category).pipe(
      tap({
        next: (food) => {
          this.setCateToLocalStorage(Category);
          this.cateSubject.next(Category);
          this.toastrService.success(
            `Thành công`,
            `${Category.name} đã được chỉnh sửa `
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'sửa thất bại');
        }
      })
    );
  }
  deleteCate(CateID : string): Observable<void> {
    return this.http.delete<void>(CATEGORY_BY_ID_URL +CateID).pipe(
      tap({
        next: (Category) => {
          this.removeCateFromLocalStorage();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Xóa thất bại');
        }
      })
    );
  }

  private setCateToLocalStorage(Category: category) {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(Category));
  }
  private getCateFromLocalStorage(): category {
    const userJson = localStorage.getItem(CATEGORY_KEY);
    if (userJson) return JSON.parse(userJson) as category;
    return new category();
  }
  private removeCateFromLocalStorage() {
    localStorage.removeItem(CATEGORY_KEY);
  }

}
