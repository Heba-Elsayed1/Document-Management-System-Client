import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-workspace',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-workspace.component.html',
  styleUrl: './update-workspace.component.scss'
})
export class UpdateWorkspaceComponent implements OnInit {
 
constructor( protected activeModal : NgbActiveModal , private formBuilder:FormBuilder){} ;

 handleClose() {
      this.activeModal.close() ;
    }

  handleUpdate(){
    this.activeModal.close(this.form.value);
  }

  form: FormGroup = new FormGroup({});
  @Input() id: number=0;
  @Input() name : string ='';

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: this.id,
      name: [this.name, Validators.required],
    })
  }

}
