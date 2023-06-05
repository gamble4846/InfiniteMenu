import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
  
  //#region ImportModuleCodeSnippet
  ImportModuleCodeSnippet:string = `
  
  import { NgModule } from '@angular/core';<br>
  import { BrowserModule } from '@angular/platform-browser';<br>
  import { AppRoutingModule } from './app-routing.module';<br>
  import { AppComponent } from './app.component';<br>
  import { InfiniteMenuModule } from "../InfiniteMenu/infinite-menu.module";<br><br>

  @NgModule({<br>
    &emsp;declarations: [<br>
      &emsp;&emsp;AppComponent<br>
      &emsp;],<br>
      &emsp;providers: [],<br>
      &emsp;bootstrap: [AppComponent],<br>
      &emsp;imports: [<br>
        &emsp;&emsp;BrowserModule,<br>
        &emsp;&emsp;AppRoutingModule,<br>
        &emsp;&emsp;InfiniteMenuModule<br>
      &emsp;]<br>
  })<br>
  export class AppModule { }<br>

  
  `;
  //#endregion

  ImportStylesSnippet:string = `@import "../src/InfiniteMenu/Css/InfiniteMenu.css";`;
}
