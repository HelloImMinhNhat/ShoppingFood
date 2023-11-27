import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { FoodService } from 'src/app/services/food.service';
import { category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit{

  Category: category = new category();

  constructor(private activatedRoute: ActivatedRoute,
     private categoryService: CategoryService,
      private foodService: FoodService, 
      private router: Router) {
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.categoryService.create(this.Category).subscribe(_ => {
      this.router.navigate(['AdminCategory']);
    })
  }
}
