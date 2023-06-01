/**
 * 创建一个固定长度的数组
 * @param min 最小值
 * @param max 最大值
 * @returns 
 */

export default function (min:number,max:number):number[] {
    const array:number[] = [];
    for(let i = min; i <= max; i++) {
        array.push(i);
    }
    return array;
}