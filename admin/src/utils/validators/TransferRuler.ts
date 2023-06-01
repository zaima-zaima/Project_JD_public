import { FormRules } from "element-plus";
import { transferValidator } from "./funcs";

const rulers = {
  to: [
    {
      validator: transferValidator,
      trigger: "change",
      required: true,
    },
  ],

  seniorFromDepartment: [
    {
      validator: transferValidator,
      trigger: "change",
      required: true,
    },
  ],
} as FormRules;

export default rulers;
