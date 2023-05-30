import { Component } from '@angular/core';
import { MenuData, RGBModel } from 'src/InfiniteMenu/Models/Models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InfiniteMenuDemo';

  data: Array<MenuData> = [
    {
      Title: "Option 1",
      Children: [
        {
          Title: "Option 1_1",
          Children: [
            {
              Title: "Option 1_1_1",
              Children: [
                {
                  Title: "Option 1_1_1_1",
                  Children: []
                }
              ]
            },
            {
              Title: "Option 1_1_2",
              Children: []
            }
          ]
        },
        {
          Title: "Option 1_2",
          Children: [
            {
              Title: "Option 1_2_1",
              Children: []
            }
          ]
        },
        {
          Title: "Option 1_3",
          Children: []
        }
      ]
    }, 
    {
      Title: "Option 2",
      Children: []
    }, 
    {
      Title: "Option 3",
      Children: []
    }
  ]

  RGB_DATA:RGBModel = {
    r: 0,
    g: 21,
    b: 40,
  }
}
