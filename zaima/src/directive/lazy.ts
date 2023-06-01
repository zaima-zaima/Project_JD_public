import { Directive } from "vue";
import imageSrc from "/src/assets/lazyLoading.png";

export default {
  mounted(el: HTMLImageElement, binding, value) {
    const src = el.src;
    el.src = imageSrc;
    const parent = el.parentElement;
    const img = document.createElement("img");
    img.src = src;
    img.style.width = "100%";
    img.style.height = "100%";

    img.addEventListener("load", () => {
      parent?.replaceChild(img, el);
    });
  },
} as Directive;
