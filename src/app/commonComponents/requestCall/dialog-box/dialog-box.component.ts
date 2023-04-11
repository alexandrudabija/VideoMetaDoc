import { Component } from '@angular/core';
import { FormBuilder ,FormGroup,FormGroupDirective,NgForm,Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RequestCallService } from 'src/app/services/requestCall.service';
import { MatDialogRef } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormGroup | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.less']
})
export class DialogBoxComponent {
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
    private RequestCallService: RequestCallService,
    private dialogRef: MatDialogRef<DialogBoxComponent>

  ) { }

  formCall!: FormGroup
  ngOnInit(): void {
    this.formCall = this.formBuilder.group({

      name: [null, [Validators.required, Validators.min(1)]],
      phone: [null, [Validators.required, Validators.pattern('[- +()0-9]{9,12}')]],
    });
  }


  toggleRequestCall(): void {

     this.RequestCallService.requestcall(this.formCall.value);
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
 }

}
