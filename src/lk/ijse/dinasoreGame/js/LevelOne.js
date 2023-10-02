//Catch character here.......................
var cat = document.getElementById("cat");

idleImageNumber = 1;
idleAnimationNumber = 0;

//idle animation............................

function idleAnimation() {
    idleImageNumber = idleImageNumber + 1;
    if (idleImageNumber == 11) {
        idleImageNumber = 1;
    }
    cat.src = "../Assest/character/Idle (" + idleImageNumber + ").png";
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

//make enter key Run...........................
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (runAnimationNumber == 0) {
            runAnimationStart();
            if (moveBackGroundAnimationId == 0) {
                moveBackGroundAnimationId = setInterval(moveBackground, 100);

            }
        }

    }

});

//BackGround Move Animation.................................

var backGroundImagePositionX = 0;
var moveBackGroundAnimationId = 0

function moveBackground() {
    backGroundImagePositionX = backGroundImagePositionX - 20;
    document.getElementById("backGround").style.backgroundPositionX = backGroundImagePositionX + "px";

}

//Jump Animation.................
jumpImageNumber = 1;
jumpAnimationNumber = 0;
// catMarginTop = 0;
let isJumping = false;

function jumpAnimation() {
    jumpImageNumber = jumpImageNumber + 1;
    // if (jumpImageNumber <= 4) {
    //     catMarginTop = catMarginTop - 20;
    //     cat.style.marginTop = catMarginTop + "px";
    // }
    // if (jumpImageNumber >= 5) {
    //     catMarginTop = catMarginTop + 20;
    //     cat.style.marginTop = catMarginTop + "px";
    // }
    if (!isJumping) {
        isJumping = true;
        cat.style.bottom = '20%';
        setTimeout(() => {
            cat.style.bottom = '1%';
            isJumping = false;
        }, 200); // Adjust the duration of the jump
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
    jumpAnimationNumber = setInterval(jumpAnimation, 100);

}

//using space bar jump the character...................
document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        if (jumpAnimationNumber == 0) {
            jumpAnimationStart();

        }
        if (moveBackGroundAnimationId == 0) {
            moveBackGroundAnimationId = setInterval(moveBackground, 100);

        }

    }

});