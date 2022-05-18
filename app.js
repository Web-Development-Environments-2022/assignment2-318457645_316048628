var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var timeInterval;
var monsterArr = [];
var monsterSize;
var current_possition;
var start = true;
var speed;
var counter = speed;
var life = 5;
var lost = false;
var movingScore = new Object();
var movingScoreIsExist = true;
var music;
var pillInterval;
var prevPill;
// var maxLife = 8;
var row = 9;
var col = 23;
var middle = Math.floor(row / 2);
var rightButton;
var leftButton;
var upButton;
var downButton;
var level;
var ballNum;
var monstersNum;
var duration;
var upDefined;
var downDefined;
var leftDefined;
var rightDefined;
var upKeycode = 38;
var downKeycode = 40;
var lefKeycode = 37;
var rightKeycode = 39;
var color5;
var color15;
var color25;



$(document).ready(function () {
	jQuery.validator.addMethod("strongPassword", function (value, element) {
		return this.optional(element) || /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
	}, "");
	jQuery.validator.addMethod("onlyLetters", function (value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	}, "");


	$("#registerForm").validate({
		// specify the validation rules
		rules: {
			fullName: {
				required: true,
				onlyLetters: true
			},
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				strongPassword: true,
				minlength: 6
			},
			birthDate: {
				required: true,
			},
			userName:
			{
				required: true,
			}
		},
		messages: {
			fullName:
			{
				required: "Please enter your firstname",
				onlyLetters: "Full name need to contain only letters"
			},
			password: {
				required: "Please provide a password",
				strongPassword: "Please provide at least 1 character and 1 letter",
				minlength: "Your password must be at least 6 characters long"
			},
			email: "Please enter a valid email address",
			birthDate: "Please choose date of birth",
			userName: "Please provide user name"

		}
	});

	document.getElementById("welcome").style.display = "block";
	document.getElementById("game").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("login").style.display = "none";
	document.getElementById("register").style.display = "none";

	context = canvas.getContext("2d");

});

function changePage(id) {
	var arr = ["welcome", "register", "login", "settings", "about", "game"]
	document.getElementById(id).style.display = "block";
	for (var j = 0; j < 6; j++) {
		if (arr[j] != id) {
			document.getElementById(arr[j]).style.display = "none";
		}
	}
}

function playMusic() {
	music = new Audio('Paamon.mp3');
	music.play();
	music.loop = true;
}

function stopMusic() {
	if (typeof (music) !== 'undefined') {
		music.pause();
	}
}

// function Start() {
// 	playMusic();
// 	SetSettings();
// 	board = new Array();
// 	score = 0;
// 	pac_color = "yellow";
// 	var cnt = 100;
// 	var food_remain = 50;
// 	var pacman_remain = 1;
// 	start_time = new Date();
// 	for (var i = 0; i < 10; i++) {
// 		board[i] = new Array();
// 		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
// 		for (var j = 0; j < 10; j++) {
// 			if (
// 				(i == 3 && j == 3) ||
// 				(i == 3 && j == 4) ||
// 				(i == 3 && j == 5) ||
// 				(i == 6 && j == 1) ||
// 				(i == 6 && j == 2)
// 			) 
// 			{
// 				board[i][j] = 4; //4 is obstacle
// 			} 
// 			else {
// 				var randomNum = Math.random();
// 				if (randomNum <= (1.0 * food_remain) / cnt) {
// 					food_remain--;
// 					board[i][j] = 1; //1 is food
// 				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
// 					shape.i = i;
// 					shape.j = j;
// 					pacman_remain--;
// 					board[i][j] = 2; //2 is the pacman place 
// 				} else {
// 					board[i][j] = 0;
// 				}
// 				cnt--;
// 			}
// 		}
// 	}
// 	while (food_remain > 0) {
// 		var emptyCell = findRandomEmptyCell(board);
// 		board[emptyCell[0]][emptyCell[1]] = 1;
// 		food_remain--;
// 	}
// 	keysDown = {};
//       addEventListener("keydown", function (e) {
//         keysDown[e.keyCode] = true;
//       }, false);
//       addEventListener("keyup", function (e) {
//         keysDown[e.keyCode] = false;
//       }, false);

