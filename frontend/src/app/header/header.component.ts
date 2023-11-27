import { User } from './../shared/models/User';
import { UserService } from './../services/user.service';
import { FoodService } from './../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../services/cart.service';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { category } from '../shared/models/category';
import { Food } from '../shared/models/food';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantity=0;
  Categories: category[] = [];
  user!: User;
  constructor(private CategoryService: CategoryService,private cartservice:CartService,private userService:UserService,private router:Router) {
    let observableCategory = new Observable<category[]>();
    observableCategory = this.CategoryService.getAll()
    observableCategory.subscribe((serverCategory) => {
      this.Categories = serverCategory;
    });
    cartservice.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  }
  
  ngOnInit(): void {
      
  }
  logout(){
    localStorage.setItem('isLoggedOut', 'true');
    this.cartservice.clearCart();
    this.userService.logout();
  }
  get isAuth(){
    return this.user.token;
  }
}
