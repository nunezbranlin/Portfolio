let score = 0; // start score at 0

let prevNumber; //Instantiate a variable of limited score(prevNumber) for later use
let nextNumber = null; //Instantiate a variable of limited scope(nextNumber)with the value  null

let streak = 0; //Start streak start at 0

const lower_button = document.querySelector(".lower"); //Assign the constant (Lower_button) to the first element with the class lower
lower_button.addEventListener("click", Lower); //Add an event listener (Click) to this object and call the lower function

const higher_button = document.querySelector(".higher"); //Assign the constant (higher_button) to the first element with the class higher
higher_button.addEventListener("click", Higher); //Add an event listener (Click) to this object and call the higher function when clicked

const reset_button = document.querySelector(".reset");
reset_button.addEventListener("click", Reset);

function Lower(evt) {
  //This function will see if guess if correct and increase score/streak or restart the game
  if (nextNumber < prevNumber) {
    //If the number is less than prevNumber:correct, continue game, add score
    // correct
    score += 1 + streak * 2; //we are adding 1+ streak times 2 to the score
    GenNewNumber(); // Run The GenNewNumber function
    UpdateText(`Correct! Keep going! Current number: ${prevNumber}`); // show this messaage to user
    UpdateScore(score); // Show the updated score to the user
    streak++; // increase the streak counter by 1
  } 
  else {
    //wrong. Reset  the game
    GenNewNumber(); // Get new number to continue
    UpdateText(`Wrong :( Score: ${score} New Number: ${prevNumber}`); //Tell user they are wrong and show the score and show prev number
    score = 0; //Reset score to 0
    UpdateScore(score); //show score to the user
    streak = 0; //Reset streak to 0
    alert(`You lose`);
  }
}

function Reset(evt) {
  GenNewNumber();
  UpdateText(`Game Reset ${score} New Number: ${prevNumber}`);
  score = 0;
  UpdateScore(score);
  streak = 0;
}

function Higher(evt) {
  //This function will see if guess if correct and increase score/streak or restart the game
  if (nextNumber > prevNumber) {
    //If the number greater than prevNumber:correct, continue game, add score
    // correct
    score += 1 + streak * 2; //we are adding 1+ streak times 2 to the score
    GenNewNumber(); // Run The GenNewNumber function
    UpdateText(`Correct! Keep going! Current number: ${prevNumber}`); // show this messaage to user
    UpdateScore(score); // Show the updated score to the user
    streak++; // increase the streak counter by 1
  } else {
    //wrong. Reset  the game
    GenNewNumber(); // Get new number to continue
    UpdateText(`Wrong :( Score: ${score} New Number: ${prevNumber}`); //Tell user they are wrong and show the score and show prev number
    score = 0; //Reset score to 0
    streak = 0; //Reset streak to 0
    alert(`You lose`);
  }
}

function UpdateText(txt) {
  // Updates the output element with the text we pass
  const output_area = document.querySelector(".output"); //Assign the constant (output_area) to the first element with the class output
  output_area.innerText = txt; // Set the text of the output to the text provided via txt
}
function UpdateScore(score) {
  // Updates the score element with the text we pass
  const output_area = document.querySelector(".score"); //Assign the constant (output_area) to the first element with the class score
  output_area.innerText = score; // Set the text of the output to the text provided via score
}

function GenNewNumber() {
  if (nextNumber == null) {
    //one (=) means assignment; two (==) is a comparison; //Check to see if we are just starting
    nextNumber = GetRandomInt(0, 10); // if we are just starting assign nextNumber a random value
  }
  prevNumber = nextNumber; //assign prevNumber the value of nect number
  while (nextNumber == prevNumber) {
    //While prevNumber and nextNumber are the same do this
    nextNumber = GetRandomInt(0, 10);
  }
}

function GetRandomInt(min, max) {
  // this returns a random integer within the range provided inclusively
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // Returns the value
}

//Start new game
GenNewNumber(); //Generates New numbers
UpdateText(`Let's Start!! New Number: ${prevNumber}`); //gives user first clue