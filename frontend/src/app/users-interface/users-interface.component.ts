import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users-interface',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-interface.component.html',
  styleUrls: ['./users-interface.component.scss']
})
export class UsersInterfaceComponent implements OnInit {

  createUserForm!: FormGroup;

  constructor(
    private usersService : UsersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void{
    this.createUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      login: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.createUserForm.invalid) {
      this.createUserForm.markAllAsTouched();
      return;
    }

    const {email, password, login} = this.createUserForm.value;

    this.usersService.createUser({email, password, login}).subscribe({
      next: (res) => {
        console.log('Sucess', res);
        this.createUserForm.reset();
      },
      error: (err) => {
        console.log('Error', err)
      }
    });
  }
}
