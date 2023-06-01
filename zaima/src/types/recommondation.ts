export interface RecommondationChild {
    isHot:false,
    isSelf:false,
    id:string,
    thumb:string,
    title:string,
    price:string
}


export interface RecommondationHot {
    isHot:true,
    id:string,
    data:string[]
}

export interface Recommondation {
    total:number
    data: RecommondationChild[] | RecommondationHot[]
}