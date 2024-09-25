import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from './register.model';
import { Observable , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(registerData: RegisterDTO): Observable<any> {
    return this.http.post<any>('https://localhost:7163/api/User/register', registerData);
  }
  
  
}
