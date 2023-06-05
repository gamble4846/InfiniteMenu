import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconType, MenuStyles, MenuData, RGBModel } from 'src/InfiniteMenu/Models/Models';
import { InfiniteMenuService } from 'src/InfiniteMenu/Service/infinite-menu.service';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
  @Input() MenuModel: Array<MenuData> = [];
  @Input() RGB: RGBModel = { r: 0, g: 21, b: 40 }
  @Input() ShadeMultiplier: number = 1;
  @Input() ShowOpenForAll: boolean = false;
  @Input() IconHeight: string = "25px";
  @Input() IconWidth: string = "25px";
  @Input() MenuStyles: Array<MenuStyles> = [];
  @Input() ShowOnlyIcon: boolean = false;
  @Input() SingleMenuHeight: number = 45;

  @Output() MenuSelected = new EventEmitter<MenuData>();
  @Output() MenuOpenCloseChanged = new EventEmitter<MenuData>();

  constructor(
    private sanitizer: DomSanitizer,
    public _InfiniteMenu: InfiniteMenuService
  ) { }

  public get IconType(): typeof IconType {
    return IconType;
  }

  ToggleOption(Id: string | undefined) {
    if (Id) {
      var menu = this.MenuModel.find(x => x.Id == Id);
      if (menu) {
        menu.IsOpen = !menu.IsOpen;
      }

      this.MenuOpenCloseChanged.emit(menu);
    }
  }

  GetBackgoundColor(MenuData: MenuData) {
    let Loc = MenuData.MenuLoc;
    let localRGB = structuredClone(this.RGB);
    if (!Loc)
      Loc = 1;
    localRGB.r = localRGB.r * (Loc * this.ShadeMultiplier);
    localRGB.g = localRGB.g * (Loc * this.ShadeMultiplier);
    localRGB.b = localRGB.b * (Loc * this.ShadeMultiplier);

    let currentMenuStyle = structuredClone(this.MenuStyles.find(x => x.Location == Loc));

    if (currentMenuStyle && currentMenuStyle.BackgroundColor) {
      return currentMenuStyle.BackgroundColor;
    }

    return `rgb(${localRGB.r}, ${localRGB.g}, ${localRGB.b})`;
  }

  GetTextColor(MenuData: MenuData) {
    let currentMenuStyle = structuredClone(this.MenuStyles.find(x => x.Location == MenuData.MenuLoc));

    if (currentMenuStyle && currentMenuStyle.TextColor) {
      return currentMenuStyle.TextColor;
    }

    return `inherit`;
  }

  GetPadding(Loc: number | undefined) {
    let currentMenuStyle = structuredClone(this.MenuStyles.find(x => x.Location == Loc));
    if (currentMenuStyle && currentMenuStyle.PaddingLeft) {
      return currentMenuStyle.PaddingLeft;
    }

    return `0px`;
  }

  GetOnHoverBackgroundColor(Loc: number | undefined) {
    let currentMenuStyle = structuredClone(this.MenuStyles.find(x => x.Location == Loc));
    if (currentMenuStyle && currentMenuStyle.OnHoverBackgroundColor) {
      return currentMenuStyle.OnHoverBackgroundColor;
    }

    return `inherit`;
  }

  GetOnHoverTextColor(Loc: number | undefined) {
    let currentMenuStyle = structuredClone(this.MenuStyles.find(x => x.Location == Loc));
    if (currentMenuStyle && currentMenuStyle.OnHoverTextColor) {
      return currentMenuStyle.OnHoverTextColor;
    }

    return `inherit`;
  }

  GetMenuTitleWidth(MenuData: MenuData) {
    let widthString = `calc(100% - (${this.IconWidth}px + 10px))`;
    return widthString;
  }

  GetMenuHeadWithWithOUtArrow(MenuData: MenuData) {
    let paddingLeft = this.GetPadding(MenuData.MenuLoc);
    let widthString = `calc(100% - (20px + ${paddingLeft} + 40px))`;
    return widthString;
  }

  GetOptionBodyHeight(MenuData: MenuData){
    if(MenuData.IsOpen){
      var toReturn = this.GetChildBodyHeight(MenuData) + "px";
      return toReturn;
    }
    return "0px";
  }

  GetChildBodyHeight(MenuData: MenuData){
    if(MenuData.IsOpen){
      let total = 45;
      MenuData.Children.forEach(Menu => {
        total += this.GetChildBodyHeight(Menu);
      });

      return total;
    }
    return 45;
  }

  _MenuSelected(MenuData: MenuData) {
    if(MenuData.OpenSubOnAnyClick){
      this.ToggleOption(MenuData.Id);
    }
    else{
      this.MenuSelected.emit(MenuData);
    }
  }

  _MenuOpenCloseChanged(MenuData: MenuData) {
    this.MenuOpenCloseChanged.emit(MenuData);
  }

  ByPassSecurityTrustHtml(Data: any) {
    return this.sanitizer.bypassSecurityTrustHtml(Data);
  }

  HoverOnMenu_MouseEnter(MenuData: MenuData, Element: HTMLElement) {
    var rect = Element.getBoundingClientRect();
    var tooltip = document.createElement("div");
    tooltip.innerHTML = MenuData.Title;
    tooltip.style.position = "fixed";
    tooltip.style.backgroundColor = "#00000096";
    tooltip.style.height = "max-content";
    tooltip.style.width = "max-content";
    tooltip.classList.add(MenuData.Id + "ElementId");
    tooltip.style.top = rect.top + "px";
    tooltip.style.left = rect.left + Element.offsetWidth + 10 + "px";
    tooltip.style.color = "white";
    tooltip.style.padding = "10px";
    tooltip.style.borderRadius = "5px";
    document.getElementsByTagName("body")[0].appendChild(tooltip);

    Element.style.backgroundColor = this.GetOnHoverBackgroundColor(MenuData.MenuLoc);
    Element.style.color = this.GetOnHoverTextColor(MenuData.MenuLoc);
  }

  HoverOnMenu_MouseLeave(MenuData: MenuData, Element: HTMLElement) {
    let elements = document.getElementsByClassName(MenuData.Id + "ElementId");
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      if (element)
        element.remove();
    }

    Element.style.backgroundColor = this.GetBackgoundColor(MenuData);
    Element.style.color = this.GetTextColor(MenuData);
  }
}
