import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

//firebase imports
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://fakestoreapi.com/products';

  private showProducts = new BehaviorSubject<string>('all');
  showProductsObs$ = this.showProducts.asObservable();

  constructor(private http: HttpClient, private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  // Method used in the sub-nav to help with switching categories
  showAllProducts() {
    this.showProducts.next('all');
  }

  showElectronics() {
    this.showProducts.next('electronics');
  }

  showMenClothes() {
    this.showProducts.next('men');
  }

  showWomenClothes() {
    this.showProducts.next('women');
  }

  showJewelery() {
    this.showProducts.next('jewelery');
  }

  getCurrentShowCurrentState(): string {
    return this.showProducts.value;
  }
  //-----------------------------------------------------------


  //Display component uses these get methods to get different categories and display them
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
  //------------------------------------------------------------------------

  //Slindelo
  //a method to fetch the item details from the fake API.
  getItemDetails(itemId: number): Observable<any> {
    const url = `${this.apiUrl}/${itemId}`;
    return this.http.get(url);
  }

  /////FIRE BASE login and register  FUUNCTIONS

  register(userInfor: any): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(userInfor.email, userInfor.password)
    .then((userCredential) => {
            const user = userCredential.user;

            if (user) {
              return this.firestore.collection('users').doc(user.uid).set({
                firstName: userInfor.name.firstname,
                lastName: userInfor.name.lastname,
                username: userInfor.username,
                email: userInfor.email,
                cart: userInfor.cart
              });
            }
            else{
              throw new Error('User registration failed');
            }
        }).
        catch(error => {
          console.error('Error during registration:', error);
          return throwError(error);
        })
      );
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(credentials.email,credentials.password));
  }



}
