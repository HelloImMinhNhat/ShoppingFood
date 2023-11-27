import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  returnURL = '/Admin/'
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    this.returnURL = this.activatedRoute.snapshot.queryParams.returnURL;
    const isLoggedOut = localStorage.getItem('isLoggedOut');
    if (isLoggedOut === 'true') {
      this.router.navigate(['/']);
    }
    localStorage.removeItem('isLoggedOut');
  }

  get fc() {
    return this.loginForm.controls;
  }
  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this.userService.login({
      email: this.fc.email.value,
      password: this.fc.password.value
    }).subscribe((user: User) => {
      if (user.isAdmin == true) {
        this.router.navigateByUrl('/AdminFood');
      } else {
        this.router.navigateByUrl(this.returnUrl);
      }
    });

  }
}
