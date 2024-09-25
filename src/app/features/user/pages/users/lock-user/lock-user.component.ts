import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lock-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lock-user.component.html',
  styleUrl: './lock-user.component.scss'
})
export class LockUserComponent {

 
  constructor(protected activeModal: NgbActiveModal) { }
  duration: number = 0;

  handleLock() {
    this.activeModal.close(this.duration);
  }

  handleClose() {
    this.activeModal.close();
  }

}
