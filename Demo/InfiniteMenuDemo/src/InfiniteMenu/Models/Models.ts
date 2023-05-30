export interface MenuData {
    Title: string,
    Children: Array<MenuData>,
    MenuLoc?:number,
    IsOpen?:boolean,
    CustomData?:any,
    Id?:string,
}

export interface RGBModel{
    r:number,
    g:number,
    b:number
}