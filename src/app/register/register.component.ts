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
      () => {
        // Handle successful login
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        // Handle login error
        if (error.status === 400) {
          console.error('Bad Request: Invalid credentials', error);
          alert('Registration error = '+ error.error);
        } else {
          console.error('Login error', error);
        }
      }
    );
  }

}
