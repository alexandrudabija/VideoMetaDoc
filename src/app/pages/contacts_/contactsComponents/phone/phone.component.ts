import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, Validators,FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RequestCallService } from 'src/app/services/requestCall.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormGroup | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.less']
})
export class PhoneComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private requestCallService: RequestCallService) {}

  contactForm!: FormGroup;

matcher = new MyErrorStateMatcher();


ngOnInit(): void {

  this.contactForm = this.formbuilder.group(
    {
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]{9,12}')]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.required]],
      message: ['', [Validators.required, Validators.required]],
    })


}


  submitRequest()
  {
    this.requestCallService.requestcall(this.contactForm.value)



  }

}
