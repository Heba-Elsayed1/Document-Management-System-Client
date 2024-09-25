import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { UserDto } from '../../user.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LockUserComponent } from './lock-user/lock-user.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  constructor(private userService : UserService , private router : Router ){}
  users : UserDto[] = [];
  filteredUsers : UserDto[] = [];
  searchItem='';
  pageNumber=1;
  pageSize=7;

  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers(){
    this.userService.getUsers(this.pageNumber,this.pageSize).subscribe({
     next : userData =>{
      this.users = userData;
      this.filteredUsers= this.users.sort((a,b) => a.fullName.localeCompare(b.fullName));
     },
     error:err =>{
      console.log(err.error);
     }
    })
  }

  onPageChange(newPage: number){
    this.pageNumber= newPage ;
    this.getUsers();
  }

  lockUser(userId : number, duration : number){
    this.userService.lockUser(userId , duration).subscribe({
      next : result=> {},
      error: err => {console.log(err.error);}
    })
  }

  openWorkspace(userId: number){
   this.router.navigate(['/workspace'],{queryParams : {userId}})
  }

  search(){
    this.filteredUsers = this.users.filter(u => u.fullName.toLowerCase().
    startsWith(this.searchItem.toLowerCase()) ) ;
    
  }

  private modalService = inject(NgbModal);
  openLock(userId: number) {
    const modalRef = this.modalService.open(LockUserComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modalRef.result.then((result => {
      if(result){
        this.lockUser(userId,result)
      } 
    }),
      error => {
        console.log("there is an error");
      }
    );
  }
}
