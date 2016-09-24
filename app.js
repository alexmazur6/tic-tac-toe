$(document).ready(function() {

	var tiles = [];
	var turnCounter = 0;
	var gameOver = false;
	var fa_o = '<i class="fa fa-circle-o" aria-hidden="true"></i>';
	var fa_x = '<i class="fa fa-times" aria-hidden="true"></i>';
	var Tile = {
		id: 0,
		state: 0,
		isBlank: true
	};

	startGame();

	$('.tile').on('click', function(event) {
		if (gameOver) {
			return false;
		}
		//Set var to the ID of the tile clicked and the index of the tile in the array
		var tile_ID = $(this).attr('id');
		var tile_index = tile_ID - 1;

		//check if the tile was clicked before
		var tile_clicked = checkIfClicked(tile_index, tile_ID);
		if (!tile_clicked) {
			return false;
		}

		//Fills the tile with the correct x or o
		var turnState = getTurn(tile_index);
		fillTile(tile_index);

		//Checks wether or not the game has been won or not
		var didSomeoneWin = victoryChecker();
		if (didSomeoneWin == "x") {
			$('.menu').children('h3').text('X Wins!');
			gameOver = true;
		}
		else if (didSomeoneWin == "o") {
			$('.menu').children('h3').text('O Wins!');
			gameOver = true;
		}
		else {
			console.log("no one has won");
		}
		
		
		//Must be at bottom
		turnCounter++;
	});

	$('.new-game').on('click', function(event) {
		event.preventDefault();
		startGame();
	})

	function startGame() {
		gameOver = false;
		tiles = [];
		$('.menu').children('h3').text('Who Will Win?');
		$('.tile').html('');
		for (i = 1; i < 10; i++) {
			var newTile = Object.create(Tile);
			newTile.id = i;
			tiles.push(newTile);
			//console.log("Tile["+(i-1)+"] id= " + tiles[i-1].id);
		}
	};

	function checkIfClicked(index) {
		if (tiles[index].isBlank) {
			tiles[index].isBlank = false;
			return true;
		}
		else {
			return false;
		}
	}

	function getTurn(index) {
		if (turnCounter % 2 == 0) {
			tiles[index].state = 4;
			return true;
		}
		else {
			tiles[index].state = 1;
			return false;
		}
	}

	function fillTile(index) {
		if (tiles[index].state == 4) {
			$('#' + tiles[index].id).append(fa_x);
		}
		else if (tiles[index].state == 1) {
			$('#' + tiles[index].id).append(fa_o);	
		}
		else {
			console.log("ERROR: For some reason no tile was appended");
		}
	}

	function checkSum(sum) {
		if (sum == 12) {
			return "x";
		}
		else if (sum == 3) {
			return "o";
		}
		else {
			return "";
		}

	}

	function victoryChecker() {
		//First it checks all the columns to see if any are correct
		
		//Checkes all rows
		var sum = 0;
		var indexCounter = 0;
		for (var i = 0; i < 3; i++) {
			for(var c = 0; c < 3; c++) {
				sum += tiles[indexCounter].state;
				indexCounter++;
			}
			var checkSums = checkSum(sum);
			if (checkSums) {
				return checkSums;
			}

			sum = 0;
		}

		//Checks all rows
		indexCounter = 0;
		for (var i = 0; i < 3; i++) {
			indexCounter = i;
			for(var c = 0; c < 3; c++) {
				sum += tiles[indexCounter].state;
				indexCounter += 3;
			}


			var checkSums = checkSum(sum);
			if (checkSums) {
				return checkSums;
			}

			sum = 0;
		}	

		//Check top right to bottom left diagonal
		indexCounter = 0;
		for (var i = 0; i < 3; i++) {
			sum += tiles[indexCounter].state;
			indexCounter += 4;
		}
		var checkSums = checkSum(sum);
		if (checkSums) {
			return checkSums;
		}

		//Checks for top left to bottom right diagonal
		sum = 0;
		indexCounter = 2;
		for (var i = 0; i < 3; i++) {
			sum += tiles[indexCounter].state;
			indexCounter += 2;
		}
		var checkSums = checkSum(sum);
		if (checkSums) {
			return checkSums;
		}
	}
});
