import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [
    CommonModule
  ]
})
export class CartComponent {

  allproductsFromCart: any[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.apiService.getCart().subscribe(data => {
       this.allproductsFromCart = data;
       console.log(this.allproductsFromCart)
    })
  }


}
