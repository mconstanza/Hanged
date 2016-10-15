var Letter = require('./letter.js')

function Word(word) {

	this.word = word;
	this.letters = [];

	for (letter = 0; letter < word.length; letter++){
		var char = new Letter(word[letter]);
		this.letters.push(char);
	}

	// method checks user input against word and returns boolean
	this.checkGuess = function(guess) {

		if (this.word.includes(guess)){

			return true
		}else {

			return false
		}
	}

	// updates letter display to change '_' to the letter
	this.updateLetters = function(guess) {

		console.log('updating letters')

		for (i=0; i < this.letters.length; i++){
			var letter = this.letters[i];

			if (guess == letter.letter) {
				letter.display = letter.letter;

			}
		}
	}

	this.displayWord = function(){

		var word = "";
		
		for (i = 0; i < this.letters.length; i++){
			var letter = this.letters[i];
			word += letter.display;
			word += ' ';

		}
		console.log('\n' + word + '\n')

	}
}

module.exports = Word;