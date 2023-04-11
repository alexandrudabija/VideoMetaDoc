import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';



@Component({
  selector: 'app-requestCall',
  templateUrl:'./requestCall.component.html',
  styleUrls: ['./requestCall.component.less']
})
export class RequestCallComponent   {


  constructor(public dialog :MatDialog) { }

  openDialog():void
  {

this.dialog.open(DialogBoxComponent,{width:'273px'})

  }






}
