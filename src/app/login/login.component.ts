import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData: any = {
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService,private router: Router){}


  loginUser() {
    this.apiService.login(this.loginData).subscribe(
      response => {
        // Handle successful login
        console.log('User Login Successful');
        const token  = String(response.user.multiFactor.user.accessToken);
        localStorage.setItem('accessToken', token);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed',error);
        alert("Login Failed : " + error)
      }
    );
  }

}
