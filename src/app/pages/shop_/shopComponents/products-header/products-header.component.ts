import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.less']
})
export class ProductsHeaderComponent  {
  @Output() columsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort :string= 'desc';
  itemsShowCount:number = 100;

  constructor(private translate: TranslateService){}

  onSortUpdated(newSort:string): void
  {

    this.sort = newSort;

    this.sortChange.emit(this.sort);
    const textTranslate = this.translate.instant(newSort);
    this.sort = textTranslate;
  }

  onItemsUpdated(count:number):void
  {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
}






  onColumnsUpdated(colsNum: number): void
  {

    this.columsCountChange.emit(colsNum);
  }




}
