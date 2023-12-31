var boxes=["green","red","yellow","blue"];
var sounds=["sounds/green.mp3","sounds/red.mp3","sounds/yellow.mp3","sounds/blue.mp3"];
var gameOverSound=new Audio("sounds/wrong.mp3");
function press(color){
    $("."+color).addClass("pressed");
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
    setTimeout(function(){
        $("."+color).removeClass("pressed");
    },100);
}
$("#inst").click(function(){
    $(".modal").css("display","block");
});
$(".close").click(function(){
    $(".modal").css("display","none");
});
$(".btn").on("click",function(){
    press($(this).attr("id"));
    userPattern.push($(this).attr("id"));
    checkAnswer(userPattern.length-1);
});
    //make a separate function for level loop and matching loop and call them in click event listener function.
var level=0;
var gameStarted=0;
var gamePattern=[],userPattern=[];
/*var mediaQuery=window.matchMedia('min-width:800px');
if(mediaQuery){
    $("body").on("click",function(event){
        var elementTag=event.target.tagName;
        if(elementTag==="body"){
            if(!gameStarted){
                gameStarted=1;
                nextSequence();
            }
        }else return;
    });
}
else{*/
const screenWidth=window.innerWidth;
    $(document).on("keydown",function(){
        if(!gameStarted){
            gameStarted=1;
            nextSequence();
        }
    });
    $("#start").on("click",function(){
        if(!gameStarted){
            gameStarted=1;
            $("#level-title").css("display","block");
            nextSequence();
        }
    });
//}
function nextSequence(){
    level++;
    userPattern=[];
    $("h1").text("Level "+level);
    var index=Math.floor(Math.random()*4);
    gamePattern.push(boxes[index]);
    press(boxes[index]);
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }else{
        if(screenWidth>800)$("h1").text("game over, press any key to restart");
        else $("h1").text("game over, press the start button to restart");
        gameOverSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function startOver(){
    level=0;gameStarted=0;gamePattern=[];userPattern=[];
}/*
function game(){
    $(document).on("keydown",function(){
        $(document).off("keydown");
        var buttonSequence=[];
        for(var level=1;level<=15;level++){
            $("h1").text("Level "+level);
            var index=Math.floor(Math.random()*4);
            press(boxes[index].color);
            buttonSequence.push(index);
            var pressedColor;
            detectLevel(level);
            for(var j=0;j<level;j++){
                if(boxes[buttonSequence[j]].color===pressedColor[j]){///this is the problem
                    continue;
                }
                else{
                    //game over
                    gameOverSound.play();
                    $("btn").off("click");
                    $("h1").text("Game over, press any key to restart");
                    game();
                }
            }
        }$("btn").off("click");
        $("h1").text("Congratulations on completing the game,press any key to restart");
        game();
    });
}
game();*/
