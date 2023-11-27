import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';
import { ConfirmdeleteComponent } from './confirmdelete/confirmdelete.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  foods: Food[] = [];
  food: Food = new Food();

  constructor(
    private foodService: FoodService,
    private modalService: NgbModal,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) {
    let foodObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params) => {
      foodObservable = this.foodService.getAll();


      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }

  ngOnInit(): void {

  }
  confirmDelete(foodId: string) {
    this.foodService.deleteFood(foodId).subscribe(
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
    this.foodService.getAll().subscribe((serverFoods) => {
      this.foods = serverFoods;
    });
  }
  Close() {
    this.modalService.dismissAll();
  }
  openModal(content:any) {
    this.modalService.open(content, { centered: true });
  }

}
