import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from 'src/app/services/discount.service';
import { Coupon } from 'src/app/shared/models/Coupon';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.css']
})
export class CreateDiscountComponent {

  coupon: Coupon = new Coupon();

  constructor(private activatedRoute: ActivatedRoute,
     private discountService: DiscountService,
      private router: Router) {
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.discountService.createDiscount(this.coupon).subscribe(_ => {
      this.router.navigate(['AdminDiscount']);
    })
  }
}
