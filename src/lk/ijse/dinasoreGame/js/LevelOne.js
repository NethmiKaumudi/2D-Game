var cat = document.getElementById("cat");

idleImageNumber = 0;
idleAnimationNumber = 0;

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

runImageNumber = 0;
runAnimationNumber = 0;


function runAnimation() {
    runImageNumber = runImageNumber + 1;
    if (runImageNumber == 11) {
        runImageNumber = 1;
    }
    cat.src = "../Assest/character/run (" + runImageNumber + ").png";


}

function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimationStart, 100);
    clearInterval(idleAnimationNumber);
}


document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        runAnimation();
    }
    if (moveBackGroundAnimationId == 0) {
        moveBackGroundAnimationId = setInterval(moveBackground, 100);

    }
});

var backGroundImagePositionX = 0;
var moveBackGroundAnimationId = 0

function moveBackground() {
    backGroundImagePositionX = backGroundImagePositionX - 20;
    document.getElementById("backGround").style.backgroundPositionX = backGroundImagePositionX + "px";

}
