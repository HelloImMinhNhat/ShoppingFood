import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export class CategorysComponent implements OnInit{
  categories: category[] = [];
  constructor(private categoryService: CategoryService,private modalService: NgbModal,private toastrService:ToastrService) {
    let observableCategory = new Observable<category[]>();

    observableCategory = this.categoryService.getAll()
    observableCategory.subscribe((serverCategory) => {
      this.categories = serverCategory;
    });
  }
  ngOnInit(): void {
      
  }
  confirmDelete(foodId: string) {
    this.categoryService.deleteCate(foodId).subscribe(
      () => {
        this.modalService.dismissAll();
        this.toastrService.success('Xóa sản phẩm thành công', 'Thành công');
        this.refreshFoodList();
      },
      (error) => {
        console.error(error);
        this.toastrService.error('Xóa sản phẩm thất bại', 'Lỗi');
      }
    );
  }

  refreshFoodList() {
    this.categoryService.getAll().subscribe((serverCategories) => {
      this.categories = serverCategories;
    });
  }
  Close() {
    this.modalService.dismissAll();
  }
  openModal(content:any) {
    this.modalService.open(content, { centered: true });
  }

}