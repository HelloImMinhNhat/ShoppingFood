import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '../shared/models/Order';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) {
    let ordersObservable: Observable<Order[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        ordersObservable = this.orderService.getTrackByUser(params.id);
      else
        ordersObservable = this.orderService.getAll();
      
      ordersObservable.subscribe((serverFoods) => {
        this.orders = serverFoods;
      });
    })
    

  }
  ngOnInit(): void {

  }
}
