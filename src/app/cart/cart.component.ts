import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { SubnavComponent } from "../subnav/subnav.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';


@Component({
    standalone: true,
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    imports: [
        CommonModule,
        SubnavComponent,
        NavbarComponent,
        FooterComponent,
        RouterModule
    ]
})
export class CartComponent {

  allproductsFromCart: any[] = [];
  total: number =  1;

  quantities: { [key: number]: number } = {};

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.apiService.getUserCart(String(localStorage.getItem("email"))).subscribe(data => {
       this.allproductsFromCart = data[0].cart;
       console.log(this.allproductsFromCart)

       // Initialize quantities for each product
      this.allproductsFromCart.forEach(product => {
        this.quantities[product.id] = 1;
      });

      //total
      this.allproductsFromCart.forEach(product => {
        this.total +=  product.price;
      });
      this.total=this.roundToTwoDecimals(this.total);
    })
  }


  plus(productId: number) {
    this.quantities[productId] += 1;
    this.total += this.allproductsFromCart.find(item => item.id === productId).price;
    this.total=this.roundToTwoDecimals(this.total);
  }

  minus(productId: number) {
    if (this.quantities[productId] > 1) {
      this.quantities[productId] -= 1;
      this.total -= this.allproductsFromCart.find(item => item.id === productId).price;
      this.total=this.roundToTwoDecimals(this.total);
      
    }
  }


  deleteProduct(productId: number) {
    const userEmail = String(localStorage.getItem("email"));

    this.apiService.deleteItemFromCart(productId, userEmail).subscribe(
      () => {
        console.log('Item deleted successfully');
        this.total -= this.allproductsFromCart.find(item => item.id === productId).price;
        this.allproductsFromCart = this.allproductsFromCart.filter(product => product.id !== productId);
        this.total=this.roundToTwoDecimals(this.total);
      },
      error => {
        console.error('Failed to delete item:', error);
      }
    );
  }

  private roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
