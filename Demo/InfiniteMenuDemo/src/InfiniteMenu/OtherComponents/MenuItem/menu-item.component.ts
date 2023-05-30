import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MenuData, RGBModel } from 'src/InfiniteMenu/Models/Models';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['../../infinite-menu.component.css']
})
export class MenuItemComponent {
  @Input() MenuModel: Array<MenuData> = [];
  @Input() RGB: RGBModel = { r: 0, g: 21, b: 40 }
  @Input() ShadeMultiplier: number = 1;

  constructor(
  ) { }

  ToggleOption(Id: string | undefined) {
    if(Id){
      var menu = this.MenuModel.find(x => x.Id == Id);
      if(menu){
        menu.IsOpen = !menu.IsOpen;
      }
    }
  }

  GetBackgoundColor(Loc: number | undefined) {
    let localRGB = structuredClone(this.RGB);
    if (!Loc)
      Loc = 1;
    localRGB.r = localRGB.r * (Loc * this.ShadeMultiplier);
    localRGB.g = localRGB.g * (Loc * this.ShadeMultiplier);
    localRGB.b = localRGB.b * (Loc * this.ShadeMultiplier);
    return `rgb(${localRGB.r}, ${localRGB.g}, ${localRGB.b})`;
  }

  HeaderSelected(Menu:MenuData){
    console.log(Menu);
  }
}
