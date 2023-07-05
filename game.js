var buttonColours=["red", "blue", "green", "yellow" ];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

function nextSequence(){
    level++;

    $("#level-title").text("Level "+level)

    userClickedPattern=[];
    var randomNumber=Math.random();
    randomNumber=Math.floor(randomNumber*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    

}
$(".btn").click(function(){
    var userChosenColour=($(this).attr("id"));
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})
$(window).keydown(function(evt) 
    {
        if(!started){
            $("#level-title").text("Level "+level)
            console.log(evt.key);
            nextSequence();
            started=true;

        }

})


function playSound(name)
{
    var a= new Audio('./sounds/'+name+'.mp3');
    a.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}




function checkAnswer(currentLevel)

{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence(),1000
            });
        }
    }
    else{
        
            var over=new Audio('./sounds/wrong.mp3');
            over.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");

            },100);

        $("#level-title").text("Game over! Press any key to restart");
            startOver();

    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];

}