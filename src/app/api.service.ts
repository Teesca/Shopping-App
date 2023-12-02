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
  private apiUrllocal = 'http://localhost:3000';

  private showProducts = new BehaviorSubject<string>('all');
  showProductsObs$ = this.showProducts.asObservable();
  users: any[] = [];

  constructor(private http: HttpClient, private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


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
        tap(() => console.log('Product added to cart successfully')),
        catchError(this.handleError<any>('updateUserCart'))
      );
    }

    // If the user is not found, handle accordingly (return an observable with an error)
    return of({ error: 'User not found' });
  }

  getUserByEmail(email: string): Observable<any> {
    return  this.http.get<any[]>(`${this.apiUrllocal}/users?email=${email}`);
  }

  updateUserCart(user: any): Observable<any> {
    // Update the user's cart in the JSON-Server
    return this.http.put(`${this.apiUrllocal}/users/${user.id}`, user, this.httpOptions);
  }


  getUserCart(userEmail: string): Observable<any> {
    return this.getUserByEmail(userEmail).pipe(
      tap(user => console.log('User cart fetched successfully', user)),
      catchError(this.handleError<any>('getUserCart'))
    );
  }

  deleteItemFromCart(productId: number, userEmail: string): Observable<any> {
    return this.getUserByEmail(userEmail).pipe(
      tap(users => {
        if (users && users.length > 0) {
          const updatedCart = users[0].cart.filter((item: { id: number; }) => item.id !== productId);
          users[0].cart = updatedCart;

          // Update the user's cart in the JSON-Server
          this.updateUserCart(users[0]).subscribe(
            () => console.log('Item removed from cart successfully'),
            error => console.error('Failed to remove item from cart:', error)
          );
        } else {
          console.error('User not found');
        }
      }),
      catchError(this.handleError<any>('deleteItemFromCart'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }






  /////FIRE BASE FUUNCTIONS

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

  getCurrentUserData(): Observable<any> {
    return this.auth.user.pipe(
      // SwitchMap to switch from the user observable to a new observable that fetches Firestore data
      switchMap(user => {
        // Check if the user is authenticated
        if (user) {
          // Assuming you have a 'users' collection in Firestore
          const userDoc = this.firestore.doc(`users/${user.uid}`);
          return userDoc.valueChanges(); // Returns an observable of the user's data
        } else {
          // If the user is not authenticated, return an empty observable or handle it as needed
          return of(null);
        }
      })
    );
  }

}
