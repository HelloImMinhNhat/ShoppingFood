import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orders : Order[] = [];
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute){
    let usersObservable: Observable<Order[]>;
    activatedRoute.params.subscribe((params) => {
      usersObservable = this.orderService.getAll();
      
      usersObservable.subscribe((serverFoods) => {
        this.orders = serverFoods;
      });
    })
    usersObservable = this.orderService.getAll();
  }
  ngOnInit(): void {
      
  }

}
