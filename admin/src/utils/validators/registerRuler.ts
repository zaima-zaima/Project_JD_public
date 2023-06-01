import { FormRules } from "element-plus";
import { nameValidator, passwordValidator, seniorValidator } from "./funcs";

const rulers = {
  username: [
    {
      validator: nameValidator,
      trigger: "blur",
      required: true,
    },
  ],
  password: [
    {
      validator: passwordValidator,
      trigger: "blur",
      required: true,
    },
  ],
} as FormRules;

export default rulers;
