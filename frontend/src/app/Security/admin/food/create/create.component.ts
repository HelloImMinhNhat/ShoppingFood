import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { FoodService } from 'src/app/services/food.service';
import { category } from 'src/app/shared/models/category';
import { Food } from 'src/app/shared/models/food';
import { IFood } from 'src/app/shared/interfaces/IFood';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  categories: category[] = [];
  food: Food = new Food();

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private foodService: FoodService, private router: Router, private toastr: ToastrService) {
    let observableCategory = new Observable<category[]>();

    observableCategory = this.categoryService.getAll()
    observableCategory.subscribe((serverCategory) => {
      this.categories = serverCategory;
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.foodService.create(this.food).subscribe(_ => {
      this.router.navigate(['AdminFood']);
    })
  }
}
