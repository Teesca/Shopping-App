import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {

  productDeatail: any = {};
  buttonClicked: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const itemId = Number(params.get('id'));
      
      this.apiService.getItemDetails(itemId).subscribe(
        (data) => {
          this.productDeatail = data;
          console.log('Data received:', this.productDeatail);
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    });
  }

  addToCart() {
    if (!this.buttonClicked) {
      this.buttonClicked = true;

      this.apiService.addToCart(this.productDeatail).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Failed to add item to cart.', error);
        }
      );
    }
  }
}