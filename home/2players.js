const table = document.querySelector(".gametable");
const player = document.querySelector(".player");
const computer = document.querySelector(".computer");
const pScore = document.querySelector(".playerscore");
const cScore = document.querySelector(".computerscore");
const ball = document.querySelector(".ball");
const pausedMessage = document.querySelector(".paused-message")


let right = false;
let up = false;
let isGoal = false;
let ballVelocity = 1;

let printScorePlayer = 0;
let printScoreComputer = 0;

let tableBounds = table.getBoundingClientRect();

let keysPressed = {};

let isPaused = true;
let spacePressed = false;
let timeoutId;
let animationId;

for (let i = 0; i <= 69; i++) {
    let net = document.createElement("div");
    net.classList.add("net");
    net.style.top = (25 * i) + "px";
    table.appendChild(net);
}

window.addEventListener("keypress", (e) => {
    switch (e.key) {
        case 'w':
            keysPressed[0] = true;
            break;
        case 's':
            keysPressed[1] = true;
            break;
        case 'y':
            keysPressed[2] = true;
            break;
        case 'h':
            keysPressed[3] = true;
            break;
        default:
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case ' ':
            isPaused = !isPaused;
            pausedMessage.style.display = isPaused ? 'block' : 'none';
        case 'w':
            keysPressed[0] = false;
            break;
        case 's':
            keysPressed[1] = false;
            break;
        case 'y':
            keysPressed[2] = false;
            break;
        case 'h':
            keysPressed[3] = false;
            break;
        default:
            break;
    }
});

function movePlayers() {
    tableBounds = table.getBoundingClientRect();
    let p = player.getBoundingClientRect();
    let c = computer.getBoundingClientRect();
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let computerTop = parseInt(window.getComputedStyle(computer).getPropertyValue("top"));

    if (!isPaused && keysPressed[0]) {
        if (p.top - 23 >= tableBounds.top)
            player.style.top = playerTop - 9+ "px";
    }
    else if (!isPaused && keysPressed[1]) {
        if (p.bottom + 23 <= tableBounds.bottom)
            player.style.top = playerTop + 9+ "px";
    }
    if (!isPaused && keysPressed[2]) {
        if (c.top - 23 >= tableBounds.top)
            computer.style.top = computerTop - 9 +"px";
    }
    else if (!isPaused && keysPressed[3]) {
        if (c.bottom + 23 <= tableBounds.bottom)
            computer.style.top = computerTop + 9 + "px";    
    }
    animationId = requestAnimationFrame(movePlayers);
}

const initialPosition = () => {
    ball.style.left = "50%";
    ball.style.top = "50%";
    player.style.top = "40%";
    computer.style.top = "40%";
    ballVelocity = 1.3;
    let leftRight = Math.floor(Math.random() * 2);
    let upDown = Math.floor(Math.random() * 2);
    
    right = leftRight === 1;
    up = upDown === 1;
};

function changeStyle() 
{
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    if (right && up) 
    {
        ball.style.left = ballLeft + 1 * ballVelocity + "px";
        ball.style.top = ballTop - 1 * ballVelocity + "px";
    }
    else if (right && !up) 
    {
        ball.style.left = ballLeft + 1 * ballVelocity + "px";
        ball.style.top = ballTop + 1 * ballVelocity + "px";
    }
    else if (!right && up) 
    {
        ball.style.left = ballLeft - 1 * ballVelocity + "px";
        ball.style.top = ballTop - 1 * ballVelocity + "px";
    }
    else if (!right && !up) 
    {
        ball.style.left = ballLeft - 1 * ballVelocity + "px";
        ball.style.top = ballTop + 1 * ballVelocity + "px";
    }
}

function calculateRotation() {
    let playerBounds = player.getBoundingClientRect();
    let computerBounds = computer.getBoundingClientRect();
    let ballBound = ball.getBoundingClientRect();

    if (ballBound.bottom >= tableBounds.bottom) { up = true; } 
    else if (ballBound.top <= tableBounds.top)  { up = false; }

    if (ballBound.left <= playerBounds.right &&
        ballBound.top + ballBound.height >= playerBounds.top &&
        ballBound.top <= playerBounds.bottom) 
    {
        right = true;
        ballVelocity += 0.1;
    }
    if (ballBound.right >= computerBounds.left &&
        ballBound.top + ballBound.height >= computerBounds.top &&
        ballBound.top <= computerBounds.bottom) 
    {
        right = false;
        ballVelocity += 0.1;
    }
    if (ballBound.right >= tableBounds.right) 
    {
        printScorePlayer++;
        pScore.textContent = printScorePlayer;
        isGoal = true;
    }
    if (ballBound.left <= tableBounds.left) 
    {
        printScoreComputer++;
        cScore.textContent = printScoreComputer;
        isGoal = true;
    }
}

function startBallMove() {
	let ballMove = setInterval(() => {
        if (isPaused) { return; }
        changeStyle();
        calculateRotation();
        let maxScore = 5;
        if (printScorePlayer == maxScore || printScoreComputer == maxScore) 
        {
            clearInterval(ballMove);
            cancelAnimationFrame(animationId);
            ball.style.display = 'none';
            const winnerMessage = document.querySelector('.winner-message');
            if (printScorePlayer == maxScore) {
                winnerMessage.textContent = "Player LEFT won!";
            }
            else if (printScoreComputer == maxScore) {
                winnerMessage.textContent = "Player RIGHT won!";
            }
            winnerMessage.style.display = 'block';
            const replayButton = document.querySelector('.replay-button');
            const quitButton = document.querySelector('.quit-button');
            winnerMessage.style.display = 'none';
            replayButton.style.display = 'block';
            quitButton.style.display = 'block';
            
            document.addEventListener('click', (event) => {
                if (event.target === replayButton) {
                    replayButton.style.display = 'none';
                    quitButton.style.display = 'none';
                    resetGame();
                }
                else if (event.target === quitButton) {
                    quitButton.style.display = 'none';
                    table.style.display = 'none';
                    document.getElementById('buttons').style.display = 'block';
                }
            });   
        }
        if (isGoal) 
        {
            setTimeout(() => {
                isGoal = false;}, 650);
            initialPosition();
        }
        

    }, 10);
}

function gameStart() {
    animationId = requestAnimationFrame(movePlayers);
    initialPosition();
	startBallMove();
}

function resetGame() {
    printScorePlayer = 0;
    printScoreComputer = 0;
    pScore.textContent = printScorePlayer;
    cScore.textContent = printScoreComputer;
    ball.style.display = 'block';
    isPaused = true;
    pausedMessage.style.display = 'block';
    gameStart();
}


gameStart();