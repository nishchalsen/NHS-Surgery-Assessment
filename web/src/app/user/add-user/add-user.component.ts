// This file is adapted from source https://csharp-video-tutorials.blogspot.com/2018/10/angular-reactive-forms-cross-field.html
// and http://csharp-video-tutorials.blogspot.com/2018/10/move-validation-logic-to-component.html
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  valid: string = "";
  invalid:string = "";

  registerForm: FormGroup; 

  validationMessages = {
    'username': {
      'required': 'Staff username is required.',
      'minlength': 'Staff username must be at least 6 characters.',
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters.', //password.errors.minlength.requiredLength
    },
    'confirm_password': {
      'required': 'Please confirm your password.',
    },
    'passwordGroup': {
      'passwordMismatch': 'Password do not match.'
    },
    'firstname': {
      'required': 'First name is required.'
    },
    'lastname': {
      'required': 'Last name is required.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'phone': {
      'required': 'Phone number is required.',
      'pattern': 'Invalid phone number.',
    },
    'userRole': {
      'required': 'Your role is required.',
    },
  };

  formErrors = {
    'username': '',
    'password': '',
    'confirm_password': '',
    'passwordGroup': '',
    'firstname': '',
    'lastname': '',
    'email': '',
    'phone': '',
    'userRole': ''
  };

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({

      username: ['', [Validators.required, Validators.minLength(6)]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', Validators.required],
      }, { validator: matchPassword }),
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      // phone: ['', [Validators.required, Validators.pattern('[+]447[0-9]{9}')]],
      userRole: ['', Validators.required],
    });

    this.registerForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.registerForm);
    });
  }

  logValidationErrors(group: FormGroup = this.registerForm): void {
    // Loop through each control key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get the control. The control can be a nested form group
      const abstractControl = group.get(key);
      // If the control is nested form group, recursively call
      // this same method

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        // Get all the validation messages of the form control
        // that has failed the validation
        const messages = this.validationMessages[key];
        // Find which validation has failed. For example required,
        // minlength or maxlength. Store that error message in the
        // formErrors object. The UI will bind to this object to
        // display the validation errors
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        // If the control is a FormControl
      } 
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  f_error() {
    return this.registerForm.controls;
  }

  add_user() {
    this.logValidationErrors(this.registerForm);
    if (this.registerForm.invalid) {
      this.invalid="Please enter all the fields."
      return;
    }
    this.apiService.register(this.registerForm.value)
    .subscribe(
      (data:any) => {this.valid = data.message, this.invalid = ""},
      (err) => {this.invalid = err.message, this.valid = ""}
    );
  }
}

function matchPassword(group: AbstractControl): { [key: string]: any } | null {
  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('confirm_password');

  if (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine) {
    return null;
  } else {
    return { 'passwordMismatch': true };
  }
}