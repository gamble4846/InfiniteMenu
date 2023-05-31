import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MenuColors, MenuData, RGBModel } from './Models/Models';

@Component({
  selector: 'infinite-menu',
  templateUrl: './infinite-menu.component.html'
})
export class InfiniteMenuComponent {

  @Input() MenuModel: Array<MenuData> = [];
  @Input() RGB:RGBModel = { r: 0, g: 21, b: 40 }
  @Input() ShadeMultiplier:number = 1;
  @Input() ShowOpenForAll: boolean = false;
  @Input() IconHeight: string = "25px";
  @Input() IconWidth: string = "25px";
  @Input() MenuColors:Array<MenuColors> =[];
  @Input() Loading: boolean = false;
  @Input() ShowOnlyIcon: boolean = false;

  @Output() MenuModelChange = new EventEmitter<Array<MenuData>>();
  @Output() MenuSelected = new EventEmitter<MenuData>();
  @Output() MenuOpenCloseChanged = new EventEmitter<MenuData>();
  
  constructor(
    
  ) { }

  ngOnInit(): void {
    this.SetUpMenuModel();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.SetUpMenuModel();
  }

  SetUpMenuModel(){
    this.MenuModel.forEach(element => {
      this.UpdateIDandLocForMenu(element, 1);
    });
  }

  UpdateIDandLocForMenu(MenuData:MenuData, Loc:number){
    if(!MenuData.Id){
      MenuData.Id = 'id' + (new Date()).getTime() + Math.random().toString(16).slice(2);
    }

    MenuData.MenuLoc = Loc;

    MenuData.Children.forEach(element => {
      this.UpdateIDandLocForMenu(element, Loc + 1);
    });
  }

  _MenuSelected(MenuData:MenuData){
    this.MenuSelected.emit(MenuData);
  }

  _MenuOpenCloseChanged(MenuData:MenuData){
    this.MenuOpenCloseChanged.emit(MenuData);
  }
  
}
