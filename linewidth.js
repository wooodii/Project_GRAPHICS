const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("line-width");

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
let ispainting = false;

function onmove(event) {
    if(ispainting) {
        ctx.lineTo(event.offsetX, event.offsetY); 
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, eventoffsetY);
}

function startpainting() { 
    isPainting = true;
}
function cancelpainting() { 
    isPainting = false;
    // 선과 선의 연결을 끊기
    ctx.beginPath;
}
// 선 넓이 조절하는 input 인식 
// 새로운 event값 설정
function onLineWidthChange(event){
    // draw step을 0.5단계로 설정 
    console.log(event.target.value);
    ctx.lineWidth(event.target.value);
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startpainting);
canvas.addEventListener("mouseup", cancelpainting);

canvas.addEventListener("mouseleave", cancelpainting);
// 선 넓이 조절
lineWidth.addEventListener("change", onLineWithChange);