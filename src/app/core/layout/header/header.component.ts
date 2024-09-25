import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../auth/auth.service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(protected authservice: AuthServiceService, private router: Router ) {

  }

  handleNavigation = () => {
    if (this.isLoggedIn()) {
      this.authservice.logOut();
      return
    }
    this.router.navigateByUrl('login')
  }
  isLoggedIn =()=> this.authservice.isLogin()
}
