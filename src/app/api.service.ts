import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://fakestoreapi.com/products';
  private apiUrllocal = 'http://localhost:3000';

  private showProducts = new BehaviorSubject<string>('all');
  showProductsObs$ = this.showProducts.asObservable();
  users: any[] = [];

  constructor(private http: HttpClient) { }

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

  //Slindelo
  //a method to fetch the item details from the fake API.
  getItemDetails(itemId: number): Observable<any> {
    const url = `${this.apiUrl}/${itemId}`;
    return this.http.get(url);
  }

  // Moloro
  getCart(): Observable<any> {
    const url = `${this.apiUrllocal}`;
    return this.http.get(url);
  }

  register(user: any): Observable<any> {
    const url = `${this.apiUrllocal}/users/register`;
    return this.http.post(url, user, this.httpOptions);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    const url = `${this.apiUrllocal}/login`;
    return this.http.post(url, credentials, this.httpOptions);
  }

  addToCart(product: any, userEmail: string): Observable<any> {
    
    this.getUserByEmail(userEmail).subscribe(data => {
        this.users = data;
    })
    console.log(this.users);

    // If the user is found, add the product to their cart
    if (this.users.length > 0) {
      this.users[0].cart.push(product);

      // Update the user's cart in the JSON-Server
      return this.updateUserCart(this.users[0]).pipe(
        tap(() => console.log('Product added to cart successfully'))
      );
    }

    // If the user is not found, handle accordingly (return an observable with an error)
    return of({ error: 'User not found' });
  }

  getUserByEmail(email: string): Observable<any> {
    console.log('Getting user by email');
    return  this.http.get<any[]>(`${this.apiUrllocal}/users?email=${email}`);
  }

  updateUserCart(user: any): Observable<any> {
    // Update the user's cart in the JSON-Server
    return this.http.put(`${this.apiUrllocal}/users/${user.id}`, user, this.httpOptions);
  }

}
