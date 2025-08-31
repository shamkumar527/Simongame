$(document).ready(function () {

    var gamePattern = [];
    var buttonColors = ["red", "blue", "green", "yellow"];
    var userClickedPattern = [];
    var started = false;
    var level = 0;

    // Play sound
    function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    // Animate button press
    function animatePress(currentColour) {
        $("#" + currentColour).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
    }

    // Next sequence
    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColors[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }

    // Check user answer
    function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(nextSequence, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Tap/Press to Restart");
            setTimeout(function () { $("body").removeClass("game-over"); }, 200);
            startOver();
        }
    }

    // Restart game
    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
        setStartTitle();
    }

    // Detect mobile (touch devices)
    function isMobile() {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    }

    // Set initial title
    function setStartTitle() {
        if (!started) {
            if (isMobile()) {
                $("#level-title").text("Tap Here to Start");
            } else {
                $("#level-title").text("Press A Key to Start");
            }
        }
    }

    // Initial title setup
    setStartTitle();

    // Button click
    $(".btn").click(function () {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });

    // Start game - keyboard for desktop
    $(document).keydown(function () {
        if (!started && !isMobile()) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });

    // Start game - tap for mobile or desktop
    $("#level-title").click(function () {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });

    // Update title on resize/rotate
    $(window).on('resize orientationchange', function () {
        setStartTitle();
    });

});
