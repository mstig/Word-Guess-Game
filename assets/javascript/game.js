//Main function to call hangman game
function hangman() {

    //initializing variables and arrays for answer bank and selected answer, alphabet to verify inputs and keep track of letter selection
    var answerBank = ["led zeppelin", "jimi hendrix", "bruce springsteen", "journey", "the who", "zz top", "the allman brothers", "lynyrd skynyrd", "the doors", "fleetwood mac"];
    //picks random item from answerBank
    var answer = answerBank[Math.floor(Math.random() * answerBank.length)];
    console.log(answer);

    //gets current word element to initialize answer, function to push answer as blanks
    var answerStart = document.getElementById("currentWord");
    var answerShow = "";
    function blankPush(randomAnswer) {
        //shows a blank space for every letter in answer, gap for spaces
        for (i = 0; i < randomAnswer.length; i++) {
            if (randomAnswer[i] === " ") {
                answerShow = answerShow + " ";
            }
            else {
                answerShow = answerShow + "_";
            }

        }
        //after for loop ends, updates guess area of html page with number of blanks
        answerStart.innerText = answerShow;
    }

    //calls blank output function with randomized answer selection from answerBank
    blankPush(answer);



    //pulling elements from index by ID in order to update letters, wins, guesses
    //can I use the same var name in this as I do in the html portion?
    // ex var currentWord = documne.getElementById("currentWord")
    // is it better to use different names for html / js sections or have similar names for paired items?
    var answerDisplay = document.getElementById("currentWord");
    var wins = document.getElementById("winCounter");
    var recentGuess = document.getElementById("lastLetter");
    var alreadyGuessedBank = document.getElementById("lettersGuessed");
    var chancesLeft = document.getElementById("guessesLeft");

    //after grabbing elements by ID, sets them to the default values
    //new games held the same guessed letter bank if not reset upon initialization
    recentGuess.innerText = "";
    alreadyGuessedBank.innerText = "";
    chancesLeft.innerText = "10";



    //is there a comparator for basic alphabet letters that would make this array unnecessary?    
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    //declaring userGuess outside of key press funtion for scope
    var userGuess = "";

    //uses this array to store player's guesses, plus push method
    var alreadyGuessed = [];
    function guessPush(x) {
        alreadyGuessed.push(x);
    }

    //detects keypress for input
    document.onkeyup = function (event) {


        //sets keypress as variable and makes lower case for array comparison
        userGuess = event.key;
        userGuess = userGuess.toLowerCase();

        //method for checking guess against alphabet, already guessed pool, and final answer
        var alphaCheck = alphabet.includes(userGuess);
        var alreadyGuessedCheck = alreadyGuessed.includes(userGuess);
        var answerCheck = answer.includes(userGuess);

        //checks if guess is included in alphabet to avoid errors from special characters
        //if letter, checks against already guessed, then finally checks against answer
        if (alphaCheck) {

            //false check for duplicate answer to proceed, if letter has already been guessed, does nothing     
            if (!alreadyGuessedCheck) {
                //pushes to already guessed array, shows most recent guess, and adds letter to word bank display at bottom
                guessPush(userGuess);
                recentGuess.innerText = userGuess;
                alreadyGuessedBank.innerText = alreadyGuessedBank.innerText + " " + userGuess;

                if (answerCheck) {
                    //show letter in answer
                    //check if word is fully solved after updating answer
                    //if win, increment counter and start over
                    wins.innerText = parseInt(wins.innerText) + 1;
                    alert("You win!  Let's play again!");
                    hangman();
                }

                else {
                    //deduct from remaining guesses
                    chancesLeft.innerText = parseInt(chancesLeft.innerText) - 1;
                    //if 0 guess left, game over, starts new game
                    if (parseInt(chancesLeft.innerText) === 0) {
                        alert("Game over!  Let's play again!");
                        hangman();
                    }
                }
            }
        }
    }
}

