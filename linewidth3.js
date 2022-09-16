const modebtn = document.getElementById("mode-btn");
const eraserbtn = document.getElementById("eraser-btn");
const destorybtn = doucument.getElementById("destory-btn");
const coloroption = Array.from(
    document.getElementsByClassName("color-option")
); // html collection을 배열을 생성
const color =document.getElementById("color")
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("line-width");
const Canvaswidth = 800;
const Canvasheight = 800;

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
let ispainting = false;
let isFilling = false;

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

function onColorChange(event){
   //  console.log(event.target.value); // 색 변경
   ctx.strokeStyle = event.target.value;
   ctx.fillStyle = event.target.value;
}

function oncolorClick(event){
    const colorValue = event.target.dataset.color;
    // console.dir(event.target.dataset.color); 
    // dir 객체로 볼 수 있게 함 그 중에 하나가 html의  data-color
    ctx.strokeStyle = colorValue; //event.target.dataset.color;
    ctx.fillStyle = colorValue; // event.target.dataset.color;

    //어떤 color를 선택했는지 표시
    color.value=colorValue;
}

function onmodeclick() {
    if(isFilling){
        isFilling = false;
        modebtn.innerText = "Fill";
    } else {
        isFilling = true;
        modebtn.innerText ="Draw";
    }
}

// 채우기 모드 함수
function oncanvasclick() {
    if(isFilling) {
        ctx.fillRect(0,0,800,800);
    }
}

// 캔버스 초기상태 설정 
// 초기화 = colorpicker에서 white선택, fill로
// 캔버스 채우기 
function ondestoryclick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, Canvaswidth, Canvasheight);
    modebtn.innerText = "Fill"
}

// 캔버스 지우기 
function onEraserclick() {
    ctx.strokeStyle = "white";
    isFilling = false;
}

canvas.addEventListener("mousemove", onmove);
canvas.addEventListener("mousedown", startpainting);
canvas.addEventListener("mouseup", cancelpainting);

canvas.addEventListener("mouseleave", cancelpainting);
canvas.addEventListener("click",oncanvasclick);
// 선 넓이 조절
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

console.log(coloroption);

coloroption.forEach(color => color.addEventListener("click", oncolorClick));
// foreach는 coloroption의 함수가 아님 ->  html 컬렉션이지 함수가 아님
// 각 color마다 eventlistener 추가

modebtn.addEventListener("click",onmodeclick);

destorybtn.addEventListener("click", ondestoryclick);

eraserbtn.addEventListener("click", onEraserclick);