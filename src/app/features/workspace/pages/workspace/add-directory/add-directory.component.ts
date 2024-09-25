import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-directory',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-directory.component.html',
  styleUrl: './add-directory.component.scss'
})
export class AddDirectoryComponent  {
  handleUpdate() {
    this.activeModal.close(this.form.value) ;
  }
    
    handleClose() {
      this.activeModal.close() ;
    }
  
    form: FormGroup = new FormGroup({});
    constructor(private formBuilder: FormBuilder, protected activeModal: NgbActiveModal) { }
  
  
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        isPublic: [false]
      })
    }
  }
