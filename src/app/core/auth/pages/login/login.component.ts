import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ValidationService } from '../../../../shared/services/validation.service';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../auth.service.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, HttpClientModule, MatInputModule, MatIconModule, ReactiveFormsModule,
    JsonPipe, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService,
    private router: Router 
  ) { }

  form: FormGroup = new FormGroup({});
  isLogged = true ;
  errorMessage ='';

  ngOnInit(): void {
    this.initFormModule();
  }

  private initFormModule(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit() {
    if (this.form.valid) {
    this.authService.login(this.form.value).subscribe({
      next : response => {
        this.isLogged= true;

        const token = response.token ;
        const expiration = response.expiration;
        const role = response.role ;

        this.authService.storeToken(token , expiration , role) ;
        this.authService.startLogin();
        this.router.navigate(['/home']);
      },
      error : err =>{
        this.isLogged= false;
        this.errorMessage = err.error;
      }
  })
    } 
  }

}
