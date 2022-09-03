const canvas =document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width=800;
canvas.height=800; 

ctx.lineWidth =2; 
let isPainting = false;

function onMove(event){
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startpainting() { // 마우스를 누른 상태
    isPainting = true;
}
function cancelpainting() { // 마우스를 누르지 않은 상태
    isPainting = false;
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startpainting);
canvas.addEventListener("mouseup", cancelpainting);

// 마우스가 그림판 밖 영역을 떠났을 때 감지하는 방법 
canvas.addEventListener("mouseleave", cancelpainting);