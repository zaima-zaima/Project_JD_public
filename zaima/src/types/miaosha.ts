export interface SliderItem {
    thumb:string,
    title:string,
    path:string,
    price:string,
    id:string
}

export interface Miaosha {
    startTime:string | number;
    endTime:string | number;
    goods:SliderItem[]
}