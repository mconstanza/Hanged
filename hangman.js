var Letter = require('./letter.js');
var Word = require('./word.js');
var inquirer = require('inquirer');
var Game = require('./game.js');


// Set Global Variables
var gameStarted = false;
var exit = false;

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
var guessTypePrompt = 
	{
		type: "list",
		name: "choice",
		message: "Would you like to guess a letter or the whole word?",
		choices: ["Guess a letter.", "Guess the word.", "New Puzzle.", "Exit."]
	}

var guessLetterPrompt = {name: "guess", message: "What letter would you like to guess?"}

var guessWordPrompt = {name: "guess", message: "So you got this, huh? What's the word?"}

// Prompt Functions ///////////////////////////////////////////////////////
function guessType() {

	inquirer.prompt(guessTypePrompt).then(function(answers){

		if (answers.choice == "Guess a letter.") {

			guessLetter();

		}else if (answers.choice == "Guess the word."){

			guessWord();

		}else if (answers.choice == "New Puzzle."){

			puzzle = Game.newPuzzle();
			guessType();

		}else if (answers.choice == "Exit."){
			process.exit();
		}
	})
}

function guessLetter() {

	inquirer.prompt(guessLetterPrompt).then(function(answers){

		console.log("in guess letter callback")

		console.log('answers: ' + answers.guess)

		// var guess = validateGuess(answers.guess)

		// console.log(guess)

		// if (guess.valid) {

		// 	console.log('Guess Valid!')

			// logic when a correct guess is submitted
			if(puzzle.checkGuess(answers.guess)){
				puzzle.updateLetters(answers.guess)
				puzzle.displayWord();
				guessType();	

			// logic when an incorrect guess is submitted
			}else {
				puzzle.displayWord();
				guessType();
			}

		// }else {

		// 	console.log(guess.error)
		// 	guessType();
		// }
	})
}

function guessWord() {

	inquirer.prompt(guessWordPrompt).then(function(answers){

		var word = answers.word;

		winCheck(word)

	})

}

// Load Puzzle
var puzzle = Game.newPuzzle();

// Intro screen
console.log("Welcome to Hangman!");

// Start Game

puzzle.displayWord();

// prompt player for input

guessType();

// check player input


// update display


// check if game over



