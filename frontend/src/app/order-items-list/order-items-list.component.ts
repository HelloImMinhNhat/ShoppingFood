import { Component, OnInit,Input } from '@angular/core';
import { Order } from '../shared/models/Order';
import { Coupon } from '../shared/models/Coupon';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent implements OnInit {

  @Input() 
  order!:Order;
  coupon!:Coupon;
  constructor(){

  }
  ngOnInit(): void {
      
  }
}
