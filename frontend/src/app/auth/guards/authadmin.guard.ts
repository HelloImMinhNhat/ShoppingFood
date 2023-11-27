import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {
    constructor(private userService: UserService, private router: Router,private toastrService: ToastrService) {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.userService.currentUser.isAdmin) { return true; }
        else {
            this.toastrService.error('Bạn không được cấp quyền truy cập trang quản trị viên', 'Lỗi quyền truy cập');
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
            return false;
        }

    }

}
