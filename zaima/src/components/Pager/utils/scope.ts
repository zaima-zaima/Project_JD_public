import { ref, Ref } from "vue";

export function getMinNumber(pageNumber:Ref<number>,limit:Ref<number>):number {
    let min:number;
    
    if(pageNumber.value - Math.floor(limit.value / 2) <= 0) {
        min = 1;
    } else {
        min = pageNumber.value - Math.floor(limit.value / 2)
    }
    return min;
}

export function getMaxNumber(pageNumber:Ref<number>,visiable:Ref<number>,maxinum:Ref<number>,limit:Ref<number>):number {
    let max:Ref<number>;
    if(getMinNumber(pageNumber,limit) + visiable.value - 1 > maxinum.value) {
        max = maxinum;
    }else {
        max = ref(getMinNumber(pageNumber,limit) + visiable.value - 1);
    }
    return max.value;
}