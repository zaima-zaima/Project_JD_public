import { Directive } from "vue";

const canvas = document.createElement("canvas");
const style = document.createElement("style");
style.innerHTML = `
@keyframes loading {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg)
    }
}
`;

canvas.width = 50;
canvas.height = 50;
const ctx = canvas.getContext("2d");
if(ctx) {
    ctx.strokeStyle = "#f0f";
    ctx.arc(25, 25, 25, 90, -120);
    ctx.stroke()
}

canvas.style.animation = `loading 1s infinite`;
canvas.style.position = "absolute";
canvas.style.left = "50%";
canvas.style.top = "50%";
canvas.style.transform = `translate(-50%,-50%)`;

export default {
    mounted(elem:HTMLElement,binding) {
        if(binding.value) {
            document.head.appendChild(style);
            elem.appendChild(canvas)
        } else {
            canvas.remove();
            style.remove();
        }
    },
    updated(elem:HTMLElement,binding) {
        if(binding.value) {
            document.head.appendChild(style);
            elem.appendChild(canvas)
        } else {
            canvas.remove();
            style.remove();
        }
    }
} as Directive;

