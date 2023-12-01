import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { SubnavComponent } from "../subnav/subnav.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";


@Component({
    standalone: true,
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    imports: [
        CommonModule,
        SubnavComponent,
        NavbarComponent,
        FooterComponent
    ]
})
export class CartComponent {

  allproductsFromCart: any[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.apiService.getUserCart(String(localStorage.getItem("email"))).subscribe(data => {
       this.allproductsFromCart = data[0].cart;
       console.log(this.allproductsFromCart)
    })
  }


}
