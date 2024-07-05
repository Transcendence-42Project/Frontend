const table = document.querySelector(".gametable");
const player = document.querySelector(".player");
const computer = document.querySelector(".computer");
const pScore = document.querySelector(".playerscore");
const cScore = document.querySelector(".computerscore");
const ball = document.querySelector(".ball");



let right = false;
let up = false;
let isGoal = false;
let ballVelocity = 1;

/*
let goal = new Audio("./sounds/goal.ogg")
let bounce = new Audio(" ");
let beep = new Audio("");

*/

let printScorePlayer = 0;
let printScoreComputer = 0;

for (let i = 0; i <= 69; i++)
{
	let net = document.createElement("div");
	net.classList.add("net");
	net.style.top=(20*i) +"px";
	table.appendChild(net);
}

let tableBounds = table.getBoundingClientRect()

window.addEventListener("keydown",(e)=> {
    tableBounds = table.getBoundingClientRect();
	let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));

    switch (e.key) {
        case 'w':
            if (playerTop > tableBounds.top) {
                player.style.top = (playerTop - 55) + "px";
            }
            break;
        case 's':
            if (playerTop + player.clientHeight  < tableBounds.bottom) {
                player.style.top = (playerTop + 55) + "px";
            }
            break;
        default:
            break;
		}
})

window.addEventListener("keydown",(e)=> {
    tableBounds = table.getBoundingClientRect();
	let computerTop = parseInt(window.getComputedStyle(computer).getPropertyValue("top"));

    switch (e.key) {
        case 'ArrowUp':
            if (computerTop > tableBounds.top) {
                computer.style.top = (computerTop - 55) + "px";
            }
            break;
        case 'ArrowDown':
            if (computerTop + computer.clientHeight  < tableBounds.bottom) {
                computer.style.top = (computerTop + 55) + "px";
            }
            break;
        default:
            break;
		}
    })

let leftRight = Math.floor(Math.random() * 2 )
let upDown = Math.floor(Math.random() * 2 )
leftRight?right=true:right=false;
upDown?up=true:up=false


let ballMove = setInterval(()=> {
    let playerBounds = player.getBoundingClientRect();
    let computerBounds = computer.getBoundingClientRect();
    let ballBound = ball.getBoundingClientRect();
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    let ballTop  = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    let computerY = Math.floor(ballBound.top)
    // computer.style.top = ballTop + 1.1 +"px";

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

    if (Math.floor(ballBound.bottom) > tableBounds.bottom && right)
    {
    //    bounce.play()
        bounce.currentTime = 0;
        up = true;
        right = true;
    }
    if (Math.floor(ballBound.bottom) > tableBounds.bottom && !right)
    {
    //    bounce.play()
        bounce.currentTime = 0;
        up = true;
        right = false;
    }
    if (Math.floor(ballBound.bottom) < tableBounds.top && !right)
    {
    //    bounce.play()
        bounce.currentTime = 0;
        up = false;
        right = false;
    }
    if (Math.floor(ballBound.bottom) < tableBounds.top && right)
    {
    //    bounce.play()
        bounce.currentTime = 0;
        up = false;
        right = true;
    }

    if ((Math.floor(ballBound.left) < Math.floor(playerBounds.right))
        && (Math.floor(ballBound.left) < Math.floor(playerBounds.right))
        && (Math.floor(ballBound.left) < Math.floor(playerBounds.right))
        && (Math.floor(ballBound.left) < Math.floor(playerBounds.right))
        && !right) {
            // beep.play();  beep.currentTime=0;
        ballVelocity = ballVelocity + 0.3;
        let upDown = Math.floor(Math.random()*2)
        up =(upDown === 0)?false:true
        right = true;
    }
    
    if ((Math.floor(ballBound.left) < Math.floor(computerBounds.right))
        && (Math.floor(ballBound.left) < Math.floor(computerBounds.right))
        && (Math.floor(ballBound.left) < Math.floor(computerBounds.right))
        && (Math.floor(ballBound.left) < Math.floor(computerBounds.right))
        && right) {
            // beep.play();  beep.currentTime=0;
        ballVelocity = ballVelocity + 0.3;
        let upDown = Math.floor(Math.random() * 2)
        up =(upDown === 0)?false:true
        right = false;
    }

    if (Math.floor(ballBound.right) >= tableBounds.right)
    {
        // goal.play(); goal.currentTime = 0;
        printScoreComputer++;
        cScore.textContent = printScoreComputer;
        isGoal = True;
    }

    if (Math.floor(ballBound.left) <= tableBounds.left)
        {
            // goal.play(); goal.currentTime = 0;
            printScorePlayer++;
            pScore.textContent = printScorePlayer;
            isGoal = True;
        }
    
    if (isGoal)
    {
        setTimeout(()=>{isGoal = false},650)
        initialPosition();
    }
}, 1);

const initialPosition=()=> {
    ball.style.left = "50%";
    ball.style.top = "50%";
    ballVelocity = 1.02
    leftRight = Math.floor(Math.random() * 2)
    upDown = Math.floor(Math.random() * 2)
    
    leftRight ? (right = true):(right = false);
    upDown ? (up = true) : (up = false)
}

