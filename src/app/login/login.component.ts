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
        console.log('Login successful', response);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        // Handle login error
        if (error.status === 400) {
          console.error('Bad Request: Invalid credentials', error);
          alert('Login error = '+ error.error);
          // Display an error message to the user, e.g., set a variable for an error message in your component
        } else {
          console.error('Login error', error);
          // Handle other types of errors
        }
      }
    );
  }

}
