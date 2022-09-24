const saveInput = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const paintBtn = document.getElementById("paint-btn");
const brushBtn = document.getElementById("brush-btn");
const resetBtn = document.getElementById("reset-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
};

function startPainting(){
  isPainting = true;
};

function cancelPainting(){
  isPainting = false;
  ctx.beginPath();
};


function onLineWidthChange(event){
  ctx.lineWidth = event.target.value;
};

function onColorChange(event){
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
};

function onColorClick(event){
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
};

function onPaintClick(event){
 if(!isFilling){
  isFilling = true;
  paintBtn.innerText = "페인트";
 }
};
function onBrushClick(event){
  if(isFilling){
    isFilling = false;
    brushBtn.innerText = "브러쉬";
   }
};

function onCanvasClick(){
  if(isFilling){
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

function onResetClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick(){
  ctx.strokeStyle = "white";
  isFilling = false
  paintBtn.innerText = "페인트"
}

function onFileChange(event){
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function(){
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  }
}

function onDoubleClick(event){
  const text = textInput.value;
  if(text !== ""){
    ctx.save(); //ctx의 현재 상태를 저장
    ctx.lineWidth = 1;
    ctx.font = "48px serif"
    ctx.fillText(text,event.offsetX, event.offsetY);
    ctx.restore(); //저장해뒀던 버전으로 되돌리기, 기존 체크 포인트로 돌아감
  }
}

function onSaveClick(){
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click(); 
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click",onColorClick));
paintBtn.addEventListener("click", onPaintClick);
brushBtn.addEventListener("click", onBrushClick);
resetBtn.addEventListener("click", onResetClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveInput.addEventListener("click", onSaveClick);