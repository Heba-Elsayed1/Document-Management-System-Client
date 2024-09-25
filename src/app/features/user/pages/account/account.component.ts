import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { UserDto } from '../../user.model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
 constructor(private userService : UserService){}
 user : UserDto ={
  userName:'', fullName :'',id:0 , email :'',phoneNumber:'',nid:'',gender:''
 }

 ngOnInit(): void {
   this.getUser();
 }
 getUser(){
  this.userService.getUser().subscribe({
    next : userData => {
      this.user = userData ;
    }
  })
 }

}
