import {Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ValidationService } from '../../../../shared/services/validation.service';
import { RouterModule } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { RegisterService } from '../../register.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, 
    JsonPipe , RouterModule , MatRadioModule , HttpClientModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})

export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private validationService: ValidationService 
    , private registerService : RegisterService , private router : Router) {

  }

  form: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.initFormModule();
  }

  private initFormModule(): void {
    this.form = this.formBuilder.group({
      FullName: '',
      UserName: ['',  [Validators.required] ],
      Email: ['',  [Validators.required, Validators.email]  ],
      Password: ['', [Validators.required,Validators.minLength(8)]],
      PasswordConfirmed: ['', [Validators.minLength(8), Validators.required]  ],
      NID: '',
      PhoneNumber: '',
      Gender: '',
      WorkspaceName: ['',  [Validators.required] ]
    }, {
      validator: this.validationService.mustMatch('password', 'confirmPassword')
    });
  }

  isRegister : boolean = true ;
  errorMessage : string ='' ;
  onSubmit(): void {
    if (this.form.valid) {
      this.registerService.register(this.form.value).subscribe({
        next: (data: any) => {
          console.log('Registration successful:', data);
          this.router.navigate(['/login']) ;
        },
        error: (err) => {
          this.isRegister = false ;
          this.errorMessage = err.error ;
          console.error('Registration error:', err.error); 
        }
      });
    }
  }


}

