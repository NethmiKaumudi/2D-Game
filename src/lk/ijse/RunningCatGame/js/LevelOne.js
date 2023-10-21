var enterAudio = document.getElementById("enterAudio");
var spaceAudio = document.getElementById("spaceAudio");
var gameOverAudio = document.getElementById("gameOverAudio");
var winSound = document.getElementById("winSound");

var gameStarted = false;
var cat = document.getElementById("cat");
var cat2 = document.getElementById("cat1");
let score = 0;

function initGame() {
    document.getElementById("startingPage").style.display = "block";
    document.getElementById("backGround").style.display = "none";
    createBoxes();
    idleAnimationStart();
}

function startGame() {
    document.getElementById("startingPage").style.display = "none";
    document.getElementById("backGround").style.display = "block";
    gameStarted = true;
    // Add your code here to initialize the game after starting.
    // For example, you can start animations, play sounds, etc.
    // runAnimationStart();
    // moveBackGroundAnimationId = setInterval(moveBackground, 100);
}

document.getElementById("startButton").addEventListener("click", function () {
    if (!gameStarted) {
        startGame();
    }
});


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
            enterAudio.pause();
        }
    }
});


//BackGround Move Animation.................................

var backGroundImagePositionX = 0;
var moveBackGroundAnimationId = 0

// var score = 0;

function moveBackground() {
    if (score >= 250) {
        // Score is already 150 or more, no further scoring
        return;
    }
    backGroundImagePositionX = backGroundImagePositionX - 20;
    document.getElementById("backGround").style.backgroundPositionX = backGroundImagePositionX + "px";
    score = score + 1;
    document.getElementById("score1").innerHTML = score;
    checkForWin();

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
    for (var i = 0; i <= 6; i++) {
        var box = document.createElement("div");
        box.className = "box";
        document.getElementById("backGround").appendChild(box);
        box.style.marginLeft = boxMarginLeft + "px";
        //boxMarginLeft=boxMarginLeft+1000;
        box.id = "box" + i;
        if (i < 3) {
            boxMarginLeft = boxMarginLeft + 1500;

        }
        if (i >= 3) {
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
}

function checkForWin() {
    if (score >= 150) {
        // Hide the game background
        document.getElementById("backGround").style.display = "none";
        showWinScreen();
        winSound.play();
        enterAudio.pause();
        spaceAudio.pause();
        gameOverAudio.pause();
    }
}

function showWinScreen() {
    document.getElementById("gameOverScreen").style.display = "none";

    // Show the win screen
    const winScreen = document.getElementById("win-screen");
    winScreen.style.display = "block";
    document.getElementById("final-score").textContent = score;

}









