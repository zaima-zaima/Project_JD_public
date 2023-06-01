export interface Brand {
    thumb:string,
    path:string
}

export interface Section {
    title:string,
    description:string,
    childs:[
        {thumb:string,path:string},
        {thumb:string,path:string}
    ]
}

export interface PlayGround {
    brand: Brand[],
    section: Section[]
}