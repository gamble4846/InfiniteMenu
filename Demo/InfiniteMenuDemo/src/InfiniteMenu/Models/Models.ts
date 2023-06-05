export interface MenuData {
    Title: string,
    Children: Array<MenuData>,
    MenuLoc?:number,
    IsOpen?:boolean,
    CustomData?:any,
    Id?:string,
    Icon?: string,
    IconType?: IconType,
    OpenSubOnAnyClick?: boolean
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

export interface MenuStyles{
    Location:number,
    BackgroundColor?:string,
    TextColor?:string,
    PaddingLeft?:string,
    OnHoverBackgroundColor?:string,
    OnHoverTextColor?:string,
}