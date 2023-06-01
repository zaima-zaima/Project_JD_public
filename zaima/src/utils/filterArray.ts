export default function (originArray: any[], fillterArray: any[]) {
  let arr = [];
  let boolean = true;
  for (let i = 0; i < originArray.length; i++) {
    for (let j = 0; j < fillterArray.length; j++) {
      if (originArray[i].id === fillterArray[j].id) {
        boolean = false;
      }
    }

    if (boolean) {
      arr.push(originArray[i]);
    }
    boolean = true;
  }

  return arr;
}
