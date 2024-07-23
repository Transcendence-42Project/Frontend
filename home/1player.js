const table = document.querySelector(".gametable");
const player = document.querySelector(".player");
const computer = document.querySelector(".computer");
const pScore = document.querySelector(".playerscore");
const cScore = document.querySelector(".computerscore");
const ball = document.querySelector(".ball");

let right = false;
let up = false;
let isGoal = false;
let ballVelocity ;

let printScorePlayer = 0;
let printScoreComputer = 0;

for (let i = 0; i <= 69; i++) {
    let net = document.createElement("div");
    net.classList.add("net");
    net.style.top = (25 * i) + "px";
    table.appendChild(net);
}

let tableBounds = table.getBoundingClientRect();

let keysPressed = {};

window.addEventListener("keypress", (e) => {

    switch (e.key) {
        case 'w':
            keysPressed[0] = true;
            break;
        case 's':
            keysPressed[1] = true;
            break;
        default:
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'w':
            keysPressed[0] = false;
            break;
        case 's':
            keysPressed[1] = false;
            break;
        default:
            break;
    }
});function movePlayers() {
    tableBounds = table.getBoundingClientRect();
    let p = player.getBoundingClientRect();
    let c = computer.getBoundingClientRect();
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let computerTop = parseInt(window.getComputedStyle(computer).getPropertyValue("top"));

    const ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    const ballHeight = ball.getBoundingClientRect().height;
    const computerHeight = computer.getBoundingClientRect().height;

    if (keysPressed[0])
    {
        if (p.top - 23 >= tableBounds.top)
            player.style.top = playerTop - 9 + "px";
    }
    else if (keysPressed[1]) {
        if (p.bottom + 23 <= tableBounds.bottom)
            player.style.top = playerTop + 9 + "px";
    }

    const ballCenter = ballTop + ballHeight / 2;
    const computerCenter = computerTop + computerHeight / 2;
    if (ballCenter < computerCenter) 
    {
        if (c.top - 23 >= tableBounds.top) 
        {
            let newComputerTop = computerTop - (computerCenter - ballCenter) * 0.08;
            computer.style.top = newComputerTop + "px";
        }
    }
    else if (ballCenter > computerCenter) 
    {
        if (c.bottom + 23 <= tableBounds.bottom) 
            {
                let newComputerTop = computerTop - (computerCenter - ballCenter) * 0.08;
                computer.style.top = newComputerTop + "px";
            }
    }
    requestAnimationFrame(movePlayers);
}

requestAnimationFrame(movePlayers);


const initialPosition = () => {
    ball.style.left = "50%";
    ball.style.top = "50%";
    ballVelocity = 1.3;
    let leftRight = Math.floor(Math.random() * 2);
    let upDown = Math.floor(Math.random() * 2);

    right = leftRight === 1;
    up = upDown === 1;
};

initialPosition();

let ballMove = setInterval(() => {
    let playerBounds = player.getBoundingClientRect();
    let computerBounds = computer.getBoundingClientRect();
    let ballBound = ball.getBoundingClientRect();
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));

    if (right && up) {
        ball.style.left = ballLeft + 1 * ballVelocity + "px";
        ball.style.top = ballTop - 1 * ballVelocity + "px";
    } 
    else if (right && !up) {
        ball.style.left = ballLeft + 1 * ballVelocity + "px";
        ball.style.top = ballTop + 1 * ballVelocity + "px";
    }
    else if (!right && up) {
        ball.style.left = ballLeft - 1 * ballVelocity + "px";
        ball.style.top = ballTop - 1 * ballVelocity + "px";
    }
    else if (!right && !up) {
        ball.style.left = ballLeft - 1 * ballVelocity + "px";
        ball.style.top = ballTop + 1 * ballVelocity + "px";
    }

    if (ballBound.bottom >= tableBounds.bottom) {
        up = true;
    } else if (ballBound.top <= tableBounds.top) {
        up = false;
    }

    if (ballBound.left <= playerBounds.right &&
        ballBound.top + ballBound.height >= playerBounds.top &&
        ballBound.top <= playerBounds.bottom) {
        right = true;
        ballVelocity += 0.1;
    }
    if (ballBound.right >= computerBounds.left &&
        ballBound.top + ballBound.height >= computerBounds.top &&
        ballBound.top <= computerBounds.bottom) {
        right = false;
        ballVelocity += 0.1;
    }
    if (ballBound.right >= tableBounds.right) {
        printScorePlayer++;
        pScore.textContent = printScorePlayer;
        isGoal = true;
    }
    if (ballBound.left <= tableBounds.left) {
        printScoreComputer++;
        cScore.textContent = printScoreComputer;
        isGoal = true;
    }
    if (isGoal) {
        setTimeout(() => {
            isGoal = false;
        }, 650);
        initialPosition();
    }
}, 10);


