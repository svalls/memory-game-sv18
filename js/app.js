//Create a list that holds all of your cards
let cardsArray = "fa-diamond fa-paper-plane-o fa-anchor fa-bolt fa-cube fa-leaf fa-bicycle fa-bomb".split(" ") // Make an array without having to type , and ' ' after every entry
cardsArray = cardsArray.map((word) => `fa ${word}`) // makes `fa-diamond` into `fa fa-diamond`
cardsArray = [...cardsArray, ...cardsArray] // Doubles the array elements

let onlyTwoCardsArray = [];

let matchedCardsArray = [];

let incrementMoveCounter = true;

let moves = 0;
let appendMoves = document.getElementById("moves");

let starValue = 3;

let starOne = document.getElementById("starOne");
let starOneChildren = $(starOne).children();

let starTwo = document.getElementById("starTwo");
let starTwoChildren = $(starTwo).children();

let starThree = document.getElementById("starThree");
let starThreeChildren = $(starThree).children();

let seconds = 00;
let minutes = 0;
let appendSeconds = document.getElementById("seconds");
let appendMinutes = document.getElementById("minutes");
let Interval;

let cardParent = document.getElementsByClassName("cardFrame");
let cardChildrenOpenClass = $(cardParent).find('.cardOpen');
let iconTest = $(cardChildrenOpenClass).attr('class');

let deck = document.getElementsByClassName("deck");
let deckCards = $(deck).children();

// RESTART BUTTON
function newBoard(){
    console.log('New Game');
    // CLEAR ARRAYS
    onlyTwoCardsArray = [];
    matchedCardsArray = [];

    //RESET MOVE COUNTER
    clearInterval(Interval);
    moves = "0";
    appendMoves.innerHTML = moves;

    //RESET STAR VALUE
    starValue = 3;

    //RESET STARS
    starOneChildren.addClass('fa fa-star');
    starTwoChildren.addClass('fa fa-star');
    starThreeChildren.addClass('fa fa-star');

    //RESET TIME
    seconds = "00";
    appendSeconds.innerHTML = seconds;

    minutes = "0";
    appendMinutes.innerHTML = minutes;
 
    //REMOVE ALL CLASSES
    $(cardParent).removeClass('cardLock');
    $(cardParent).removeClass('flipped');
    $(cardChildrenOpenClass).removeClass('cardPurple');
  
    // CLEAR BOARD
    $(deckCards).remove();

    // SHUFFLE CARDS
    let allCards = $(deckCards);
    allCards = shuffle(allCards);

    // ADD NEW CARDS TO DECK
    $(deck).append(allCards);

    // EVENT LISTENER FOR A CARD. IF A CARD IS CLICKED:
    $('.cardFrame').click(function() {
        // GAME ALREADY STARTED SO DON'T RUN TIMER FUNCTION AGAIN
        if (moves >= 2) {
            return openTheCard(this),
            compareCards(this),
            moveCounter(),
            star()
        // START THE GAME, RUN TIMER FUNCTION FIRST TIME   
        } else {
            return timer(),
            openTheCard(this),
            compareCards(this),
            moveCounter(),
            star()
        } 
    });

}


//SHUFFLE CARDS
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    console.log('shuffle');
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}


// OPEN THE CARD
function openTheCard(cardFrame) {
    parent = $(cardFrame);
    cardIcon = $(cardFrame.children).children().attr('class');
    
    // IF CARD IS PURPLE AND LOCKED
    if (parent.hasClass('cardLock') === true) {
        //DONT COMPARE AGAIN
        onlyTwoCardsArray = [];
        //DONT INCREMENT COUNTER
        incrementMoveCounter = false;
        console.log('purple card');        
    // IF CARD IS OPEN
    } else if (parent.hasClass('flipped') === true) {
        // DONT INCREMENT COUNTER
        incrementMoveCounter = false;
        console.log('blue card');
    // IF CARD IS CLOSED
    } else {
        // OPEN THE CARD
        parent.toggleClass('flipped');
        //ADD IT TO AN ARRAY
        onlyTwoCardsArray.push( {icon: cardIcon, cardFrame: parent} );
        //INCREMENT MOVE COUNTER
        incrementMoveCounter = true;
        console.log('opening, add to array,', 'onlyTwoCardsArray:', onlyTwoCardsArray.length);
    }

    if(incrementMoveCounter === true) {
        moves++;
    }

}


