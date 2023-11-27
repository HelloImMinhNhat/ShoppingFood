import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { FoodService } from 'src/app/services/food.service';
import { category } from 'src/app/shared/models/category';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  food: Food = new Food();
  categories: category[] = [];
  editFoodForm: FormGroup;
  tagsInput: string = '';
  originsInput: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private router: Router,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    let observableCategory = new Observable<category[]>();

    observableCategory = this.categoryService.getAll()
    observableCategory.subscribe((serverCategory) => {
      this.categories = serverCategory;
    });

    this.editFoodForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      tags: ['', Validators.required],
      imageUrl: ['', Validators.required],
      origins: ['', Validators.required],
      cookTime: ['', Validators.required],
      CateID: ['', Validators.required]
    });

    const foodId = this.activatedRoute.snapshot.params['id'];

    this.foodService.getFoodByID(foodId).subscribe((response) => {
      this.food = response;
      
      this.tagsInput = this.food.tags.join(', ');
      this.originsInput = this.food.origins.join(', ');

      this.editFoodForm.setValue({
        name: this.food.name,
        price: this.food.price,
        tags: this.food.tags,
        imageUrl: this.food.imageUrl,
        origins: this.food.origins,
        cookTime: this.food.cookTime,
        CateID: this.food.CateID
      });
    });
  }

  ngOnInit(): void {
  }
  get fc() {
    return this.editFoodForm.controls;
  }
  onSubmit() {
    if (this.editFoodForm.invalid) return;

    const tagsArray = this.tagsInput.split(',').map(tag => tag.trim());
    const originsArray = this.originsInput.split(',').map(origin => origin.trim());


    const updatedFood = { ...this.food };

    updatedFood.tags = tagsArray;
    updatedFood.origins = originsArray;

    console.log("Before update: ", updatedFood);
    this.foodService.updateFood(this.food.id, updatedFood).subscribe(_ => {
      this.router.navigate(['AdminFood']);
    });
  }
}

