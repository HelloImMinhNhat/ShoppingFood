import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/Order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentPageComponent implements OnInit {

  order:Order = new Order();
  constructor(orderService: OrderService, router: Router) {
      orderService.getNewOrderForCurrentUser().subscribe({
        next: (order) => {
          this.order = order;
        },
        error:() => {
          router.navigateByUrl('/checkout');
        }
      })

   }

  ngOnInit(): void {
  }

}