import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from 'src/app/services/discount.service';
import { Coupon } from 'src/app/shared/models/Coupon';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {

  coupon: Coupon = new Coupon();
  editCouponForm: FormGroup;

  constructor(private router: Router, 
    private discountService: DiscountService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute){


    this.editCouponForm = this.formBuilder.group({
      name: ['', Validators.required],
      discountCode: ['', Validators.required],
      discountPercent: ['', Validators.required]
    });

    const CouponId = this.activatedRoute.snapshot.params['id'];

    this.discountService.getDiscountByID(CouponId).subscribe((response) => {
      this.coupon = response;

      this.editCouponForm.setValue({
        name: this.coupon.name,
        discountCode: this.coupon.discountCode,
        discountPercent: this.coupon.discountPercent
      });
    });
  }
  ngOnInit(): void {
      
  }
  onSubmit() {
    if (this.editCouponForm.invalid) return;

    const updatedCate = { ...this.coupon };

    console.log("Before update: ", updatedCate);
    this.discountService.updateDiscount(this.coupon.id, updatedCate).subscribe(_ => {
      this.router.navigate(['AdminDiscount']);
    });
  }
}
