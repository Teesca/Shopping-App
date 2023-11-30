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
  listToDisplay: string = 'all';
  

  //qantity increment n decrement
 
  //for deleting products from cart


  //getting total
  getCartTotal() {
    return this.allproductsFromCart.reduce((sum, item) => sum + item.price, 0);
  }

  //for qty buttonslet number = 0;

  number = 0;

  increaseNumber() {
    this.number++;
  }

  decreaseNumber() {
    this.number--;
  }






}
