import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.access_token;
    if (token){
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(req).pipe(
      catchError((err) => this.handleAuthError(err) )
    );
  }

  private handleAuthError(
    err: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> {
    if (err.status === 401 || err.status === 403) {
      this.navigateAuth();
      return throwError(err);
    }
    return throwError(err);
  }

  private navigateAuth(){
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
