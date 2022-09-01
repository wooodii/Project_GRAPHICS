const canvas = document.querySelctor("canvas");

// context- 붓을 지정
const ctx = canvas.getContext("2d");

// canvas에도 적용
// 드로잉 라인을 할 때 여기서만 수정
canvas.width =800;
canvas.height =800;

// canvas 좌표 시스템
// 왼쪽 코너 제일 위 좌표 x,
// x,y,가로, 세로
ctx.rect(40, 40, 100, 100);
ctx.fil(40, 40, 100,100);