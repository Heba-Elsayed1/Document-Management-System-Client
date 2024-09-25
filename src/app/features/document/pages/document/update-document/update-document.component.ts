import { Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-document',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-document.component.html',
  styleUrl: './update-document.component.scss'
})
export class UpdateDocumentComponent {

  @Input() name: string = '' ;
  
  
  constructor(protected activeModal: NgbActiveModal) { }

  handleUpdate() {
    this.activeModal.close(this.name);
  }

  handleClose() {
    this.activeModal.close();
  }



}