// 	interval = setInterval(UpdatePosition, 150);
// }

function Start() {
	// playMusic();
	connected_user = "navit";
	// document.getElementById("UserName").innerHTML = "Player Name: " + connected_user;
	SetSettings();
	for (var i = 1; i < 6; i++) {
		var id = "life" + i;
		var img = document.getElementById(id);
		if (img != null) {
			img.style.visibility = 'visible';
		}
	}
	switch (level) {
		case 1:
			speed = 9;
			pillTime = 8000;
			break;
		case 2:
			speed = 6;
			pillTime = 12000;
			break;
		case 3:
			speed = 3;
			pillTime = 17000;
			break;
	}
	monsterSize = monstersNum;
	board = new Array();
	time_elapsed = 0;
	lost = false;
	score = 0;
	life = 5;
	pac_color = "#ffd633";
	var cnt = 100;
	current_possition = "r";
	var food_remain = ballNum;
	var pacman_remain = 1;
	var food5_remain = 0.6 * food_remain;
	var food15_remain = 0.3 * food_remain;
	var food25_remain = 0.1 * food_remain;
	//
	shape.i = 14;
	shape.j = 4;

	//reset the moving score
	movingScoreIsExist = true;
	movingScore.i = 0;
	movingScore.j = 4;
	movingScore.prev = [];
	movingScore.prev[0] = false;
	movingScore.prev[1] = false;
	movingScore.prev[2] = false;

	//spreading the monsters
	monsterArr[0] = new Object();
	monsterArr[0].i = 1;
	monsterArr[0].j = 1;
	monsterArr[0].prev = [];
	monsterArr[0].prev[0] = false; monsterArr[0].prev[1] = false; monsterArr[0].prev[2] = false;
	if (monsterSize - 1 > 0) {
		monsterArr[1] = new Object();
		monsterArr[1].i = 1;
		monsterArr[1].j = row - 2;
		monsterArr[1].prev = [];
		monsterArr[1].prev[0] = false; monsterArr[1].prev[1] = false; monsterArr[1].prev[2] = false;
	}
	if (monsterSize - 2 > 0) {
		monsterArr[2] = new Object();
		monsterArr[2].i = col - 2;
		monsterArr[2].j = row - 2;
		monsterArr[2].prev = [];
		monsterArr[2].prev[0] = false; monsterArr[2].prev[1] = false; monsterArr[2].prev[2] = false;
	}

	start_time = new Date();
	for (var i = 0; i < col; i++) {
		board[i] = new Array();

		//put obstacles
		for (var j = 0; j < row; j++) {
			if ((i == 3 && j == 3) || (i == 3 && j == 4) || (i == 3 && j == 5) || (i == 6 && j == 1) || (i == 6 && j == 2) || (i == 11 && j == 2) || (i == 10 && j == 2)
				|| (i == 9 && j == 7) || (j == 4 && i == 8) || (j == 4 && i == 9) || (j == 4 && i == 11) || (j == 6 && i == 5) || (j == 6 && i == 6) || (j == 7 && i == 13) || (j == 7 && i == 14) || (j == 7 && i == 15) || (j == 2 && i == 15) || (j == 3 && i == 15) || (j == 5 && i == 14) || (j == 4 && i == 19) || (j == 5 && i == 19) || (j == 6 && i == 19)) {
				board[i][j] = 4;
			}
			else if ((i == 0 && j != middle) || (i == col - 1 && j != 4) || (j == 0) || (j == row - 1) || (i == 1 && j == middle - 1) || (i == 1 && j == middle + 1) || (i == col - 2 && j == middle - 1) || (i == col - 2 && j == middle + 1)) {
				board[i][j] = 4;
			}

			// put monster
			else if (i == 1 && j == 1) {
				board[i][j] = 6;

			}
			else if (i == 1 && j == row - 2 && monsterSize - 1 > 0) {
				board[i][j] = 7;
			}
			else if (i == col - 2 && j == row - 2 && monsterSize - 2 > 0) {
				board[i][j] = 8;
			}
			else if (i == 0 && j == middle) {
				board[i][j] = 9;
			}

			//put food
			else {
				var randomNum = Math.random();
				if (randomNum <= 1.0 * food_remain / cnt) {
					var option = Math.floor(Math.random() * 3) + 1;
					switch (option) {
						case 1://food5
							if (food5_remain > 0) {
								board[i][j] = 5;
								food5_remain--;
								food_remain--;
							}
							break;
						case 2://food15
							if (food15_remain > 0) {
								board[i][j] = 15;
								food15_remain--;
								food_remain--;
								break;
							}
						case 3://food25
							if (food25_remain > 0) {
								board[i][j] = 25;
								food25_remain--;
								food_remain--;
								break;
							}
					}
					//put pacman
				} else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				}

				//none
				else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	//put all left food
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (food5_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = 5;
			food5_remain--;
		} else if (food15_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = 15;
			food15_remain--;
		} else if (food25_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = 25;
			food25_remain--;
		}
		food_remain--;
	}

	//key listener
	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.keyCode] = false;
	}, false);
	// timeInterval = setInterval(gameOver, (duration * 1000 + 99));

	interval = setInterval(UpdatePosition, 100);
	prevPill = new Object();
	// pillInterval = setInterval(giveMedisen, pillTime);
}

