import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteMenuComponent } from './infinite-menu.component';
import { MenuItemComponent } from './OtherComponents/MenuItem/menu-item.component';



@NgModule({
  declarations: [
    InfiniteMenuComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    InfiniteMenuComponent
  ]
})
export class InfiniteMenuModule { }
