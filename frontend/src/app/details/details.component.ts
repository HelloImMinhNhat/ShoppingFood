import { CartService } from './../services/cart.service';
import { Food } from './../shared/models/food';
import { FoodService } from './../services/food.service';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  food!: Food;
  constructor(activatedRoute: ActivatedRoute, foodService:FoodService, 
    private CartService:CartService,private router:Router) {
      activatedRoute.params.subscribe((params) => {
        if(params.id)
        foodService.getFoodByID(params.id).subscribe(serverFood => {
          this.food = serverFood;
        });
      })
  }

  ngOnInit(): void {
      
  }

  addToCart(){
    this.CartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