///end start game function


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upButton]) {
		return 1;
	}
	if (keysDown[downButton]) {
		return 2;
	}
	if (keysDown[leftButton]) {
		return 3;
	}
	if (keysDown[rightButton]) {
		return 4;
	}
}


function DrawPacman(center, arg1, arg2, arg3, arg4) {
	context.beginPath();
	context.arc(center.x, center.y, 23, arg1 * Math.PI, arg2 * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color 
	context.fill();
	context.beginPath();
	context.arc(center.x + arg3, center.y + arg4, 3, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color 
	context.fill();
}

function drawFood(text, x, y, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, 10, 0, 2 * Math.PI);
	context.fillText(text,x+10, y+10)
	context.fill();
}

function Draw(x) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < col; i++) {
		for (var j = 0; j < row; j++) {
			var center = new Object();
			// center.x = i * 60 + 30;
			// center.y = j * 60 + 30;
			center.x = i * 46 + 23;
			center.y = j * 46 + 23;
			if (board[i][j] == 2) { //draw pacmen
				if (x == 1) //up
				{
					DrawPacman(center, 1.65, 1.35, -15, 5);
					current_possition = "u";
				}
				else if (x == 2) //down
				{
					DrawPacman(center, 0.65, 0.35, -15, -5);
					current_possition = "d";
				}
				else if (x == 3) //left
				{
					DrawPacman(center, 1.15, 0.85, -5, -15);
					current_possition = "l";
				}
				else if (x == 4) //right
				{
					DrawPacman(center, 0.15, 1.85, 5, -15);
					current_possition = "r";
				}
				else {
					if (current_possition == "r") {
						DrawPacman(center, 0.15, 1.85, 5, -15);
					}
					else if (current_possition == "l") {
						DrawPacman(center, 1.15, 0.85, -5, -15);
					}
					else if (current_possition == "u") {
						DrawPacman(center, 1.65, 1.35, -15, 5);
					}
					else if (current_possition == "d") {
						DrawPacman(center, 0.65, 0.35, -15, -5);
					}
				}
				// context.beginPath();
				// context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				// context.lineTo(center.x, center.y);
				// context.fillStyle = pac_color; //color
				// context.fill();
				// context.beginPath();
				// context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				// context.fillStyle = "black"; //color
				// context.fill();
			}
			else if (board[i][j] == 5) {//5point
				// base_image0 = new Image();
				// base_image0.src = 'images/5point.gif';
				// context.drawImage(base_image0, center.x - 14, center.y - 14, 28, 28);
				drawFood('5',center.x - 10, center.y - 10, color5)
			}
			else if (board[i][j] == 4) { //draw obstacle
				base_image11 = new Image();
				base_image11.src = 'images/brick.jpg';
				context.drawImage(base_image11, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 6) // draw monster
			{
				base_image = new Image();
				base_image.src = 'images/pic.gif';
				context.drawImage(base_image, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 7) // draw monster
			{
				base_image1 = new Image();
				base_image1.src = 'images/pic2.gif';
				context.drawImage(base_image1, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 8) // draw monster
			{
				base_image2 = new Image();
				base_image2.src = 'images/pic3.ico';
				context.drawImage(base_image2, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 9) // draw movingScore
			{
				base_image3 = new Image();
				base_image3.src = 'images/movingScore.gif';
				context.drawImage(base_image3, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 15) // draw 15point
			{
				// base_image4 = new Image();
				// base_image4.src = 'images/15point.gif';
				// context.drawImage(base_image4, center.x - 14, center.y - 14, 28, 28);
				drawFood('15',center.x - 10, center.y - 10, color15)

			}
			else if (board[i][j] == 25) // draw 25point
			{
				// base_image5 = new Image();
				// base_image5.src = 'images/25point.gif';
				// context.drawImage(base_image5, center.x - 14, center.y - 14, 28, 28);
				drawFood('25',center.x - 10, center.y - 10, color25)

			}
			else if (board[i][j] == 10) // draw pill
			{
				base_image6 = new Image();
				base_image6.src = 'images/pill.gif';
				context.drawImage(base_image6, center.x - 20, center.y - 20, 40, 40);
			}
		}
	}
}

function UpdatePosition() {

	if (!isMoreFood()) {
		endGame("Game completed!");
		window.clearInterval(interval);
		window.clearInterval(pillInterval);
		window.clearInterval(timeInterval);
		return;
	}
	if (lost) {
		endGame("Loser!");
		window.clearInterval(interval);
		window.clearInterval(pillInterval);
		window.clearInterval(timeInterval);
		return;
	}

	board[shape.i][shape.j] = 0;

	counter--;
	if (movingScore.i == shape.i && movingScore.j == shape.j) {
		score = score + 50;
		movingScoreIsExist = false;
		board[movingScore.i][movingScore.j] = 0;
		for (var i = 0; i < 3; i++) {
			dot = 5 + j * 10;
			if (movingScore.prev[j]) {
				score = score + dot;
			}
		}
	}
	if (counter == 0) {
		for (var i = 0; i < monsterArr.length; i++) {
			for (var j = 0; j < 3; j++) {
				var dot = 5 + (j * 10);
				if (monsterArr[i].prev[j]) {
					board[monsterArr[i].i][monsterArr[i].j] = dot;
					break;
				}
				else
					board[monsterArr[i].i][monsterArr[i].j] = 0;
			}
		}
		if (movingScoreIsExist) {
			for (var j = 0; j < 3; j++) {
				var dot = 5 + (j * 10);
				if (movingScore.prev[j]) {
					board[movingScore.i][movingScore.j] = dot;
					break;
				}
				else
					board[movingScore.i][movingScore.j] = 0;
			}
		}
		if (movingScoreIsExist)
			updateMovingScorePosition();
	}

	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < row && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
		else if (shape.i == 0) {
			shape.i = col - 1;
		}
	}
	if (x == 4) {

		if (shape.i < col - 1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
		else if (shape.i == col - 1) {
			shape.i = 0;
		}
	}
	//add score
	if (board[shape.i][shape.j] == 5 || board[shape.i][shape.j] == 15 || board[shape.i][shape.j] == 25) {
		score = score + board[shape.i][shape.j];

	}
	//add life
	if (board[shape.i][shape.j] == 10 && life < 5) {
		life++;
		var id = "life" + life;
		var img = document.getElementById(id);
		if (img != null) {
			img.style.visibility = 'visible';
		}
		else {
			var elem = document.createElement("img");
			elem.src = 'images/life1.png';
			elem.id = "life" + life;
			elem.style.marginRight = "4px";
			document.getElementById("lifeStatus").appendChild(elem);
		}
	}
	//change pacman position
	board[shape.i][shape.j] = 2;

	//move monsters
	if (counter == 0) {
		counter = speed;
		for (var i = 0; i < monsterSize; i++) {
			updateMonstersPosition(i);
			for (var j = 0; j < 3; j++) {
				var dot = 5 + (j * 10);
				if (board[monsterArr[i].i][monsterArr[i].j] == dot)
					monsterArr[i].prev[j] = true;
				else
					monsterArr[i].prev[j] = false;
			}
			board[monsterArr[i].i][monsterArr[i].j] = 6 + i;
		}
		if (movingScoreIsExist) {
			for (var j = 0; j < 3; j++) {
				var dot = 5 + (j * 10);
				if (board[movingScore.i][movingScore.j] == dot)
					movingScore.prev[j] = true;
				else
					movingScore.prev[j] = false;
			}
			board[movingScore.i][movingScore.j] = 9;
		}
	}

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	//eating pacman
	for (var i = 0; i < monsterSize; i++) {
		if (shape.i == monsterArr[i].i && shape.j == monsterArr[i].j) {
			if (life > 1) {
				dicreaseLife();
				break;
			}
			else {
				var id = "life" + life;
				score = score-10;
				var img = document.getElementById(id);
				img.style.visibility = 'hidden';
				lost = true;
				alert("game over");
				// changePage("gameOver")
				board[monsterArr[i].i][monsterArr[i].j] = 6 + i;
				break;
			}
		}
	}
	if (start)
		counter = speed;
	start = false;
	Draw(x);
}
//end update position


function endGame(text) {
	// musicOff();
	document.getElementById("gameOver").style.display = "block";

	// When the user clicks on <span> (x), close the modal
	document.getElementsByClassName("close")[0].onclick = function () {
		document.getElementById("gameOver").style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			document.getElementById("gameOver").style.display = "none";
		}
	}

	var scoreMessage = "Your score: " + score;
	alert(scoreMessage);
	// document.getElementById("score").innerHTML = scoreMessage;
	// document.getElementById("endMessage").innerHTML = text;

	//******* */ need to show end game screen ****************

	// $("#gameOver").show();
	// currentDiv = 'gameBoard';
}

function isMoreFood() {
	for (var i = 0; i < col; i++) {
		for (var j = 0; j < row; j++) {
			if (board[i][j] == 5 || board[i][j] == 15 || board[i][j] == 25)
				return true;
		}
	}
	for (var i = 0; i < monsterSize; i++) {
		for (var j = 0; j < 3; j++) {
			if (monsterArr[i].prev[j] == true)
				return true;
		}
	}
	if (movingScore.prev == true)
		return true;
	return false;
}

function dicreaseLife() {
	var id = "life" + life;
	life--;
	score = score-10;
	var img = document.getElementById(id);
	img.style.visibility = 'hidden';
	for (var i = 0; i < monsterArr.length; i++) {
		for (var j = 0; j < 3; j++) {
			var dot = 5 + (j * 10);
			if (monsterArr[i].prev[j]) {
				board[monsterArr[i].i][monsterArr[i].j] = dot;
				break;
			}
			else
				board[monsterArr[i].i][monsterArr[i].j] = 0;
		}
	}
	for (var i = 0; i < monsterArr.length; i++) {
		for (var j = 0; j < 3; j++) {
			monsterArr[i].prev[j] = false;
		}
	}
	monsterArr[0].i = 1;
	monsterArr[0].j = 1;
	monsterArr[0].prev[0] = false;
	board[monsterArr[0].i][monsterArr[0].j] = 6;
	//if 2 monsters - update the second
	if (monsterSize - 1 > 0) {
		monsterArr[1].i = 1;
		monsterArr[1].j = row - 2;
		monsterArr[1].prev[1] = false;
		board[monsterArr[1].i][monsterArr[1].j] = 7;
	}
	//if 3 monsters - update the third
	if (monsterSize - 2 > 0) {
		monsterArr[2].i = col - 2;
		monsterArr[2].j = row - 2;
		monsterArr[2].prev[2] = false;
		board[monsterArr[2].i][monsterArr[2].j] = 8;
	}
	var found = false;
	while (!found) { //position the pacman randomly
		var i = Math.floor(Math.random() * (col - 1)) + 0;
		var j = Math.floor(Math.random() * (row - 1)) + 0;
		if (board[i][j] != 1 && board[i][j] != 6 && board[i][j] != 7 && board[i][j] != 8 && board[i][j] != 4) {
			shape.i = i;
			shape.j = j;
			board[shape.i][shape.j] = 2;
			found = true;
		}
	}
	current_possition = "r";
	keysDown = {};

}

function updateMovingScorePosition() {
	var found = false;
	while (!found) {
		var i = movingScore.i;
		var j = movingScore.j;
		var option = Math.floor(Math.random() * 4) + 1;
		switch (option) {
			case 1://up
				j--;
				break;
			case 2://down
				j++;
				break;
			case 3://right
				i++;
				break;
			case 4://left
				i--;
				break;
		}
		try {
			if (board[i][j] != 4 && board[i][j] != 6 && board[i][j] != 7 && board[i][j] != 8 && board[i][j] != 10) {
				found = true;
				movingScore.i = i;
				movingScore.j = j;
			}
		}
		catch (exeption) { }
	}
}

//search function for the monsters
function Search(x, y) //row,col
{
	var initialState = new Object();//first
	var queue = new Array;
	var closeList = [];//visted
	initialState.i = y;
	initialState.j = x;
	queue.push(initialState);
	closeList.push(initialState)
	while (queue.length > 0) {
		var currentNode = queue[0];
		queue.splice(0, 1);
		if (currentNode.i == shape.i && currentNode.j == shape.j)// pacman found
		{
			try {
				//return the backtrace
				while (currentNode.predecessor.predecessor != null) {
					currentNode = currentNode.predecessor;
				}
				return currentNode;
			}
			catch (exeption) { }
		}
		var children = getAllChildren(currentNode);
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			if (!NodeIsVisited(closeList, child)) {
				closeList.push(child);
				queue.push(child);
				child.predecessor = currentNode;
			}
		}
	}
}

function NodeIsVisited(closeList, child) {
	for (var i = 0; i < closeList.length; i++) {
		var visited = closeList[i];
		if (visited.i == child.i && visited.j == child.j)
			return true;
	}
	return false;
}

function getAllChildren(currentNode) {
	var children = [];
	var child = new Object();

	if (currentNode.j > 0 && board[currentNode.i][currentNode.j - 1] != 4 && board[currentNode.i][currentNode.j - 1] != 6 && board[currentNode.i][currentNode.j - 1] != 7 && board[currentNode.i][currentNode.j - 1] != 8 && board[currentNode.i][currentNode.j - 1] != 9) {
		child.i = currentNode.i;
		child.j = currentNode.j - 1;
		children.push(child);
	}
	if (currentNode.j < row && board[currentNode.i][currentNode.j + 1] != 4 && board[currentNode.i][currentNode.j - 1] != 6 && board[currentNode.i][currentNode.j - 1] != 7 && board[currentNode.i][currentNode.j - 1] != 8 && board[currentNode.i][currentNode.j - 1] != 9) {
		child = new Object();
		child.i = currentNode.i;
		child.j = currentNode.j + 1;
		children.push(child);
	}
	if (currentNode.i > 0 && board[currentNode.i - 1][currentNode.j] != 4 && board[currentNode.i][currentNode.j - 1] != 6 && board[currentNode.i][currentNode.j - 1] != 7 && board[currentNode.i][currentNode.j - 1] != 8 && board[currentNode.i][currentNode.j - 1] != 9) {
		child = new Object();
		child.i = currentNode.i - 1;
		child.j = currentNode.j;
		children.push(child);
	}
	if (currentNode.i < col - 1 && board[currentNode.i + 1][currentNode.j] != 4 && board[currentNode.i][currentNode.j - 1] != 6 && board[currentNode.i][currentNode.j - 1] != 7 && board[currentNode.i][currentNode.j - 1] != 8 && board[currentNode.i][currentNode.j - 1] != 9) {
		child = new Object();
		child.i = currentNode.i + 1;
		child.j = currentNode.j;
		children.push(child);
	}
	return children;
}

function updateMonstersPosition(i) {
	var nextPos = Search(monsterArr[i].j, monsterArr[i].i);
	if (nextPos != null) {
		monsterArr[i].i = nextPos.i;
		monsterArr[i].j = nextPos.j;
	}
}


function ReduceGameLevel() {
	var level = document.getElementById('gameLevel').value;
	if (level > 1) {
		document.getElementById('gameLevel').value = parseInt(level) - 1;
	}
}
function EnlargeGameLevel() {
	var level = document.getElementById('gameLevel').value;
	if (level < 4) {
		document.getElementById('gameLevel').value = parseInt(level) + 1;
	}
}
function ReduceBall() {
	var ballNum = document.getElementById('ballNum').value;
	if (ballNum > 50) {
		document.getElementById('ballNum').value = parseInt(ballNum) - 1;
	}

}

function EnlargeBall() {
	var ballNum = document.getElementById('ballNum').value;
	if (ballNum < 90) {
		document.getElementById('ballNum').value = parseInt(ballNum) + 1;
	}
}

function ReduceMonster() {
	var monster = document.getElementById('monsterNum').value;
	if (monster > 1) {
		document.getElementById('monsterNum').value = parseInt(monster) - 1;
	}
}


function EnlargeMonster() {
	var monster = document.getElementById('monsterNum').value;
	if (monster < 4) {
		document.getElementById('monsterNum').value = parseInt(monster) + 1;
	}
}
function ReduceDuration() {
	var duration = document.getElementById('gameDuration').value;
	if (duration > 60) {
		document.getElementById('gameDuration').value = parseInt(duration) - 1;
	}
}
function EnlargeDuration() {
	var duration = document.getElementById('gameDuration').value;
	if (duration < 280) {
		document.getElementById('gameDuration').value = parseInt(duration) + 1;
	}
}
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RandomSettings() {
	document.getElementById('gameLevel').value = getRndInteger(1, 4);
	document.getElementById('monsterNum').value = getRndInteger(1, 4);
	document.getElementById('gameDuration').value = getRndInteger(60, 280);
	document.getElementById('ballNum').value = getRndInteger(50, 90);
	document.getElementById('rightBtnSettings').value = 39;
	document.getElementById('leftBtnSettings').value = 37;
	document.getElementById('downBtnSettings').value = 40;
	document.getElementById('upBtnSettings').value = 38;
}

function SaveSettings() {
	level = parseInt(document.getElementById('gameLevel').value);
	ballNum = parseInt(document.getElementById('ballNum').value);
	monstersNum = parseInt(document.getElementById('monsterNum').value);
	duration = parseInt(document.getElementById('gameDuration').value);
	setUpBtn();
	setDownBtn();
	setLeftBtn();
	setRightBtn();
	upButton = upKeycode;
	downButton = downKeycode;
	leftButton = lefKeycode;
	rightButton = rightKeycode;
	color5 = document.getElementById('5color').value
	color15 = document.getElementById('15color').value
	color25 = document.getElementById('25color').value

	$(document).unbind();
	changePage("game");
	Start();
}

function SetSettings() {
	document.getElementById('gameLevelS').value = level;
	document.getElementById('ballNumS').value = ballNum;
	document.getElementById('monstersNumS').value = monstersNum;
	document.getElementById('gameDurationS').value = duration;

}

function setUpBtn() {
	upDefined = false;
	addEventListener('keydown', function f(e) {
		if (e != undefined && !upDefined) {
			Key = e.key;
			document.getElementById('upBtnSettings').value = Key;
			upKeycode = e.keyCode;
			upDefined = true;
		}
	})
}

function setDownBtn() {
	downDefined = false;
	addEventListener('keydown', function f(e) {
		if (e != undefined && !downDefined) {
			Key = e.key;
			document.getElementById('downBtnSettings').value = Key;
			downKeycode = e.keyCode;
			downDefined = true;
		}
	})
}

function setLeftBtn() {
	leftDefined = false;
	addEventListener('keydown', function f(e) {
		if (e != undefined && !leftDefined) {
			Key = e.key;
			document.getElementById('leftBtnSettings').value = Key;
			lefKeycode = e.keyCode;
			leftDefined = true;
		}
	})
}

function setRightBtn() {
	rightDefined = false;
	addEventListener('keydown', function f(e) {
		if (e != undefined && !rightDefined) {
			Key = e.key;
			document.getElementById('rightBtnSettings').value = Key;
			rightKeycode = e.keyCode;
			rightDefined = true;
		}
	})
}

