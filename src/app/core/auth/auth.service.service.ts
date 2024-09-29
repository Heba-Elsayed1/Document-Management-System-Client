import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { truncate } from 'fs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private tokenKey = 'authToken' ;
  private expirationKey ='tokenExpiration' ;
  private roleKey ='role' ;

  constructor(private router: Router , private http : HttpClient) 
  { 
  }

  login(credentials: { username: string; password: string }){
    return this.http.post<any>('https://localhost:7163/api/User/login', credentials) ;
  }

   storeToken (token: string , expiration : string , role : string){
    localStorage.setItem(this.tokenKey , token);
    localStorage.setItem(this.expirationKey,expiration) ;
    localStorage.setItem(this.roleKey , role);
  }

   getToken () : string | null{
    return localStorage.getItem(this.tokenKey);
  }

  getRole() : string | null{
    return localStorage.getItem(this.roleKey);
  }

  isUser():boolean{
    const role = this.getRole();
    if(role =="User")
      return true;
    else
    return false;
  }
  
  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSource.asObservable() ;

   startLogin(){
    this.isAuthenticatedSource.next(true); 
   }
   
  isLogin(): boolean {
    const token = this.getToken();
    const expiration = localStorage.getItem(this.expirationKey);
  
    if (!token || !expiration) {
      this.isAuthenticatedSource.next(false);
      return false;
    }
  
    const now = new Date();
    const isAuthenticated = now < new Date(expiration);
    this.isAuthenticatedSource.next(isAuthenticated);
    
    return isAuthenticated;
  }

   logOut(){
    this.isAuthenticatedSource.next(false);
    if(this.getToken() || this.getRole())
    {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.expirationKey);
      localStorage.removeItem(this.roleKey);
    }
    this.router.navigate(['/login']);
  }

}
