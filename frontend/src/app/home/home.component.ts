import { ActivatedRoute } from '@angular/router';
import { FoodService } from './../services/food.service';
import { Food } from './../shared/models/food';
import { Component, OnInit, NgModule } from '@angular/core';
import { CategoryService } from './../services/category.service';
import { category } from '../shared/models/category';
import { sample_foods } from 'src/data';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  categories: category[] = [];
  foods: Food[] = [];
  food1: Food[] = [];
  food2: Food[] = [];
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute, private categoryService: CategoryService) {

    let foodObservable: Observable<Food[]>;
    let foodObservable1: Observable<Food[]>;
    let foodObservable2: Observable<Food[]>;
    let observableCategory = new Observable<category[]>();


    activatedRoute.params.subscribe((params) => {
      foodObservable1 = this.foodService.getAllFoodByCategory('2');

      foodObservable1.subscribe((serverFoods) => {
        this.food1 = serverFoods;
      });
    })
    activatedRoute.params.subscribe((params) => {
      foodObservable2 = this.foodService.getAllFoodByCategory('3');

      foodObservable2.subscribe((serverFoods) => {
        this.food2 = serverFoods;
      });
    })
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        foodObservable = this.foodService.getAllFoodByCategory(params.id);
      else
        foodObservable = this.foodService.getAll();


      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    })
    observableCategory = this.categoryService.getAll()
    observableCategory.subscribe((serverCategory) => {
      this.categories = serverCategory;
    });
  }
  currentproduct = 0;
  currentProductIndex = 0;
  maxVisibleProducts = 3;
  isLastProduct: boolean = false;

  currentProductIndexx = 0;
  maxVisibleProducts1 = 3;
  isLastProduct1: boolean = false;

  currentProductIndexxx = 0;
  maxVisibleProducts2 = 3;
  isLastProduct2: boolean = false;
  changeProductfoods(increment: number) {
    const newIndex = this.currentProductIndex + increment;
    if (newIndex >= 0 && newIndex <= this.foods.length - this.maxVisibleProducts) {
      this.currentProductIndex = newIndex;
      this.isLastProduct = newIndex === this.foods.length - this.maxVisibleProducts;
    }
  }
  changeProductfoodsCT1(increment: number) {
    const newIndex1 = this.currentProductIndexx + increment;
    if (newIndex1 >= 0 && newIndex1 <= this.food1.length - this.maxVisibleProducts1) {
      this.currentProductIndexx = newIndex1;
      this.isLastProduct1 = newIndex1 === this.food1.length - this.maxVisibleProducts1;
    }
  }
  changeProductfoodsCT3(increment: number) {
    const newIndex2 = this.currentProductIndexxx + increment;
    if (newIndex2 >= 0 && newIndex2 <= this.food2.length - this.maxVisibleProducts2) {
      this.currentProductIndexxx = newIndex2;
      this.isLastProduct2 = newIndex2 === this.food2.length - this.maxVisibleProducts2;
    }
  }
  ngOnInit() {
  }
}
