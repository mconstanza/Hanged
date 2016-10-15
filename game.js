Word = require('./word.js');
fs = require('fs');

var newPuzzle = function(){

	var array = fs.readFileSync('dictionary.txt', 'utf8')

	var puzzles = array.split('\n');

	var index = Math.floor(Math.random() * puzzles.length);
	var word = puzzles[index];

	var puzzle = new Word(word);

	return puzzle
}


module.exports = {newPuzzle}