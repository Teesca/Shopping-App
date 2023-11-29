import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://fakestoreapi.com/products';
  private showProducts = new BehaviorSubject<string>('all');
  showProductsObs$ = this.showProducts.asObservable();


  constructor(private http: HttpClient) {}

  showAllProducts() {
    console.log('showAllProducts');
    this.showProducts.next('all');
  }

  showElectronics() {
    console.log('showElectronics');
    this.showProducts.next('electronics');
  }

  showMenClothes() {
    console.log('showMen');
    this.showProducts.next('men');
  }

  showWomenClothes() {
    console.log('showAllWomen');
    this.showProducts.next('women');
  }

  showJewelery() {
    console.log('showAllWomen');
    this.showProducts.next('jewelery');
  }

  getCurrentShowCurrentState(): string {
    return this.showProducts.value;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllWomenClothing(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/women's clothing`);
  }

  getAllMenClothing(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/men's clothing`);
  }

  getAllJewelery(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/jewelery`);
  }

  getAllElectronics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/electronics`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  
  

  // // Observable to subscribe to user added events
  // onUserAdded(): Observable<any> {
  //   return this.userAddedSubject.asObservable();
  // }


  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     console.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  //}
}
