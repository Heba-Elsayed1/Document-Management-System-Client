import { Component } from '@angular/core';
import { AuthServiceService } from '../../../../core/auth/auth.service.service';
import { WorkspaceComponent } from "../../../workspace/pages/workspace/workspace.component";
import { UsersComponent } from "../../../user/pages/users/users.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WorkspaceComponent, UsersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private authService : AuthServiceService){}
  isUser:boolean = this.authService.isUser();
}
