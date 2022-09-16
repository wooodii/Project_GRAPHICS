// JS에서 HTML 요소에 접근할 수 있도록 작성 
const canvas = document.querySelctor("canvas");

// Cocntext 객체의 메소드 종류 : fillRect, strokeRect.. 
// 그림을 그리기 위해 .getContext() 작성
const ctx = canvas.getContext("2d");

// css와 js에 canvas의 크기를 설정 
canvas.width =800;
canvas.height =800;

// 선 그리기 함수 
// 그림판 좌표의 기준은 왼쪽 위 (x,y) = (0,0)
// ctx.fillRect(x,y,width,height) :  사각형 채우기 
// ctx.rect() : 선 그리기
// ctx.stroke() : 선 그리기  
// ctx.fill() : 선 채우기 
// ctx.arc(x, y, radius, startAngle, endAngle) 
// 원의 시작점 앵글, 끝 앵글 ( 완전한 원 = 2 * Math.PI) 
// ctx.arc(50,50,80,Math.PI,2*Math.PI); : 반원

// 여러개의 사각 형 중 지정한 사각형만 색 채우기
// context에는 순서가 존재함
// ctx.beginPath() : 새로운 경로를 만듦 > 새롭게 시작하는 사각형만 색 채우기 가능 
ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.fill();

ctx.beginPath();
ctx.rect(350, 350, 100, 100);
ctx.rect(450, 450, 100, 100);
ctx.fillStyle = "red";
ctx.fill();

//사각형 그리기
ctx.moveTo(50,50); // 브러쉬 시작점 움직이기 
ctx.lineTo(150, 50); // 현 지점에서 이동해 선을 그리기 
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 150); // 정사각형
ctx.stroke();

// 그림판 팔레트
const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
    ]
    
    ctx.linewidth = 2;
    let x_coord = 0;
    let y_coord = 0;
    function onclick(event){
    ctx.beginPath();
    ctx.moveTo(x_coord,y_coord);
    ctx.strokeStyle = colors[Math.floor(Math.random()*colors.length)];
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    }