import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubnavComponent } from '../subnav/subnav.component';

@Component({
  standalone: true,
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    SubnavComponent
  ],
})
export class DisplayComponent {

  allProductsData: any[] = [];
  menClothingData: any[] = [];
  womenClothingData: any[] = [];
  jeweleryData: any[] = [];
  electronicsData: any[] = [];
  listToDisplay: string = 'all';
  constructor( private apiService: ApiService){}

  ngOnInit() {
    this.apiService.showProductsObs$.subscribe(data => {
       this.universalDisplay(data);
    });
  }

  universalDisplay(data: any){
    switch(data){
      case 'all': 
        this.listToDisplay = data;
        this.diplayAllProducts();
        break;
      case 'men':
        this.listToDisplay = data;
        this.diplayMenClothing();
        break;
      case 'women':
        this.listToDisplay = data;
        this.displayWomenClothing();
        break;
      case 'electronics':
        this.listToDisplay = data;
        this.displayElectronics();
        break;
      case 'jewelery':
        this.listToDisplay = data;
        this.displayJewelery();
        break;
      default:
        break;
    }
  }


  diplayAllProducts(){
    this.apiService.getAllProducts().subscribe(
      data => {
        this.allProductsData = data;
        console.log('Data received:', this.allProductsData);
      },
      error => {
        console.error('Error fetching all-products data:', error);
      }
    );
  }
  

  diplayMenClothing(){
    this.apiService.getAllMenClothing().subscribe(
      data => {
        this.menClothingData = data;
        console.log('Data received:', this.menClothingData);
      },
      error => {
        console.error('Error fetching men\'s clothing data:', error);
      }
    );
  }

  displayWomenClothing(){
    this.apiService.getAllWomenClothing().subscribe(
      data => {
        this.womenClothingData = data;
        console.log('Data received:', this.womenClothingData);
      },
      error => {
        console.error('Error fetching women\'s clothing data:', error);
      }
    );
  }
  displayElectronics(){
    this.apiService.getAllElectronics().subscribe(
      data => {
        this.electronicsData = data;
        console.log('Data received:', this.electronicsData);
      },
      error => {
        console.error('Error fetching electronics data:', error);
      }
    );
  }
  displayJewelery(){
    this.apiService.getAllJewelery().subscribe(
      data => {
        this.jeweleryData = data;
        console.log('Data received:', this.jeweleryData);
      },
      error => {
        console.error('Error fetching men\'s clothing data:', error);
      }
    );
  }

}
