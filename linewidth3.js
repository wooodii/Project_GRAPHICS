// 4) fill 모드 html 버튼 읽어오기
const modebtn = document.getElementById("mode-btn");
// 6)  지우기 html 버튼 읽어오기 
const eraserbtn = document.getElementById("eraser-btn");
// 5) 초기화 html 버튼 읽어오기 
const destorybtn = doucument.getElementById("destory-btn");

// 3) 색상 옵션판을 js배열로 생성 
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
); 
// 2) 색상 선택
const color =document.getElementById("color")

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 1) html input 버튼 작성 후, js에도 동작 
const lineWidth = document.getElementById("line-width");

// 5) 중복되게 들어가는 값들은 변수로 지정해서 입력 
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = 800;
canvas.height = 800;

// 1) lineWidth 초기값 설정 = 5
ctx.lineWidth = lineWidth.value; 

let isPainting = false;

//4) 그림판 채우기 
let isFilling = false;

function onmove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY); 
        ctx.stroke();
        return;
    }
    // 2) 새로운 경로를 만들어서 선 굵기 - 새로운 경로 설정해 적용
    // 이전에 그린 선의 굵기는 변하지 않음 
    ctx.beginPath();
    ctx.moveTo(event.offsetX, eventoffsetY);
}

// 4) Fill mode에서 mousedown을 하면 캔버스 전체를 채우기
function startPainting() { 
    isPainting = true;
}
function cancelPainting() { 
    isPainting = false;
    // 선과 선의 연결을 끊기
    ctx.beginPath;
}

// 1) 선 넓이 조절하는 input 인식 
// 새로운 input 값을 알려줌(event역할)
function onLineWidthChange(event){
    // draw step을 0.5단계로 설정 
    // console.log(event.target.value); 콘솔확인
    ctx.lineWidth = event.target.value;
}

//2) 색 변화 함수 
function onColorChange(event){
   //  console.log(event.target.value); // 색 변경
   ctx.strokeStyle = event.target.value;
   ctx.fillStyle = event.target.value;
   ctx.beginPath();
}

// 3) 어떤 색상판을 클릭했는지 함수 설정 
function oncolorClick(event){
    // 3-1) 사용자에게 색을 선택했는지 표시해줄 수 있도록 설정 
    // colorValue라를 변수를 만들어서 event~를 반복해 쓰지 않도록 함 
    const colorValue = event.target.dataset.color;
    // console.dir(event.target.dataset.color); 
    // event.target안의 dataset에 접근해서 color를 가져옴 
    // 실행해서 색상을 클릭하면 색상값이 호출됨 
    // dir 객체로 볼 수 있게 함 그 중에 하나가 html의 data-color 프로퍼티 확인
    // 요소 안에 data- 를 사용하면 뭐든 넣을 수 있음 
    ctx.strokeStyle = colorValue; //event.target.dataset.color;
    ctx.fillStyle = colorValue; // event.target.dataset.color;
    // 3-1) 어떤 color를 선택했는지 알려줌 > input 박스에 색이 변함 
    color.value=colorValue;
}

// 4) fillmode btn 함수 설정 
function onModeClick() {
    if(isFilling){ // 캔버스 채우기 
        isFilling = false;
        modebtn.innerText = "Fill";
    } else { // 선그리기 
        isFilling = true;
        modebtn.innerText ="Draw";
    }
}

// 4-1) 채우기 모드 일때 동작 함수 
function onCanvasClick() {
    if(isFilling) {
        // 새로운 크기의 캔버스를 만들고, 해당 색상으로 채우기
        ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

// 5) 캔버스 초기화 설정 
// 초기화 = colorpicker에서 white선택, fill(채우기)
function onDestoryClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    isFilling = false;
    // isFilling = false 이므로 텍스트를 Fill   로 변경 
    modebtn.innerText = "Fill"
}

// 6)  캔버스 지우기 
// 지우기 = 하얀색 선으로 페인팅 
function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false; // 채우기 모드 종료
    modebtn.innerText ="Fill"
}

canvas.addEventListener("mousemove", onmove);
canvas.addEventListener("mousedown", startPainting);


canvas.addEventListener("mouseup", cancelPainting);

canvas.addEventListener("mouseleave", cancelPainting);

// 4-1) 캔버스 클릭 
canvas.addEventListener("click",onCanvasClick);

// 1) 선 넓이 조절 함수 호출 
lineWidth.addEventListener("change", onLineWidthChange);
// 2) 색상변화 함수 호출 
color.addEventListener("change", onColorChange);
// 3) 옵션 판 호출
console.log(colorOptions);
// 3) 각 color마다 eventlistener 추가
// color 클릭할 때마다 호출
// foreach는 coloroption의 함수가 아님 ->  html 컬렉션이지 함수가 아님 -> js배열로 지정
colorOptions.forEach(color => color.addEventListener("click", oncolorClick));

// 4) modebtn 함수 호출
modebtn.addEventListener("click",onModeClick);
// 5) destory btn 함수 호출 
destorybtn.addEventListener("click", onDestoryClick);
// 6) eraser btn 함수 호출
eraserbtn.addEventListener("click", onEraserClick);