// CHECK TO SEE IF THE TWO CARDS MATCH
function compareCards() {
    cardChildren = $(parent).children();

    //ARRAY HAS 2 CARDS
    if (onlyTwoCardsArray.length === 2 ) {
        cardOne = onlyTwoCardsArray[0].cardFrame;
        cardTwo = onlyTwoCardsArray[1].cardFrame;
      
        //IF CARD 01 IS SAME AS CARD 02
        if (onlyTwoCardsArray[0].icon === onlyTwoCardsArray[1].icon) {
            //CALL SAME CARDS
            setTimeout(sameCards, 300, cardOne, cardTwo)
        } else {
            //CLEAR ARRAY AND CALL DIFFERENT CARDS
            onlyTwoCardsArray = [];
            setTimeout(differentCards, 500, cardOne, cardTwo)
            }
    }
}


function sameCards(cardOne, cardTwo) {
    //ADD CARDLOCK CLASS TO THE PARENT
    $(cardOne).addClass('cardLock');
    $(cardTwo).addClass('cardLock');

    //FIND CARD OPEN CLASS AND ADD CARDPURPLE CLASS
    cardOneChildren = $(cardOne).find('.cardOpen');
    $(cardOneChildren).addClass('cardPurple');

    cardTwoChildren = $(cardTwo).find('.cardOpen');
    $(cardTwoChildren).addClass('cardPurple');

    //FIND CHILDREN AND ADD THEM TO AN ARRAY TO LATER COMPARE
    matchedCardsArray.push(onlyTwoCardsArray[0].icon, onlyTwoCardsArray[1].icon);

    onlyTwoCardsArray = [];

    if (matchedCardsArray.length === cardsArray.length) {
        clearInterval(Interval); //STOP TIMER
        setTimeout(finalScoreWinner, 300)
    }
    console.log('same, ', "onlyTwoCardsArray:", onlyTwoCardsArray.length);
}


function differentCards(cardOne, cardTwo) {
    //CARD ONE DOESNT HAVE CARDLOCK CLASS THEN FLIP
    if ($(cardOne).hasClass('cardLock') === false) {
        $(cardOne).toggleClass('flipped');
    }

    //CARD TWO DOESNT HAVE CARDLOCK CLASS THEN FLIP
    if ($(cardTwo).hasClass('cardLock') === false) {
        //DOESNT HAVE CARDLOCK CLASS THEN FLIP
        $(cardTwo).toggleClass('flipped');
    }
    console.log("different, ", "onlyTwoCardsArray:", onlyTwoCardsArray.length);

}


// TIMER
function timer() {
    clearInterval(Interval);
    seconds++;
    if (seconds <= 9){
        appendSeconds.innerHTML = "0" + seconds;
    }
    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59){
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (minutes > 9){
        appendMinutes.innerHTML = minutes;
    }
    if (minutes > 59){
        clearInterval(Interval);
        seconds = "00";
        minutes = "0";
    }
    Interval = setInterval(timer, 1000);
}


// INCREMENT THE MOVE COUNTER AND DISPLAY IT ON THE PAGE
function moveCounter(cardOne, cardTwo){
    appendMoves.innerHTML = moves;

    if(incrementMoveCounter === true) {
        if (moves === 18) {
            // REMOVE FIRST STAR - TWO STARS LEFT
            starThreeChildren.removeClass('fa fa-star');
        }
        if (moves === 22) {
            // REMOVE SECOND STAR
            starTwoChildren.removeClass('fa fa-star');
        }
        if (moves === 30) {
            // REMOVE THIRD STAR
            starOneChildren.removeClass('fa fa-star');
            clearInterval(Interval); //STOP TIMER
            setTimeout(notWinner, 400);
        }
    }
    incrementMoveCounter = true;
}


function star() {
    //ONE STAR LEFT
    if ((moves >= 22 && moves <= 29)) {
        starValue = 1;
    }
    //TWO STARS LEFT
    if ((moves >= 18 && moves <= 21)) {
        starValue = 2;
    }
}


// CONGRATULATIONS POPUP MESSAGE WITH THE FINAL SCORE
function finalScoreWinner() {
    swal(
        'Good job! Your Score:',
        'Moves: ' + moves + ' - ' + 'Time: ' + minutes + ':' + seconds + ' - ' + 'Stars: ' + starValue,
        'success'
    ).then(newBoard)
}


// NOT A WINNER MESSAGE POPUP
function notWinner() {
    swal(
        'Game Over :(',
        'Do you want to play again?',
        'error'
    ).then(newBoard)
}




