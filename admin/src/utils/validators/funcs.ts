import { FormItemRule } from "element-plus";

const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\s\/\(\)\u4e00-\u9fa5]+$/;

export function nameValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("该值不能为空"));
  }

  if (!reg.test(value)) {
    callback(
      new Error(
        "格式有误，提示：只能包含中文英文数字空格左括号右括号以及下划线"
      )
    );
  }

  if (value.length < 5 || value.length > 100) {
    callback(new Error("长度为5-100"));
  }

  callback();
}

export function priceValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("该值不能为空"));
  }

  const str = String(value);
  const arr = str.split(".");

  if (arr.length > 1 && arr[1].length > 2) {
    callback(new Error("小数点最多保留两位"));
  }

  if (arr.length > 1 && arr[1].length === 0) {
    callback(new Error("格式错误"));
  }

  if (!Number.isFinite(+value)) {
    callback(new Error("必须为数字"));
  }

  callback();
}

export function storeValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("该值不能为空"));
  }

  if (!Number.isInteger(+value)) {
    callback(new Error("必须为整数"));
  }

  if (+value < 0 || +value > 100000) {
    callback(new Error("数值取值范围为0-100000"));
  }

  callback();
}

export function thumbsValidator(
  rule: FormItemRule,
  value: Array<any>,
  callback: (error?: string | Error | undefined) => void
) {
  if (value.length === 0) {
    callback(new Error("至少要上传一张图片"));
  }

  callback();
}

export function noValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  const reg = /[0-9a-zA-Z]{5,25}$/;

  if (!value) {
    callback(new Error("不能为空"));
  }

  if (!reg.test(value)) {
    if (value.length < 5 || value.length > 25) {
      callback(new Error("长度为5-25"));
    } else {
      callback(new Error("格式错误，仅支持字母数字组合"));
    }
  }

  callback();
}

export function weightValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("不能为空"));
  }

  if (!Number.isFinite(+value)) {
    callback(new Error("必须为数字"));
  }

  const str = String(value);
  const arr = str.split(".");

  if (arr.length > 1 && arr[1].length > 2) {
    callback(new Error("小数点最多保留两位"));
  }

  if (arr.length > 1 && arr[1].length === 0) {
    callback(new Error("格式错误"));
  }

  callback();
}

export function toggleValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("不能为空"));
  }

  callback();
}

export function ingradientValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("该值不能为空"));
  }

  if (!reg.test(value)) {
    callback(new Error("商品格式有误，提示：只能包含中文英文以及下划线"));
  }

  if (value.length < 1 || value.length > 15) {
    callback(new Error("长度为1-15"));
  }

  callback();
}

export function transferValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("该值不能为空"));
  }

  callback();
}

export function creditValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("该值不能为空"));
  }

  if (!Number.isInteger(+value)) {
    callback(new Error("该参数必须是数字并且是整数"));
  }

  if (+value < 500 || +value > 1000) {
    callback(new Error("该参数取值范围为500-1000"));
  }

  callback();
}

export function passwordValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("该值不能为空"));
  }

  if (value.length < 8 || value.length > 18) {
    callback(new Error("长度范围为8-18"));
  }

  callback();
}

export function seniorValidator(
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | undefined) => void
) {
  if (!value) {
    callback(new Error("该值不能为空"));
  }

  callback();
}
