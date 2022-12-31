//Game Constant & variable
let inputDir = {x: 0, y: 0};
//sounds
const osound = new Audio('p2.mp3');
const msound = new Audio('p1.aac');

let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food =  {x: 6, y: 7};

//Scoring data
let data = 0;
document.getElementById("score").innerText = data;

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime) / 1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }       
    }
    //if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }  
    
}

function gameEngine(){
    //part 1 : Updating the snake array and food
    if(isCollide(snakeArr)){
        osound.play();
        msound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game over press any key...")
        snakeArr = [{x:13, y:15}];
        data = 0;
        
    }
    //if you have eaten the food.
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b - a) * Math.random()), y : Math.round(a + (b - a) * Math.random())}
        data++;
        document.getElementById("score").innerText = data;
    }
    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2 : display the snake
    bord.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        bord.appendChild(snakeElement);
    })

    //part 3 : display the food

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        bord.appendChild(foodElement);
}


//main Logic Starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} //start the game
    msound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;    
        default:
            break;
    }
})