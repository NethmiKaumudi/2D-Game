var enterAudio = document.getElementById("enterAudio");
var spaceAudio = document.getElementById("spaceAudio");
var gameOverAudio = document.getElementById("gameOverAudio");

var gameStarted = false; // Add this variable to track game state

function initGame() {
    // Show the starting page
    document.getElementById("startingPage").style.display = "block";

    // Hide the game content
    document.getElementById("backGround").style.display = "none";

    // Add any other game initialization logic here
    // Call the createBoxes function to create the boxes
    createBoxes();

    // Call the idleAnimationStart function to start idle animation
    idleAnimationStart();
}

function startGame() {
    // Hide the starting page
    document.getElementById("startingPage").style.display = "none";

    // Show the game content
    document.getElementById("backGround").style.display = "block";

    // Add any game initialization logic here
    gameStarted = true;


}

document.getElementById("startButton").addEventListener("click", function () {
    if (!gameStarted) {
        startGame();
    }
});

//Catch character here.......................
var cat = document.getElementById("cat");
var cat2 = document.getElementById("cat1");


idleImageNumber = 1;
idleAnimationNumber = 0;

//idle animation............................

function idleAnimation() {
    idleImageNumber = idleImageNumber + 1;
    if (idleImageNumber == 11) {
        idleImageNumber = 1;
    }
    cat.src = "../Assest/character/Idle (" + idleImageNumber + ").png";
    cat2.src = "../Assest/character/Idle (" + idleImageNumber + ").png";

}

function idleAnimationStart() {
    let idleAnimationNumber = setInterval(idleAnimation, 200);
}

//Run animation...................


runImageNumber = 1;
runAnimationNumber = 0;

function runAnimation() {
    runImageNumber = runImageNumber + 1;
    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    cat.src = "../Assest/character/run (" + runImageNumber + ").png";

}

function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 100);
    clearInterval(idleAnimationNumber);
}


// Event listener for the Enter key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && gameStarted) {
        // Start the game and set gameStarted to true
        // startGame();
        // gameStarted = true;
        if (runAnimationNumber == 0) {
            runAnimationStart();
            if (moveBackGroundAnimationId == 0) {
                moveBackGroundAnimationId = setInterval(moveBackground, 100);
                enterAudio.play();
            }
            if (boxAnimationId == 0) {
                boxAnimationId = setInterval(boxAnimation, 100);
            }
        } else {
            // Stop the Enter sound if it's playing
            enterAudio.pause();
        }
    }
});



//BackGround Move Animation.................................

var backGroundImagePositionX = 0;
var moveBackGroundAnimationId = 0
var score = 0;

function moveBackground() {
    backGroundImagePositionX = backGroundImagePositionX - 20;
    document.getElementById("backGround").style.backgroundPositionX = backGroundImagePositionX + "px";
    score = score + 1;
    document.getElementById("score1").innerHTML = score;

}

//Jump Animation.................
jumpImageNumber = 1;
jumpAnimationNumber = 0;
let isJumping = false;
catMarginTop = 520;

function jumpAnimation() {
    jumpImageNumber = jumpImageNumber + 1;
    if (jumpImageNumber <= 5) {
        catMarginTop = catMarginTop - 50;
        cat.style.marginTop = catMarginTop + "px";
    }
    if (jumpImageNumber >= 6) {
        catMarginTop = catMarginTop + 50;
        cat.style.marginTop = catMarginTop + "px";
    }

    if (jumpImageNumber == 9) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runImageNumber = 0;
        runAnimationStart();
    }
    cat.src = "../Assest/character/Jump (" + jumpImageNumber + ").png";

}


function jumpAnimationStart() {
    clearInterval(idleAnimationNumber);
    runImageNumber = 0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 150);

}

document.addEventListener('keydown', function (event) {
    if (event.key === ' ' && gameStarted) {
        if (jumpAnimationNumber == 0) {
            jumpAnimationStart();
            spaceAudio.play();
        } else {
            // Stop the Space sound if it's playing
            spaceAudio.pause();
        }
        if (moveBackGroundAnimationId == 0) {
            moveBackGroundAnimationId = setInterval(moveBackground, 100);
        }
        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(boxAnimation, 100);
        }
    }
});
boxMarginLeft = 1800;
var boxAnimationId = 0;

function createBoxes() {
    for (var i = 0; i <= 10; i++) {
        var box = document.createElement("div");
        box.className = "box";
        document.getElementById("backGround").appendChild(box);
        box.style.marginLeft = boxMarginLeft + "px";
        //boxMarginLeft=boxMarginLeft+1000;
        box.id = "box" + i;
        if (i < 5) {
            boxMarginLeft = boxMarginLeft + 2000;

        }
        if (i >= 5) {
            boxMarginLeft = boxMarginLeft + 1000;
        }
    }


}

function boxAnimation() {
    let isJumping = false; // You should define isJumping within the function

    for (let i = 0; i < 10; i++) {
        var box = document.getElementById("box" + i);
        var currentMarginLeft = parseInt(getComputedStyle(box).marginLeft); // Parse the margin value to an integer
        var newMarginLeft = currentMarginLeft - 35;
        box.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft >= -110 && newMarginLeft <= 100) {
            if (catMarginTop > 500) {
                clearInterval(boxAnimationId);
                clearInterval(runAnimationNumber);
                runAnimationNumber = -1;
                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;
                clearInterval(moveBackGroundAnimationId);
                moveBackGroundAnimationId = -1;
                startDeathAnimation(); // Start the death animation
            }
        }
    }
}

let deathAnimationNumber = 0;
let deathImageNumber = 1;

function startDeathAnimation() {
    deathAnimationNumber = setInterval(catDeathAnimation, 100);
}

function catDeathAnimation() {
    deathImageNumber = deathImageNumber + 1;
    if (deathImageNumber == 11) {
        deathImageNumber = 10;
        gameOverAudio.play();
        enterAudio.pause();
        spaceAudio.pause();
        // You can add logic here to handle game over or restart
        document.getElementById("gameOverScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }
    cat.src = "../Assest/character/Dead (" + deathImageNumber + ").png";
}

function reload() {
    location.reload();
    // // Stop any playing audio
    // enterAudio.pause();
    // spaceAudio.pause();
    // gameOverAudio.pause();
    //
    // // Reset game state
    // score = 0;
    // document.getElementById("score1").innerHTML = score;
    //
    // // Clear any intervals (e.g., animations)
    // clearInterval(boxAnimationId);
    // clearInterval(runAnimationNumber);
    // clearInterval(jumpAnimationNumber);
    // clearInterval(moveBackGroundAnimationId);
    // clearInterval(deathAnimationNumber);
    //
    // // Hide the game-over screen
    // document.getElementById("gameOverScreen").style.visibility = "hidden";
    //
    // // Go back to the starting page
    // // document.getElementById("startingPage").style.display = "none";
    // // document.getElementById("backGround").style.display = "block";
    // startGame();
    // catMarginTop = initialCatMarginTop;
    // cat.style.marginTop = catMarginTop + "px";

}

