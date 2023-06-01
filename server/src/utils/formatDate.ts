export function fromTimeStampToStand(timestamp:number|string,h = false) {
    const date = typeof timestamp === "number" ? new Date(+timestamp) :new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2,"0");
    const day = date.getDate().toString().padStart(2,"0");
    const hour = date.getHours().toString().padStart(2,"0");
    const min = date.getMinutes().toString().padStart(2,"0");
    const second = date.getSeconds().toString().padStart(2,"0");
    if (h) {
		return `${year}年${month}月${day}日  ${hour}:${min}:${second}`;
	} else {
		return `${year}年${month}月${day}日`;
	}
}