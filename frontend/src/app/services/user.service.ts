import { USER_EDIT_BY_ID_URL, USER_URL } from './../shared/constants/urls';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
    new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(USER_URL);
  }
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Chào mừng đến với ShoppingFood ${user.name}!`,
            'Đăng nhập thành công'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Đăng nhập thất bại');
        }
      })
    );
  }

  register(userRegiser: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Chào mừng đến với ShoppingFood ${user.name}`,
            'Đăng ký thành công'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Đăng ký thất bại')
        }
      })
    )
  }
  create(userRegiser: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `${user.name} Đã được tạo`,
            'Tạo người dùng thành công'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Tạo người dùng thất bại')
        }
      })
    )
  }
  updateFood(UserID: string, user: User): Observable<User> {
    return this.http.put<User>(USER_EDIT_BY_ID_URL + UserID, user).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Thành công`,
            `${user.name} đã được chỉnh sửa `
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'sửa thất bại');
        }
      })
    );
  }
  deleteFood(UserID : string): Observable<void> {
    return this.http.delete<void>(USER_URL + UserID).pipe(
      tap({
        next: (user) => {
          this.removeUserFromLocalStorage();
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Xóa thất bại');
        }
      })
    );
  }
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
  private removeUserFromLocalStorage() {
    localStorage.removeItem(USER_KEY);
  }

}
