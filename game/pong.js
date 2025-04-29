// Get the canvas and context
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 5,
  dy: 5,
};

// Paddles
const paddleHeight = 80;
const paddleWidth = 10;
const leftPaddle = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 5,
};
const rightPaddle = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 5,
};

// Score
let leftScore = 0;
let rightScore = 0;

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ff0000"; // Red color
  ctx.fill();
  ctx.closePath();
}

// Draw paddles
function drawPaddles() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  ctx.fillRect(
    rightPaddle.x,
    rightPaddle.y,
    rightPaddle.width,
    rightPaddle.height
  );
}

// Draw score
function drawScore() {
  ctx.font = "24px Arial";
  ctx.fillText("Player 1: " + leftScore, 50, 50);
  ctx.fillText("Player 2: " + rightScore, canvas.width - 200, 50);
}

// Collision detection
function collisionDetection() {
  // Left paddle
  if (
    ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + leftPaddle.height
  ) {
    ball.dx = -ball.dx;
  }
  // Right paddle
  if (
    ball.x + ball.radius > rightPaddle.x &&
    ball.y > rightPaddle.y &&
    ball.y < rightPaddle.y + rightPaddle.height
  ) {
    ball.dx = -ball.dx;
  }
}

// Update game state
// Update game state
function update() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Check ball collision with top and bottom walls
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy = -ball.dy;
  }

  // Check ball collision with left and right walls
  if (ball.x - ball.radius < 0) {
    rightScore++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    leftScore++;
    resetBall();
  }

  // Check if one player reached 10 points to end the game
  if (leftScore === 10 || rightScore === 10) {
    endGame();
    return; // Stop the update process
  }

  // Move paddles
  if (
    leftPaddle.y + leftPaddle.dy > 0 &&
    leftPaddle.y + leftPaddle.dy < canvas.height - leftPaddle.height
  ) {
    leftPaddle.y += leftPaddle.dy;
  }
  if (
    rightPaddle.y + rightPaddle.dy > 0 &&
    rightPaddle.y + rightPaddle.dy < canvas.height - rightPaddle.height
  ) {
    rightPaddle.y += rightPaddle.dy;
  }

  // Perform collision detection
  collisionDetection();
}

// Function to end the game
function endGame() {
  // Display the winner
  if (leftScore === 10) {
    alert("Player 1 wins!");
  } else {
    alert("Player 2 wins!");
  }

  // Stop the game loop
  cancelAnimationFrame(gameLoop);
}

// Reset ball to center
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
}

// Draw everything
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw objects
  drawBall();
  drawPaddles();
  drawScore();
}

// Main game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    leftPaddle.dy = -5;
  } else if (event.key === "s") {
    leftPaddle.dy = 5;
  }
  if (event.key === "ArrowUp") {
    rightPaddle.dy = -5;
  } else if (event.key === "ArrowDown") {
    rightPaddle.dy = 5;
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key === "w" || event.key === "s") {
    leftPaddle.dy = 0;
  }
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    rightPaddle.dy = 0;
  }
});

// Start the game loop
gameLoop();
