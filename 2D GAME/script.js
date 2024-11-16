//key Event
function keyCheck(event){

//Enter key
if(event.which==13){
    if(runWorkerId == 0){

        runWorkerId = setInterval(run,100);
        runSound.play();

        moveBackgroundWorkerId = setInterval(moveBackground,100);
        scoreWorkerId = setInterval(updateScore,100);
        createBlockWorkerId = setInterval(createBlock,100);
        moveBlockWorkerId= setInterval(moveBlock,100);
    }
  
}
    //space key
    if(event.which==32){

        if(jumpWorkerId == 0){

            clearInterval(runWorkerId);
            runWorkerId = -1;
            runSound.pause();

            jumpWorkerId = setInterval(jump,100);
            jumpSound.play();

            
            
        }

    }
}

//Run Sound
var runSound = new Audio("run.mp3");
runSound.loop = true;

//Jump Sound
var jumpSound = new Audio("jump.mp3");

//Dead Sound
var deadSound = new Audio("dead.mp3");



//Boy
var boyId = document.getElementById("boy");

//Boy Run
var runWorkerId = 0;
var runImageNumber = 1;

function run(){

    runImageNumber++;   //Increment( 1 + 1 )

    //Run Image Crash
    if(runImageNumber==9){
        runImageNumber=1;   
    }

    boyId.src = "Run (" +runImageNumber+ ").png";

}


//Boy Jump
var jumpWorkerId = 0;
var jumpImageNumber = 1;
var boyMarginTop = 400;

function jump(){

    jumpImageNumber++;

    //Jump Fly
    if(jumpImageNumber <=7 ){
        boyMarginTop = boyMarginTop - 30;
        boyId.style.marginTop = boyMarginTop + "px";

    }

    //Jump Land
    if(jumpImageNumber >=8 ){
        boyMarginTop = boyMarginTop + 30;
        boyId.style.marginTop = boyMarginTop + "px";
    }

    //Jump Image Crash
    if(jumpImageNumber==13){
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run,100);
        runSound.play();

        jumpWorkerId = 0;

            //Starting a Jump
                if(scoreWorkerId==0){
                    scoreWorkerId = setInterval(updateScore,100);
                }

                if(moveBackgroundWorkerId==0){
                    moveBackgroundWorkerId = setInterval(moveBackground,100);
                }

                if(createBlockWorkerId==0){
                    createBlockWorkerId = setInterval(createBlock,100);
                }

                if(moveBlockWorkerId==0){
                    moveBlockWorkerId = setInterval(moveBlock,100);
                }
                    
    }

    boyId.src = "Jump (" +jumpImageNumber+ ").png";

}


//Background
var backgroundId = document.getElementById("background");
var moveBackgroundWorkerId = 0;
var positionX = 0;

function moveBackground(){

    positionX = positionX - 20;
    backgroundId.style.backgroundPositionX = positionX + "px";
  
}


//Score
var scoreId = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0;

function updateScore(){
    newScore++;
    scoreId.innerHTML = newScore;
}


//Create Block
var blockMarginLeft = 400;
var createBlockWorkerId = 0;
var blockNumber = 1;

function createBlock(){
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockNumber;

    blockNumber++;

    var gap = Math.random()*(1000-400)+400;

    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);

    backgroundId.appendChild(block);
}

//Move Block
var moveBlockWorkerId =0;

function moveBlock() {
    for (var i = 1; i <=blockNumber; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";

        //alert(newBlockMarginLeft);
        //143-123
        if(newBlockMarginLeft < 143 & newBlockMarginLeft > 123){
            //alert(boyMarginTop);
            
            //370
            if(boyMarginTop > 280){
                
                clearInterval(runWorkerId);
                runSound.pause();

                clearInterval(jumpWorkerId);
                jumpWorkerId = -1;

                clearInterval(scoreWorkerId);
                clearInterval(moveBackgroundWorkerId);
                clearInterval(createBlockWorkerId);
                clearInterval(moveBlockWorkerId);

                deadWorkerId = setInterval(dead,100);
                deadSound.play();
                //alert("Dead!");


            }
            
        }


    }
}

//Boy Dead
var deadWorkerId = 0;
var deadImageNumber = 1;

function dead(){
     
    deadImageNumber++;

    //Dead Image Crash

    if(deadImageNumber==11){
        deadImageNumber =10;

        boyId.style.marginTop = "400px";

        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;

    }
    boyId.src = "Dead (" +deadImageNumber+ ").png";
}

//Page Relord

function reload(){
    location.reload();
}