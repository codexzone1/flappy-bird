document.addEventListener('DOMContentLoaded',()=>{
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');
     
    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let theGameOver = false;
    let gapBetweenObstacle = 430
    function startGame(){
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let gameTimerId = setInterval(startGame,20);
    function control(e){
       if(e.keyCode === 32){
           jump()
       }
     }     
    function jump(){
            if(birdBottom < 600) birdBottom += 50
            bird.style.bottom = birdBottom + 'px'
        }
    document.addEventListener('keyup',control);  
    function generateObstacle(){
        let obstacleLeft =500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement("div");
        const topObstacle = document.createElement("div");
        if(!theGameOver) {
            obstacle.classList.add("obstacle");
            topObstacle.classList.add("topObstacle")
    }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        
        topObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.bottom = obstacleBottom +gapBetweenObstacle+ 'px'
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'

        function moveObstacle(){
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'
            if(obstacleLeft === -60){
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if(obstacleLeft>200 && obstacleLeft<265 && birdLeft === 220 &&
                birdBottom < obstacleBottom + 155 || birdBottom > obstacleBottom + gapBetweenObstacle -200 || 
                birdBottom === 0){
                gameOver()
                console.log(gameOver);
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle,20)
        if(!theGameOver) setTimeout(generateObstacle,3000)
    }
    generateObstacle()
    function gameOver(){
        clearInterval(gameTimerId);
        theGameOver = true;
        document.removeEventListener('keyup',control);
        
    }
});
