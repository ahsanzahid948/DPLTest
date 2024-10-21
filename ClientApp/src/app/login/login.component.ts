import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import {Config} from '../../config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin?: boolean;
  url = "https://localhost:7021/api";
  constructor(private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService,
    private toastr: ToastrService)
  {

  }
  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);
    this.http.post(this.url + "/Account/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.toastr.success("Logged In successfully");
      this.router.navigate(["/category"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  isAdmin() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = jwtDecode(token);
      console.warn(decodedToken);
      /*const hasAdminRole = decodedToken && decodedToken.roles.includes('admin');*/
      return false;
    }

    return false;
  }
}
