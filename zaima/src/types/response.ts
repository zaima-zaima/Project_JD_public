export interface ResponseWithCount<T> {
    rows:T[],
    count:number
}