let redPos = 10;
let bluePos = 10;
const speed = 9;

let redKey = true;
let blueKey = true;

let racing = false;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultsDisplay = document.getElementById("results");
document.addEventListener("keydown", keyboardHandler);
document.body.style.backgroundColor = "#b3ccf5";

const redCar = document.getElementById("redcar");
const blueCar = document.getElementById("bluecar");
const btn = document.getElementById("startbutton");

const finishLine = canvas.width - 15;

let drawID = setInterval(draw, 33);

let blueImg = new Image();
blueImg.src = "img/newanimation.png";

let redImg = new Image();
redImg.src = "img/redAnimation.png";

// Define the number of columns and rows in the sprite
let numColumns = 8;
let numRows = 1;

// Define the size of a frame
let frameWidth = blueImg.width / numColumns;
let frameHeight = blueImg.height / numRows;
let maxFrame = numColumns * numRows - 1;

// The sprite image frame starts from 0
let currentFrame = 0;

function startGame() {
  btn.style.visibility = "hidden";
  redPos = 10;
  bluePos = 10;
  redKey = true;
  blueKey = true;
  racing = false;
  countDown(3);
}

function countDown(time) {
  if (time == 0) {
    resultsDisplay.innerHTML = "GO!";
    racing = true;
    return;
  }
  resultsDisplay.innerHTML = time;
  setTimeout(countDown, 1000, time - 1);
}

function drawTrack() {
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ccac39"; // yellow
  for (let i = 0; i < canvas.width; i += 14) {
    ctx.fillRect(i, canvas.height / 2, 7, 2);
  }
  ctx.fillStyle = "black";
  ctx.fillRect(finishLine, 0, 7, canvas.height);
}

function draw() {
  drawTrack();

  //   setInterval(function () {
  // Pick a new frame
  currentFrame++;

  // Make the frames loop
  if (currentFrame > maxFrame) {
    currentFrame = 0;
  }

  // Update rows and columns
  let column = currentFrame % numColumns;
  let row = Math.floor(currentFrame / numColumns);

  //draw
  ctx.drawImage(
    blueImg,
    column * frameWidth,
    row * frameHeight,
    frameWidth,
    frameHeight,
    bluePos,
    7,
    frameWidth,
    frameHeight
  );

  ctx.drawImage(
    redImg,
    column * frameWidth,
    row * frameHeight,
    frameWidth,
    frameHeight,
    redPos,
    46,
    frameWidth,
    frameHeight
  );

  //Wait for next step in the loop
  //   }, 100);

  //set interval sets frames, but because of how the game is structured the animation works better without it
}

function detectWin() {
  if (bluePos + 32 > finishLine) {
    racing = false;
    resultsDisplay.innerHTML = "Blue wins!";
    btn.innerHTML = "Play again";
    btn.style.visibility = "visible";
  } else if (redPos + 32 > finishLine) {
    racing = false;
    resultsDisplay.innerHTML = "Red wins!";
    btn.innerHTML = "Play again";
    btn.style.visibility = "visible";
  }
}

function keyboardHandler(event) {
  if (!racing) {
    return;
  }

  if (event.keyCode == 65) {
    // a
    if (redKey) {
      redPos += speed;
      redKey = false;
    }
  } else if (event.keyCode == 83) {
    // s
    if (!redKey) {
      redPos += speed;
      redKey = true;
    }
  } else if (event.keyCode == 74) {
    // j
    if (blueKey) {
      bluePos += speed;
      blueKey = false;
    }
  } else if (event.keyCode == 75) {
    // k
    if (!blueKey) {
      bluePos += speed;
      blueKey = true;
    }
  }

  detectWin();
}
