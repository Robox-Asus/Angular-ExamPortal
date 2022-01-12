import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, JsonpClientBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private login: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = req;
        // add the jwt token from localstorage in request
         const token = this.login.getToken();
        if (token != null) {
            authRequest = authRequest.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            });
        }
        return next.handle(authRequest);
    }
}

export const authInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
]