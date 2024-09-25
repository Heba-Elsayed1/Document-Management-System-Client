import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-directory',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-directory.component.html',
  styleUrl: './update-directory.component.scss',
})
export class UpdateDirectoryComponent implements OnInit {
  handleUpdate() {
    this.activeModal.close(this.form.value);
  }

  handleClose() {
    this.activeModal.close();
  }

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, protected activeModal: NgbActiveModal) { }
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() isPublic: boolean = false;
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: this.id,
      name: [this.name, Validators.required],
      isPublic: [this.isPublic]
    })
  }
}