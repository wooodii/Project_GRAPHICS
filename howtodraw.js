const canvas = document.querySelctor("canvas");
const ctx = canvas.getContext("2d");
canvas.width =800;
canvas.height =800;

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