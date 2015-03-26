/* Tic Tac Toe Game v1.0
 * Author : Hyunjong Choi 3/20/2015
 *
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
	// Register as an anonymous AMD module:
		define([
			'jquery',
		], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	// Default options	
	var defaults = {
	    playNumber: 3,
	    player1Name: "Put your name",
	    player2Name: "Put your name",
	    playerMode: false,
	    firstTry: true,
	    playerMark: "O",
	    gamePlateWidth: 300, // px size
	    //defenseLevel: 5, // From 0 to 10
	};
	
	function ticTacToe(element, options) {
		this.element = element;
		
		// Merge the default options with user-provided options
    	this.options = $.extend(true, {}, defaults, options);
		// Make it easy to use later
		N = this.options.playNumber;
		
		// Initialize game
		this.init();
		// Start play game
		this.play();
	}
	
	// Define player class
	function player(name) {
		this.name = name;
		this.lastX = null;
		this.lastY = null;
		this.mark = null;
		this.plate = new Array();
		this.rowSum = new Array();
		this.colSum = new Array();
		this.diagSum = new Array();
		// This property is for computer only
		this.weighting = new Array();

		// Initialize plate(padding with zeros)
		this.plateInit = function() {
			for (var i=0; i<N; i++) {
			    this.plate[i] = new Array();
			    for (var j=0; j<N; j++) {
			        this.plate[i][j] = 0;
			    }
			}
			return this.plate;
		}

		// Update row, col, diag sum of plate
		this.updateSum = function() {
			var diagLSum = 0;
			var diagRSum = 0;
			for (var i=0; i<N; i++) {
				this.rowSum[i] = 0;
				this.colSum[i] = 0;
				for (var j=0; j<N; j++) {
					this.rowSum[i] += this.plate[i][j];
			    	this.colSum[i] += this.plate[j][i];
			    }
			}
			for (var i=0; i<N; i++) {
				diagLSum += this.plate[i][i];
				diagRSum += this.plate[i][N-1-i];
			}
			this.diagSum = [diagLSum, diagRSum];
		}

		// Initialize weighting factor plate, it only used for computer
		this.initWeight = function() {
			for (var i=0; i<N; i++) {
				this.weighting[i] = new Array();
				for (var j=0; j<N; j++) {
					this.weighting[i][j] = parseFloat(100/(N*N));
				}
			}
		}
		return this;
	}
	
	// Initialize game	
	ticTacToe.prototype.init = function() {
		// Make a matrix on the screen
		this.element.css('width', this.options.gamePlateWidth+'px');
		this.createMarkup();
		
		// Define players and initialize their own plates
		p1 = new player(this.options.player1Name);
		if (this.options.playerMode === false)
			p2 = new player("Computer");
		else
			p2 = new player(this.options.player2Name);
		p1_plate = p1.plateInit();
		p2_plate = p2.plateInit();
		p1.mark = this.options.playerMark;
		if (this.options.playerMark === "O")
			p2.mark = "X";
		else
			p2.mark = "O";

		p1.updateSum();
		p2.updateSum();

		p2.initWeight();
	}
	
	// Play a game
	ticTacToe.prototype.play = function() {
		if (this.options.firstTry) {
			// This is a function for users
			this.squareBindClick(p1);
		} else {
			// This is a function for computer
			this.procedureOfComputer();
		}
	}
	
	// User sequence control function
	ticTacToe.prototype.squareBindClick = function(player) {
		var sqr = this.element.find('.square');
		var that = this;
		$(sqr).click(function(event){
			event.preventDefault();

			// Cross check the player's plates
			var pos = that.findRowCol(this.id.split('sq')[1]);
			var myValue = that.getPlateValue(player, pos);
			var otherValue = that.getPlateValue(p2, pos);
			
			if (myValue === 0 && otherValue === 0) {
				that.displayMark(this, player.mark);
				that.setPlateValue(player, pos);
				player.updateSum();
				that.updateWeight(player);
				
				if (that.checkWin(player) === true) {
					// End of Game
					alert('Win '+player.name);
					that.cleanUp();
					that.init();
					that.play();
				} else if (that.checkWin(player) === false) {
					// Continue on the game, pass the turn to the computer
					// Unbind the click event in order to prevent double clicks
					that.squareUnBindClick();
					if (that.options.playerMode === false)
						that.procedureOfComputer(player);
					else
						that.togglePlayer(player);
				} else if (that.checkWin(player) === 'draw') {
					alert('Draw this game!');
					that.cleanUp();
					that.init();
					that.play();
				}
			} else {
				alert("This square is already clicked");
			}
		});
	}

	// Toggle user's turn
	ticTacToe.prototype.togglePlayer = function(player) {
		if (player === p1)
			this.squareBindClick(p2);
		else if (player === p2)
			this.squareBindClick(p1);
	}

	// Unbind click events
	ticTacToe.prototype.squareUnBindClick = function(player) {
		var sqr = this.element.find('.square');
		$(sqr).unbind("click");
	}

	// Computer sequence control function
	ticTacToe.prototype.procedureOfComputer = function() {
		var pos = this.selectPosOfComputer();
		var id = N*pos[0] + pos[1] + 1;
		var that = $('#sq'+id);
		
		this.displayMark(that, p2.mark);
		this.setPlateValue(p2, pos);
		p2.updateSum();
		this.updateWeight(p2);

		if (this.checkWin(p2) === true) {
			// End of Game
			alert('Win '+p2.name);
			this.cleanUp();
			this.init();
			this.play();
		} else if (this.checkWin(p2) === false) {
			// Continue on the game, pass the turn to the computer
			// Unbind the click event in order to prevent double clicks
			this.squareBindClick(p1);
		} else if (this.checkWin(p2) === 'draw') {
			alert('Draw this game!');
			this.cleanUp();
			this.init();
			this.play();
		}
	}
	
	// Select position of computer based on the weighting factor
	ticTacToe.prototype.selectPosOfComputer = function() {
		var max = 0;
		var pos = new Array();
		for(var i=0; i<N; i++) {
			for (var j=0; j<N; j++) {
				if (p2.weighting[i][j] >= max) {
					pos = [i, j];
					max = p2.weighting[i][j];
				}
			}
		}
		return pos;
	}

	// Update the weighting factors
	ticTacToe.prototype.updateWeight = function(player) {
		// First, find out all candidates elements
		for(var i=0; i<N; i++) {
			for (var j=0; j<N; j++) {
				if (p1.plate[i][j] === 1 || p2.plate[i][j] === 1)
					p2.weighting[i][j] = 0;
			}
		}

		if (player === p1) {
			for (i=0; i<N; i++) {
				p2.weighting[p1.lastX][i] = parseFloat(0.5*p2.weighting[p1.lastX][i]);
				p2.weighting[i][p1.lastY] = parseFloat(0.5*p2.weighting[i][p1.lastY]);
			}

			/* This one is for defense */
			// If N-1 is in a row, force to put the last one to prevent win
			player.rowSum.forEach(function(val, idx){
				if (val === N-1) {
					for(j=0; j<N; j++) {
						if (p2.weighting[idx][j] !== 0)
							p2.weighting[idx][j] = 50;
					}
				}
			});
			// If N-1 is in a row, force to put the last one to prevent win
			player.colSum.forEach(function(val, idx){
				if (val === N-1) {
					for(j=0; j<N; j++) {
						if (p2.weighting[j][idx] !== 0)
							p2.weighting[j][idx] = 50;
					}
				}
			});
			// Diagonal elements check
			if (player.diagSum[0] === N-1) {
				for(j=0; j<N; j++) {
					if (p2.weighting[j][j] !== 0)
						p2.weighting[j][j] = 50;
				}
			}
			if (player.diagSum[1] === N-1) {
				for(j=0; j<N; j++) {
					if (p2.weighting[j][N-1-j] !== 0)
						p2.weighting[j][N-1-j] = 50;
				}
			}
			/* End of defense */
		}

		/* This one is for attack */
		// If N-1 is in a row, force to put the last one to win
		p2.rowSum.forEach(function(val, idx){
			if (val === N-1) {
				for(j=0; j<N; j++) {
					if (p2.weighting[idx][j] !== 0)
						p2.weighting[idx][j] = 100;
				}
			}
		});
		// If N-1 is in a row, force to put the last one to win
		p2.colSum.forEach(function(val, idx){
			if (val === N-1) {
				for(j=0; j<N; j++) {
					if (p2.weighting[j][idx] !== 0)
						p2.weighting[j][idx] = 100;
				}
			}
		});
		// Diagonal elements check
		if (p2.diagSum[0] === N-1) {
			for(j=0; j<N; j++) {
				if (p2.weighting[j][j] !== 0)
					p2.weighting[j][j] = 100;
			}
		}
		if (p2.diagSum[1] === N-1) {
			for(j=0; j<N; j++) {
				if (p2.weighting[j][N-1-j] !== 0)
					p2.weighting[j][N-1-j] = 100;
			}
		}
		/* End of attack */
	}

	// Displaying mark on the plate
	ticTacToe.prototype.displayMark = function($this, mark) {
		//console.log($($this));
		$($this).find('.square_content').html(mark);
	}
	
	// Find a row index and column index with ID number(1D -> 2D)
	ticTacToe.prototype.findRowCol = function(num) {
		if (num%N !== 0) {
			var row = Math.floor(num/N);
			var col = num%N - 1;
		} else {
			var row = Math.floor(num/N) - 1;
			var col = N - 1;
		}
		return Array(row, col);
	}
	
	// Get plate's value with position
	ticTacToe.prototype.getPlateValue = function(player, pos) {
		return player.plate[pos[0]][pos[1]];
	}
	
	// Set plate's value with position
	ticTacToe.prototype.setPlateValue = function(player, pos) {
		player.plate[pos[0]][pos[1]] = 1;
		player.lastX = pos[0];
		player.lastY = pos[1];
	}
	
	// Create HTML markup for displaying
	ticTacToe.prototype.createMarkup = function() {
		for (var i=0; i<N*N; i++) {
			var $square = $("<div id='sq"+(i+1)+"' class='square'><span class='square_content'></span></div>");
			$square.css("width", (this.options.gamePlateWidth/N)-2+"px");
			$square.css("height", (this.options.gamePlateWidth/N)-2+"px");
			this.element.find('#square-wrap').append($square);
		}
	}
	
	// Clean up markup
	ticTacToe.prototype.cleanUp = function() {
		this.element.find('#square-wrap').html("");
	}

	// Check whether a player is win or not
	ticTacToe.prototype.checkWin = function(player) {
		var winningFlag = false;
		
		// Check the values of current row
		var rowSum = 0, colSum= 0, diagLSum = 0, diagRSum = 0;
		for (var r=0; r<N; r++)
			rowSum = rowSum + player.plate[r][player.lastY];
		
		// Check the values of current column
		for (var c=0; c<N; c++)
			colSum = colSum + player.plate[player.lastX][c];
			
		// Check whether the last point is the center or not
		for (var i=0; i<N; i++) {
			diagLSum = diagLSum + player.plate[i][i];
			diagRSum = diagRSum + player.plate[i][N-1-i];
		}
		 
		if (rowSum === N || colSum === N || diagLSum === N || diagRSum === N)
			winningFlag = true;
		
		if (winningFlag !== true)
			winningFlag = this.checkDraw();

		return winningFlag;
	}

	// Check whether the game is drawed or not
	ticTacToe.prototype.checkDraw = function() {
		var flag = "draw";
		for(var i=0; i<N; i++){
			if (p1.rowSum[i] === 0 || p2.rowSum[i] === 0) flag = false;
			if (p1.colSum[i] === 0 || p2.colSum[i] === 0) flag = false; 
		}
		return flag;
	}

	$.fn.ticTacToe = function(options) {
	    var game_instance = new ticTacToe(this, options);
	    
  	}
}));