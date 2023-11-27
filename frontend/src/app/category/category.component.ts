import { Component } from '@angular/core';
import { category } from '../shared/models/category';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  Category?:category[];
  constructor(foodService:FoodService) {
    foodService.getAllCategory().subscribe(serverCategory => {
      this.Category = serverCategory;
    });
   }

  ngOnInit(): void {
  }
}
