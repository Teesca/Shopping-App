import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: any = {
    email: "",
    password: "",
    id: Date.now(),
    username: "",
    name: {
      firstname: "",
      lastname: ""
    },
    cart: []
  };
  

  constructor(private apiService: ApiService,private router: Router){}

  registerUser(){
    console.log(this.user);
    this.apiService.register(this.user).subscribe(
      response => {
        // Handle successful login
        console.log('Registration successful', response);
        localStorage.setItem('email',this.user.email)
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        // Handle login error
        if (error.status === 400) {
          console.error('Bad Request: Invalid credentials', error);
          alert('Registration error = '+ error.error);
          // Display an error message to the user, e.g., set a variable for an error message in your component
        } else {
          console.error('Login error', error);
          // Handle other types of errors
        }
      }
    );
  }

}
