const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key === 38 && direction !== "DOWN") direction = "UP";
  else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw Snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#00ff00" : "#33cc33";
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  // Draw Food
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, box, box);

  // Move Snake
  const head = { ...snake[0] };

  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Game Over - Wall or Self Collision
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
    location.reload();
  }

  snake.unshift(head);

  // Eat Food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

const game = setInterval(draw, 150);
