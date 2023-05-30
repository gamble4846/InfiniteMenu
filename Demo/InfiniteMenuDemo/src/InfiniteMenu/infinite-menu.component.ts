import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuData, RGBModel } from './Models/Models';

@Component({
  selector: 'infinite-menu',
  templateUrl: './infinite-menu.component.html',
  styleUrls: ['./infinite-menu.component.css']
})
export class InfiniteMenuComponent {

  @Input() MenuModel: Array<MenuData> = [];
  @Input() RGB:RGBModel = { r: 0, g: 21, b: 40 }
  @Input() ShadeMultiplier:number = 1;
  
  constructor(
    
  ) { }

  ngOnInit(): void {
    this.MenuModel.forEach(element => {
      this.UpdateIDandLocForMenu(element, 1);
    });
  }

  GetRandomId() {
    return 'id' + (new Date()).getTime();
  }

  UpdateIDandLocForMenu(MenuData:MenuData, Loc:number){
    MenuData.Id = 'id' + (new Date()).getTime() + Math.random().toString(16).slice(2);
    MenuData.MenuLoc = Loc;
    MenuData.Children.forEach(element => {
      this.UpdateIDandLocForMenu(element, Loc + 1);
    });
  }
  
}
