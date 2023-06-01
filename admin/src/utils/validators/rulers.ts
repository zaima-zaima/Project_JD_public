import { FormRules } from "element-plus";
import {
  ingradientValidator,
  nameValidator,
  noValidator,
  priceValidator,
  storeValidator,
  thumbsValidator,
  toggleValidator,
  weightValidator,
} from "./funcs";

const rulers = {
  name: [
    {
      validator: nameValidator,
      trigger: "blur",
      required: true,
    },
  ],
  price: [
    {
      validator: priceValidator,
      trigger: "blur",
      required: true,
    },
  ],
  store: [
    {
      validator: storeValidator,
      trigger: "blur",
      required: true,
    },
  ],
  thumbs: [
    {
      validator: thumbsValidator,
      trigger: "",
      required: true,
    },
  ],
  desc: [
    {
      validator: thumbsValidator,
      trigger: "",
      required: true,
    },
  ],
  brand: [
    {
      validator: nameValidator,
      trigger: "blur",
      required: true,
    },
  ],
  no: [
    {
      validator: noValidator,
      trigger: "blur",
      required: true,
    },
  ],
  weight: [
    {
      validator: weightValidator,
      trigger: "blur",
      required: true,
    },
  ],
  ingradient: [
    {
      validator: ingradientValidator,
      trigger: "change",
      required: true,
    },
  ],
  approperate: [
    {
      validator: toggleValidator,
      trigger: "change",
      required: true,
    },
  ],

  region: [
    {
      validator: toggleValidator,
      trigger: "change",
      required: true,
    },
  ],

  specification: [
    {
      validator: toggleValidator,
      trigger: "change",
      required: true,
    },
  ],
} as FormRules;

export default rulers;
