const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// 캔버스 너비
canvas.width=800;
canvas.height=800; 

// 선 너비
ctx.lineWidth =2;

// 마우스가 눌렸을 때, 그려질 수있도록 변수 추가 
let isPainting =false;

// 마우스 눌릴 때~ 땔 때 까지 선을 그릴 수 있도록 설정
ctx.moveTo(200,200); // 선을 긋지 않고 브러쉬 옮기기
ctx.lineTo(400,400); // 
ctx.stroke(); 

function oneMove(event){
    if(isPainting){ // isPainting =true일때 선을 그리기
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, eventoffsetY);
}

// mousedown 마우스가 눌렸을 때 그리고 싶은 걸 그릴 수 있도록 
function onMouseDown(){
    isPainting = true;
}

// mouseup 마우스를 땠을 때, 그리지 않도록 
function startPainting() {
    isPatinting = false; 
}

// 캔버스 밖으로 마우스가 나갔을 때, 그리기 중지
function cancelPainting() {
    isPainting = false;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", cancelPainting);
canvas.addEventListener("mouseup", startPainting);

// 버그) 캔버스 밖으로 마우스를 끌고 나가면 나간 그대로 인식 
// 더 이상클릭을 안해도 그려짐 => 마우스가 캔버스를 떠났을 때 감지
// 방법1 cancelPainting
// 방법2 document 로인식 
canvas.addEventListener("mouseleave", cancelPainting);
document.addEventListener("mouseup", onMouseUp);