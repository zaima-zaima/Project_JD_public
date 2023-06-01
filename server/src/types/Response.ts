export interface ResponseWithCount<T> {
    count:number,
    rows:T[]
}