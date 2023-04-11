import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class TestComponent  {
  stepperOrientation: Observable<StepperOrientation>;
  testShow: boolean = false;


  constructor(private FormBuilder: FormBuilder, private TestService: TestService,
    breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
   }


  firstFormGroup = this.FormBuilder.group({
    firstCtrl: ["", Validators.required],
  })
  secondFormGroup = this.FormBuilder.group({
    secondCtrl: ['not inserted', Validators.required],
  })
  conditionFormGroup = this.FormBuilder.group({
    ctrlCondition: ["not inserted", Validators.required],
  })
  thirdFormGroup = this.FormBuilder.group({
    thirdCtrl: ["not inserted", Validators.required],
  })
  fourthFormGroup = this.FormBuilder.group({
    fourthCtrl: ["not inserted", Validators.required],
  })



 personalData= this.FormBuilder.group({
   email: ['',[ Validators.required, Validators.email]],
   phone: ['', [Validators.required, Validators.pattern('[- +()0-9]{9,12}')],],
   location: [''],
   tickBox: false,
   tickBoxValue: 'not selected'
      })




  testInit(): void {
    this.testShow = true;
  }

  onTickBox ()
  {
    const tickBoxValue = this.personalData.value.tickBox ? 'yes' : 'not selected';
    this.personalData.patchValue({
      tickBoxValue: tickBoxValue
    });

  }

  finishTest(): void {

    this.TestService.sendResult(
      {

        firstCtrl: this.firstFormGroup.value.firstCtrl!,
        secondCtrl: this.secondFormGroup.value.secondCtrl!,
        ctrlCondition: this.conditionFormGroup.value.ctrlCondition!,
        thridCtrl:  this.thirdFormGroup.value.thirdCtrl!,
        location: this.personalData.value.location!,
        email: this.personalData.value.email!,
        phone: this.personalData.value.phone!,
        visitToTheLocation: this.personalData.value.tickBoxValue!
      }
    );

  }

  get isPhone() {
    return this.personalData.get('phone')!;
  }
  get isLocationDisabled() {
    return this.personalData.get('tickBox')?.value!;
  }


  readonly questionsArray: Array<{ question: string, answers: Array<{ answer: string }> }> = [
    {
      question: 'Where do you want to install the video surveillance system ?',

      answers: [
        {
          answer: 'Outside',
        },

        {
          answer: 'Interior',
        },

        {
          answer: 'Both inside and outside',
        },

        {
          answer: 'I dont know, I need a consultation',
        },
      ],
    },
    {
      question: 'What do you want to monitor?',

      answers: [
        {
          answer: 'A personal home',
        },

        {
          answer: 'A business/shop',
        },

        {
          answer: 'A large property, such as an industrial complex or parking lot',
        },

        {
          answer: 'I dont know, I need a consultation',
        },
      ],
    },

    {
      question: 'What is the size of the location where the video surveillance system is to be installed ?',

      answers: [
        {
          answer: 'Small (up to 50 m²)',
        },

        {
          answer: 'Medium (between 50 and 200 m²)',
        },

        {
          answer: 'Large (over 200 m²)',
        },


        {
          answer: 'I dont know, I need a consultation',
        },
      ],
    },



    {
      question: 'How many cameras do you need in your video surveillance system ?',

      answers: [
        {
          answer: '1-4 rooms',
        },

        {
          answer: '5-8 rooms',
        },

        {
          answer: 'More than 8 rooms',
        },
        {
          answer: 'I dont know, I need a consultation',
        },
      ],
    }


  ];
}
