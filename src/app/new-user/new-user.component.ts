import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      name:'',
      email:'',
      password:''

    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['name'],
      formValue['email'],
      formValue['password'],
      
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

}
