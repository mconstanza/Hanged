var Letter = require('./letter.js');
var Word = require('./word.js');
var inquirer = require('inquirer');
var Game = require('./game.js');


// Set Global Variables
var guessesLeft = 5;
var playerGuesses = [];


// Global Functions ///////////////////////////////////////////////////////
var validateGuess = function(guess){

	console.log('validating guess ' + guess)

	var regex=/[^a-zA-Z]+$/;

	if (guess == null) {
		console.log('if null')
		return {
			"valid":false, 
			"error":"You must input a letter."
		}
		

	}else if (guess.match(regex)) {
		console.log('if not a letter')
		return {
			"valid":false,
			"error":"Guess must be a letter."
		}
		
	} else if (guess.length > 1) {
		console.log('if more than one letter')
		return {
			"valid": false,
			"error": "You can only guess one letter at a time."
		}

	} else if (playerGuesses.indexOf(guess) > -1) {
		console.log('if already in guesses')
		return {
			"valid": false,
			"error": "You already guessed that letter."
		}

	}else if (guess.length < 1) {
		console.log('if no input')
		return {
			"valid": false,
			"error": "You must input a letter."
		}
		
	}else{

		console.log('valid guess!')
		return {
			"valid": true,
			"error": "none"
		}
	}

}

// Inquirer Prompts ///////////////////////////////////////////////////////
var mainPrompt = 
	{
		type: "list",
		name: "choice",
		message: "What do you want to do?",
		choices: ["Guess a letter.", "Guess the word.", "Give up - New Puzzle.", "Exit."]
	}

var guessLetterPrompt = {name: "guess", message: "What letter would you like to guess?"}

var guessWordPrompt = {name: "guess", message: "So you got this, huh? What's the word?"}

var newGamePrompt = {type: "confirm", name: "choice", message: "New Game?"}
// Prompt Functions ///////////////////////////////////////////////////////
function main() {

	inquirer.prompt(mainPrompt).then(function(answers){

		if (answers.choice == "Guess a letter.") {

			guessLetter();

		}else if (answers.choice == "Guess the word."){

			guessWord();

		}else if (answers.choice == "Give up - New Puzzle."){

			newGame();

		}else if (answers.choice == "Exit."){
			process.exit();
		}
	})
}

function guessLetter() {

	inquirer.prompt(guessLetterPrompt).then(function(answers){


		// var guess = validateGuess(answers.guess)

		// console.log(guess)

		// if (guess.valid) {

		// 	console.log('Guess Valid!')

			// logic when a correct guess is submitted
			if(puzzle.checkGuess(answers.guess)){
				puzzle.updateLetters(answers.guess)
				if(winCheck()){
					console.log("You Win!")
					newGame();
				}else{
					puzzle.displayWord();
					main();		
				}
				

			// logic when an incorrect guess is submitted
			}else {
				// if player is out of guesses
				if(loseCheck()){
					console.log('You lose!');
				// if player has guesses remaining
				}else{
					puzzle.displayWord();
					main();
				}
			}

		// }else {

		// 	console.log(guess.error)
		// 	main();
		// }
	})
}

function guessWord() {

	inquirer.prompt(guessWordPrompt).then(function(answers){

		var word = answers.word;

		winCheck(word)

	})

}

function winCheck() {

	console.log('checking for win')

	var workingPuzzle = puzzle.wordStatus();

	console.log(workingPuzzle)

	if (workingPuzzle == puzzle.word){
		// player wins
		return true
	}
}

function loseCheck() {

	if (guessesLeft <= 0) {

		return true

	}

}

function newGame() {

	console.log('making new game')

	inquirer.prompt(newGamePrompt).then(function(answers){

		console.log(answers)

		if(answers.choice == true) {

			guessesLeft = 5;
			playerGuesses = [];
			puzzle = Game.newPuzzle();

			puzzle.displayWord();
			main();

		}else{
			process.exit;
		}

	})

}
// Load Puzzle
var puzzle = Game.newPuzzle();

// Intro screen
console.log("Welcome to Hangman!");

// Start Game

puzzle.displayWord();

// prompt player for input

main();




