import { FormRules } from "element-plus";
import { creditValidator } from "./funcs";

const rulers = {
  credit: [
    {
      validator: creditValidator,
      trigger: "blur",
      required: true,
    },
  ],
} as FormRules;

export default rulers;
