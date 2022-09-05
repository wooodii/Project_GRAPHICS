
const savebtn = decument.getElementById("save");
const textInput = document.getElementById("text"); 
// file input에다가 eventlistener 추가하기
const fileInput = document.getElementById("file");
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
ctx.lineCap="round";
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

function onFilechange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url); // 여기서 생성된 url은 실제 브라우저가 아님, 메모리에서 나타내는 방식
    // 파일은 브라우저의 메모리에 있음 -> 브라우저가 메모리 부분 url전송
    // 브라우저는 항상 유저의 실제 파일 시스템과 격리
    // 자바스크립트 앱은 유저의 파일을 읽을 수 없음 
    // 유저가 파일을 선택했을 대만 브라우저가 파일을 읽을 수 있음 "choose rile"
    const image = new Image() // <img>와 같음
    image.src =url;
    image.onload = function(){
        ctx.drawImage(image,0,0,800,800);
        // draw를 눌렀을 때 이미지 삭제 
        // 이미지를 바꿀 수 있음
        fileInput.value = null;
    }
}

function onDoubleClick(event) {
    const text = textInput.value;
    if(text === ""){
        ctx.save();
        // 변경되는 코드가 실행되기 전에 현 상태, 색상, 스타일을 모두 저장
        // 수정을 완료하면 ctx.restore()
        ctx.lineWidth =1; // 텍스트가 1넚이로 지정되어 잘 보임
        // painting brush도 같이 작아짐 
        ctx.font ="70px serif";
        ctx.strokeText(text ,event.offsetX. event.offsetY);
        // x,y 좌표는 마우스가 클릭한 canvas 내부 좌표
        // 어디에 text를 추가해야하는지에 대한 좌표 
    
        ctx.restore();
        // 이전에 저장된 상태로 돌아감
        // store과 save 사이에서는 어떤 수정을 하던 저장되지 않음
    }
   //  console.log(event.offsetX. event.offsetY);
}

// 완성한 이미지 다운로드
function onSaveClick {
    const url = canvas.toDataURL(); // 캔버스에 그린 그림을 링크로 생성 
    const a = document.createElement("a"); // a캐그로 가짜 링크 만들기
    a.href =url; // 링크의 href는 url로 설정하고 
    a.download = "myDrawing.png"; // 파일명 설정
    a.click(); // 링크를 클릭하면 파일 다운로드
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.onmousemove = onmove;
// 같은 event내에서 많은 eventlietener를 추가할 수 있음
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
fileInput.addEventListener("change",onFilechange);
savebtn.addEventListener("click ", onSaveClick)