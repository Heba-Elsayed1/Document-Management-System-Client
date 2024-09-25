import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../../core/auth/auth.service.service';
import { UserDto } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient , private authService: AuthServiceService) { }

  getUsers(pageNumber: number, pageSize: number){
    return this.http.get<UserDto[]>(`https://localhost:7163/api/User?pageNumber=${pageNumber}&pageSize=${pageSize}`) ;
  }
  lockUser(userId : number , duration: number): Observable<any>{
    return this.http.post<any>(`https://localhost:7163/api/User/lockuser/${userId}?durationInMinutes=${duration}`,null) ;
  }
  getUser(): Observable<UserDto>{
   return this.http.get<UserDto>('https://localhost:7163/api/User/userData') ;
  }
  

}
