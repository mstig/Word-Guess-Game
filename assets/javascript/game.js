//Main function to call hangman game
function hangman() {

    //initializing variables and arrays for answer bank and selected answer, alphabet to verify inputs and keep track of letter selection
    var answerBank = ["LED ZEPPELIN", "JIMI HENDRIX", "BRUCE SPRINGSTEEN", "JOURNEY", "THE WHO", "ZZ TOP", "THE ALLMAN BROTHERS", "LYNYRD SKYNYRD", "THE DOORS", "FLEETWOOD MAC", "AC DC", "QUEEN", "TOM PETTY"];
    //picks random item from answerBank
    var answer = answerBank[Math.floor(Math.random() * answerBank.length)];
    console.log(answer);

    //gets current word element to initialize answer, function to push answer as blanks
    //puts answer in an array to search index of each letter later on
    //answerShow will be used to provide blanks while guessing
    var answerStart = document.getElementById("currentWord");
    var answerArray = [];
    var answerShow = [];

    function arrayPush(randomAnswer) {
        for (i = 0; i < randomAnswer.length; i++) {
            answerArray.push(randomAnswer[i]);
        }
    }
    function blankPush(randomAnswer) {
        //converts actual letters to blank spaces to hide answer
        //shows a blank space for every letter in answer, gap for space                           
        for (i = 0; i < randomAnswer.length; i++) {
            if (randomAnswer[i] === " ") {
                answerShow.push(" ");
            }
            else {
                answerShow.push("_");
            }
        }
    }

    //after converted to array of blanks, updates content on page by passing in array
    //uses .join to print the array with no comma separators
    function answerUpdate(arr) {
        answerStart.textContent = arr.join("");
    }

    //pushes answer into an array to find index of letters, and an array of blanks to show on page
    arrayPush(answer);
    blankPush(answer);
    answerUpdate(answerShow);



    //pulling elements from index by ID in order to update letters, wins, guesses
    //can I use the same var name in this as I do in the html portion?
    // ex var currentWord = documne.getElementById("currentWord")
    // is it better to use different names for html / js sections or have similar names for paired items?
    var answerDisplay = document.getElementById("currentWord");
    var wins = document.getElementById("winCount");
    var recentGuess = document.getElementById("lastLetter");
    var alreadyGuessedBank = document.getElementById("lettersGuessed");
    var chancesLeft = document.getElementById("guessesLeft");

    //after grabbing elements by ID, sets them to the default values
    //new games held the same guessed letter bank if not reset upon initialization
    recentGuess.innerText = "";
    alreadyGuessedBank.innerText = "";
    chancesLeft.innerText = "8";


    //searches entire answer for instances of guessed letter, pushes indexes into an array
    //needed for answers with duplicate letters, uses array to overlay letters onto blanks
    function getAllIndexes(array, letter) {
        var indexes = [];
        var i = -1;
        while ((i = array.indexOf(letter, i + 1)) != -1) {
            indexes.push(i);
        }
        return indexes;
    }
    //will pass index values from prior function into this after letter is correctly guessed
    var indexes = [];

    //is there a comparator for basic alphabet letters that would make this array unnecessary?    
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    //declaring userGuess outside of key press funtion for scope
    var userGuess = "";

    //uses this array to store player's guesses, plus push method
    var alreadyGuessed = [];
    function guessPush(x) {
        alreadyGuessed.push(x);
    }


    //for win/loss conditions, unhides image panel and displays picture of answer
    //changes img source to corresponding picture in images folder and adjusts style
    var answerPic = document.getElementById("answerImg");
    var winBox = document.getElementById("winner");

     //method to hide previous picture/win banner when game restarts
    //immediately called when function starts

    function hidePicture() {
        answerPic.style.display = "none";
        winBox.style.display = "none";
    }

    hidePicture();

    function showPicture() {
        answerPic.src = ("assets/images/" + answer + ".png");
        answerPic.style.display = "block";
        winBox.style.display = "block";
    }

   


    //detects keypress for input
    document.onkeyup = function (event) {
        //sets keypress as variable and makes upper case for array comparison
        userGuess = event.key;
        userGuess = userGuess.toUpperCase();

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
                recentGuess.textContent = userGuess;
                alreadyGuessedBank.textContent = alreadyGuessedBank.innerText + " " + userGuess;

                if (answerCheck) {
                    //checks for all instances of correct letter guess, pushes into an array
                    indexes = getAllIndexes(answer, userGuess);
                    //using stored indexes array, replaces blanks in array with the letter
                    for (i = 0; i < indexes.length; i++) {
                        answerShow[indexes[i]] = userGuess;
                        answerUpdate(answerShow);
                    }
                    //check if word is fully solved by checking remaining blanks,
                    if (!answerShow.includes("_")) {
                        //if fully solved, add win counter, alert, restart game
                        wins.textContent = parseInt(wins.textContent) + 1;
                        function victory() {
                            var newGame = confirm("You win!  Let's play again!");
                            if (newGame) {
                                hangman();
                            }
                        }

                        showPicture();
                        //wait 200ms, page was not updating with completed answer before showing alert
                        setTimeout(victory, 200);

                    }
                }

                else {
                    //deduct from remaining guesses
                    chancesLeft.innerText = chancesLeft.innerText - 1;
                    //if 0 guesses left, game over, new game prompt
                    if (parseInt(chancesLeft.innerText) === 0) {
                        function gameOver() {
                            var newGame = confirm("Game over!  Let's play again!");
                            if (newGame) {
                                hangman();
                            }
                        }                     
                        //wait 200ms, page was not updating with completed answer before showing alert
                        setTimeout(gameOver, 200);
                    }
                }
            }
        }
    }
}

