export interface MenuData {
    Title: string,
    Children: Array<MenuData>,
    MenuLoc?:number,
    IsOpen?:boolean,
    CustomData?:any,
    Id?:string,
    Icon?: string,
    IconType?: IconType,
}

export interface RGBModel{
    r:number,
    g:number,
    b:number
}

export enum IconType {
    SVG,
    FluentIcons,
    Image
}

export interface MenuColors{
    Location:number,
    BackgroundColor:string,
    TextColor:string,
}