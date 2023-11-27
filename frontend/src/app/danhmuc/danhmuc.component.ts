import { CartService } from './../services/cart.service';
import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from './../services/food.service';
import { Food } from './../shared/models/food';
import { category } from './../shared/models/category';

@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css']
})
export class DanhmucComponent implements OnInit {
  foods: Food[] = [];
  categories: category[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router:Router
   ) {
   let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.id)
        foodsObservable = this.foodService.getAllFoodByCategory(params.id);
      else
        foodsObservable = this.foodService.getAll();

        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
    })
    
  }

  ngOnInit() {
  }
}
