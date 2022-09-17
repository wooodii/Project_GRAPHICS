const canvas =document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// 캔버스 너비
canvas.width=800;
canvas.height=800; 

// 선 너비
ctx.lineWidth =2;

// 과제) mousedraw 클릭할때마다 색이 바뀔 수 있도록 설정
// 선을 그릴 때마다 색을 다르게 적용 
const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
];

ctx.moveTo(0,0);
// 처음 그릴 때, 0,0에서 시작될 수 있도록
// 두번을 클릭해야 처음 위치에서 이동하면서 그림이 그려짐 

function onClick(event){
    ctx.beginPath(); // 경로를 다르게 주어서 모든 선의 색이 다르게 출력
    // js는 항상 event
    // console.log(event);
    // 어던 event를 줄 수 있는지 콘솔로 확인 
    // offsetX , offsetY 그림 그릴 수 있는 점 설정
    ctx.moveTo(400,400);
    // 움직일 때마다 0,0으로 이동함 
    const color = colors[Math.floor(Math.random()*colors.length)]
    // color이라는 배열을 만들어서 담아 클릭시 랜덤으로 출력
    // 같은 경로에서 그려지므로 모든 색이 변함
    ctx.strokeStyle = color; 
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("click", onClick)
canvas.addEventListener("mousemove", onClick)
// 마우스를 움직일 때마다, 그려짐 (부채꼴 모양)