import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  // testResults = new BehaviorSubject<TestAll>({ result: [] });

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  sendResult(obj: { firstCtrl?: string, secondCtrl?: string, thridCtrl?: string, location?: string, name?: string, phone: string, email?: string, visitToTheLocation?: string, ctrlCondition ?:string,question?:string}):void
{

    if (obj.question!==undefined)
    {
      this.snackBar.open(this.translate.instant('The request has been sent.'), 'OK', { duration: 3000 });

      console.log(obj);
    }
    else {
      console.log(obj);
      // this.testResults.next({ result: obj })
      this.snackBar.open(this.translate.instant('The test result has been sent.'), 'OK', { duration: 3000 });

    }

}

}
