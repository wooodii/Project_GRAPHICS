//7) file html 요소 불러오기
const fileInput = document.getElementById("file");

//9) save html 버튼 불러오기 
const savebtn = decument.getElementById("save");

//8) text html요소 가져오기 
const textInput = document.getElementById("text"); 

// 8-7) 선끝을 둥글게 설정 (option : butt/ round/squre)
ctx.lineCap="round";

// 7) 이미지 가져오기
// 브라우저는 항상 유저의 실제 파일 시스템과 격리
// 자바스크립트 앱은 유저의 파일을 읽을 수 없음 
// 유저가 파일을 선택했을 대만 브라우저가 파일을 읽을 수 있음 "choose rile"
// 유저가 이 파일을 선택했기 때문에 브라우저의 메모리에 존재함 
// 파일은 브라우저의 메모리에 있음 -> 브라우저가 메모리 부분 url전송
// URL을 가지고 파일에 접근, 여기서 생성된 url은 실제 브라우저가 아님, 
// 메모리에서 나타내는 방식
function onFileChange(event) {
    const file = event.target.files[0];
    // 브라우저의 메모리에서 파일을 얻어옴
    const url = URL.createObjectURL(file);
    // URL 출력
    console.log(url); 
    // 이미지 만들기 
    const image = new Image() // HTML의 <img>와 같음
    image.src =url;
    // 이미지가 로드되었을 때, 함수 실행
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH,CANVAS_HEIGHT);
        // draw를 눌렀을 때 이미지 삭제 
        // 이미지를 바꿀 수 있음
        
        // 이미지를 그릴 때는 file input을 비우기
        fileInput.value = null;
    }
}

// 8) 더블클릭함수 
function onDoubleClick(event) {
    const text = textInput.value;
    if(text === ""){
        //8-6) 더블클릭해도 텍스트가 비어있다면 실행되지 않도록 함
        ctx.save();
        // 8-3) 변경한코드가 실행되기 전에 현 상태, 색상, 스타일을 모두 저장
        // 수정을 완료하면 ctx.restore()
        ctx.lineWidth =1; 
        // 8-2)  텍스트가 1넚이로 지정되어 잘 보이게 stroke됨
        // painting brush도 같이 작아짐 
        // ctx의 이전상태를 저장할 수 있도록 함 > save()
        ctx.font ="70px serif";
        // 8-5) 폰트 변경
        ctx.strokeText(text ,event.offsetX. event.offsetY);
        // 8-1) offset x,y 좌표는 마우스가 클릭한 canvas 내부 좌표
        // 어디에 text를 추가해야하는지에 대한 좌표 
        ctx.restore();
        // 8-4) 이전에 저장된 상태로 돌아감
        // store과 save 사이에서는 어떤 수정을 하던 저장되지 않음
    }
   //  console.log(event.offsetX. event.offsetY);
}

// 9) 완성한 이미지 저장
function onSaveClick() {
    const url = canvas.toDataURL(); 
    // 캔버스에 그린 그림을 base64 URL 인코딩 링크로 생성 
    const a = document.createElement("a"); 
    // <a>로 가짜 링크 만들기
    a.href = url; 
    // 이전에 이미지 데이터를 저장한 URL 변수로 설정 
    a.download = "myDrawing.png"; 
    // 파일명 설정
    a.click(); 
    // <a>를 클릭하면 파일 다운로드
}

// 8) 더블클릭 함수 불러오기
canvas.addEventListener("dblclick", onDoubleClick);

// 7) 같은 event내에서 많은 eventlietener를 추가할 수 있음
canvas.onmousemove = onmove;
canvas.onmousemove = function() {
    
}
// 7) fileinput 함수 불러오기
fileInput.addEventListener("change",onFileChange);
savebtn.addEventListener("click ", onSaveClick);

//9) savebtn
savebtn.addEventListener("click", onSaveClick);