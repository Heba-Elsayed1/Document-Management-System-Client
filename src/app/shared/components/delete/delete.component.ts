import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  constructor(protected activeModal: NgbActiveModal) { }
  
  @Input() name: string = '';

  confirmDelete() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.close(false);
  }
  
}
