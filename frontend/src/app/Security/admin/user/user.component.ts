import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() isAdmin = false;

  users : User[] = [];
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute){
    let usersObservable: Observable<User[]>;
    activatedRoute.params.subscribe((params) => {
      usersObservable = this.userService.getAll();
      
      usersObservable.subscribe((serverFoods) => {
        this.users = serverFoods;
      });
    })
    usersObservable = this.userService.getAll();
  }
  ngOnInit(): void {
  }

}
