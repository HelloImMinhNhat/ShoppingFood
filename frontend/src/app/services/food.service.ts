import { FOOD_BY_ID_URL, FOOD_CREATE_URL, FOOD_EDIT_BY_ID_URL, FOOD_EDIT_URL } from './../shared/constants/urls';
import { Food } from './../shared/models/food';
import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { category } from '../shared/models/category';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FOOD_BY_CATEGORY_URL, FOOD_CATEGORY_URL, FOOD_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
const FOOD_KEY = 'food';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }
  private foodSubject = new BehaviorSubject<Food>(this.getFoodFromLocalStorage());
  public foodObservable: Observable<Food>;

  create(food: Food): Observable<Food> {
    return this.http.post<Food>(FOOD_CREATE_URL, food).pipe(
      tap({
        next: (food) => {
          this.setFoodToLocalStorage(food);
          this.foodSubject.next(food);
          this.toastrService.success(
            'Thành công',
            `${food.name} đã được thêm `
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Thêm thất bại');
        }
      })
    );
  }
  getEditFood(foodID: string) {
    return this.http.get(FOOD_EDIT_URL + foodID)
  }
  updateFood(foodID: string, food: Food): Observable<Food> {
    return this.http.put<Food>(FOOD_EDIT_BY_ID_URL + foodID, food).pipe(
      tap({
        next: (food) => {
          this.setFoodToLocalStorage(food);
          this.foodSubject.next(food);
          this.toastrService.success(
            `Thành công`,
            `${food.name} đã được chỉnh sửa `
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'sửa thất bại');
        }
      })
    );
  }
  deleteFood(foodID : string): Observable<void> {
    return this.http.delete<void>(FOOD_BY_ID_URL +foodID).pipe(
      tap({
        next: (food) => {
          this.removeFoodFromLocalStorage();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Xóa thất bại');
        }
      })
    );
  }
  private setFoodToLocalStorage(food: Food) {
    localStorage.setItem(FOOD_KEY, JSON.stringify(food));
  }
  private getFoodFromLocalStorage(): Food {
    const userJson = localStorage.getItem(FOOD_KEY);
    if (userJson) return JSON.parse(userJson) as Food;
    return new Food();
  }
  private removeFoodFromLocalStorage() {
    localStorage.removeItem(FOOD_KEY);
  }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOOD_URL);
  }
  getAllCategory(): Observable<category[]> {
    return this.http.get<category[]>(FOOD_CATEGORY_URL);
  }

  getAllFoodByCategory(category: string): Observable<Food[]> {
    return category === 'All' ?
      this.getAll() :
      this.http.get<Food[]>(FOOD_BY_CATEGORY_URL + category);
  }
  getFoodByID(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
  getFoodByIDD(foodId: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOOD_EDIT_BY_ID_URL + foodId);
  }

  getByCateID(cateID: string): Food[] {
    return sample_foods.filter(food => food.CateID === cateID);
  }

}
