import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  categories: category = new category();
  editCateForm: FormGroup;

  constructor(private router: Router, 
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute){


    this.editCateForm = this.formBuilder.group({
      CateID: ['', Validators.required],
      name: ['', Validators.required]
    });

    const CateId = this.activatedRoute.snapshot.params['id'];

    this.categoryService.getCateByID(CateId).subscribe((response) => {
      this.categories = response;

      this.editCateForm.setValue({
        CateID: this.categories.CateID,
        name: this.categories.name
      });
    });
  }
  ngOnInit(): void {
      
  }
  onSubmit() {
    if (this.editCateForm.invalid) return;

    const updatedCate = { ...this.categories };

    console.log("Before update: ", updatedCate);
    this.categoryService.updateCate(this.categories.id, updatedCate).subscribe(_ => {
      this.router.navigate(['AdminCategory']);
    });
  }
}
