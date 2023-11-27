import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DiscountService } from 'src/app/services/discount.service';
import { Coupon } from 'src/app/shared/models/Coupon';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit{
  discount: Coupon[] = [];
  constructor(private discountService: DiscountService,private modalService: NgbModal,private toastrService:ToastrService) {
    let observableDiscount = new Observable<Coupon[]>();

    observableDiscount = this.discountService.getAll()
    observableDiscount.subscribe((serverCategory) => {
      this.discount = serverCategory;
    });
  }
  ngOnInit(): void {
      
  }
  confirmDelete(foodId: string) {
    this.discountService.deleteDiscount(foodId).subscribe(
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
    this.discountService.getAll().subscribe((serverDiscount) => {
      this.discount = serverDiscount;
    });
  }
  Close() {
    this.modalService.dismissAll();
  }
  openModal(content:any) {
    this.modalService.open(content, { centered: true });
  }
}
