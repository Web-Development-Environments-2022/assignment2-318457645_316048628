var context;
var shape = new Object();
var board;
var score;
var pac_color;
var interval;
var monsterArr = [];
var monstersNum;
var current_possition;
var start = true;
var speed;
var counter = speed;
var life = 5;
var lost = false;
var movingScore = new Object();
var movingScoreIsExist = true;
var music;
var intervalOfPill;
var prevPill;
var maxLife = 5;
var row = 15;
var col = 20;
var middle = Math.floor(row / 2);
var rightButton;
var leftButton;
var upButton;
var downButton;
var ballNum;
var duration;
var upDefined;
var downDefined;
var leftDefined;
var rightDefined;
var upKeycode = 38;
var downKeycode = 40;
var leftKeycode = 37;
var rightKeycode = 39;
var color5;
var color15;
var color25;
var startTime;
var currTime;
var timeLeft;
var intervalOfTime;
var intervalOfClock;
var clockIcon;
var intervalSettingTimeNew;
shape.i = 15;
shape.j = 3;
var intervalOfQstMark;
var qstMark;
var tookQst = false;



$(document).ready(function () {
	jQuery.validator.addMethod("strongPassword", function (value, element) {
		return this.optional(element) || /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
	}, "");
	jQuery.validator.addMethod("onlyLetters", function (value, element) {
		return this.optional(element) || /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/i.test(value);
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
	var arr = ["welcome", "register", "login", "about", "settings", "game"]
	document.getElementById(id).style.display = "block";
	if (id != "game") {
		stopGame();
	}
	setDefaultSetting();
	for (var j = 0; j < arr.length; j++) {
		if (arr[j] != id) {
			document.getElementById(arr[j]).style.display = "none";
		}
	}
}

function updateUserName(name) {
	connected_user = name;
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

function Start() {
	playMusic();
	document.getElementById("lblname").innerHTML = "Hello, " + connected_user;
	var pillTime;
	SetSettings();
	for (var i = 1; i < 6; i++) {
		var id = "life" + i;
		var img = document.getElementById(id);
		if (img != null) {
			img.style.visibility = 'visible';
		}
	}
	speed = 6;
	pillTime = 10000;
	board = new Array();
	timeLeft = duration;
	lost = false;
	score = 0;
	life = 5;
	pac_color = "#ffd633";
	var cnt = 100;
	current_possition = "r";
	var food_remain = ballNum;
	var pacman_remain = 1;
	var food5_remain = Math.floor(0.6 * food_remain);
	var food15_remain = Math.floor(0.3 * food_remain);
	var food25_remain = Math.floor(0.1 * food_remain);

	//reset the moving score
	movingScoreIsExist = true;
	movingScore.i = 15;
	movingScore.j = middle;
	movingScore.prev = [];
	movingScore.prev[0] = false;
	movingScore.prev[1] = false;
	movingScore.prev[2] = false;

	//spreading the monsters
	monsterArr[0] = new Object();
	monsterArr[0].i = 1;
	monsterArr[0].j = 1;
	monsterArr[0].prev = [];
	monsterArr[0].prev[0] = false;
	monsterArr[0].prev[1] = false;
	monsterArr[0].prev[2] = false;
	monsterArr[0].prev[3] = false;

	//second monster
	if (monstersNum - 1 > 0) {
		monsterArr[1] = new Object();
		monsterArr[1].i = 1;
		monsterArr[1].j = row - 2;
		monsterArr[1].prev = [];
		monsterArr[1].prev[0] = false;
		monsterArr[1].prev[1] = false;
		monsterArr[1].prev[2] = false;
		monsterArr[1].prev[3] = false;

	}
	//third monster
	if (monstersNum - 2 > 0) {
		monsterArr[2] = new Object();
		monsterArr[2].i = col - 2;
		monsterArr[2].j = row - 2;
		monsterArr[2].prev = [];
		monsterArr[2].prev[0] = false;
		monsterArr[2].prev[1] = false;
		monsterArr[2].prev[2] = false;
		monsterArr[2].prev[3] = false;

	}
	//fourth monster
	if (monstersNum - 3 > 0) {
		monsterArr[3] = new Object();
		monsterArr[3].i = col - 2;
		monsterArr[3].j = 1;
		monsterArr[3].prev = [];
		monsterArr[3].prev[0] = false;
		monsterArr[3].prev[1] = false;
		monsterArr[3].prev[2] = false;
		monsterArr[3].prev[3] = false;

	}

	startTime = new Date();
	for (var i = 0; i < col; i++) {
		board[i] = new Array();

		//put obstacles
		for (var j = 0; j < row; j++) {
			if ((i == 3 && j == 4) || (i == 4 && j == 4) || (i == 5 && j == 4) || (i == 5 && j == 3) || (i == 2 && j == 8) || (i == 2 && j == 9) || (i == 3 && j == 8)
				|| (i == 4 && j == 8) || (j == 12 && i == 3) || (j == 12 && i == 4) || (j == 12 && i == 5) || (j == 5 && i == 7) || (j == 6 && i == 7) || (j == 7 && i == 7) || (j == 8 && i == 7) || (j == 9 && i == 7) || (j == 12 && i == 8) || (j == 2 && i == 9) || (j == 8 && i == 10) || (j == 9 && i == 10) || (j == 10 && i == 10) || (j == 2 && i == 11) || (j == 2 && i == 12) || (j == 2 && i == 13) || (j == 2 && i == 14) || (j == 3 && i == 12) || (j == 4 && i == 12) || (j == 5 && i == 12) || (j == 6 && i == 12) || (j == 7 && i == 12) || (j == 12 && i == 12) || (j == 12 && i == 13) || (j == 12 && i == 14) || (j == 11 && i == 14) || (j == 10 && i == 14) || (j == 6 && i == 15) || (j == 6 && i == 16) || (j == 6 && i == 17) || (j == 7 && i == 16) || (j == 8 && i == 16) || (j == 9 && i == 16) || (j == 10 && i == 16)) {
				board[i][j] = 4;
			}
			else if ((i == 0 && j != middle) || (i == col - 1 && j != middle) || (j == 0) || (j == row - 1) || (i == 1 && j == middle - 1) || (i == 1 && j == middle + 1) || (i == col - 2 && j == middle - 1) || (i == col - 2 && j == middle + 1)) {
				board[i][j] = 4;
			}


			// put monster
			else if (i == 1 && j == 1) {
				board[i][j] = 6;
			}
			else if (i == 1 && j == row - 2 && monstersNum - 1 > 0) {
				board[i][j] = 7;
			}
			else if (i == col - 2 && j == row - 2 && monstersNum - 2 > 0) {
				board[i][j] = 8;
			}
			else if (i == col - 2 && j == 1 && monstersNum - 3 > 0) {
				board[i][j] = 9;
			}
			else if (i == 15 && j == middle) {
				board[i][j] = 3;
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

	clockIcon = new Object();
	//when to add a clock icon
	intervalOfClock = setInterval(addClockIcon, 1000 * 20);

	//duration of game
	var intervalSettingTime = duration * 1000;
	// intervalOfTime = setInterval(gameIsOver, intervalSettingTime);
	intervalOfTime = setTimeout(gameIsOver, intervalSettingTime);

	//update position every 1 sec
	interval = setInterval(UpdatePosition, 100);
	prevPill = new Object();
	intervalOfPill = setInterval(givePill, pillTime);

	qstMark = new Object();
	intervalOfQstMark = setInterval(addQstMark, 12 * 1000);

}


///end start game function

function addClockIcon() {
	if (clockIcon.i != null && clockIcon.j != null)
		board[clockIcon.i][clockIcon.j] = 0;
	var clockPlace = [];
	clockPlace = findRandomEmptyCell(board);
	board[clockPlace[0]][clockPlace[1]] = 11;
	clockIcon.i = clockPlace[0];
	clockIcon.j = clockPlace[1];

}

function addQstMark() {

	if (qstMark.i != null && qstMark.j != null)
		board[qstMark.i][qstMark.j] = 0;
	var qstArr = [];
	qstArr = findRandomEmptyCell(board);
	board[qstArr[0]][qstArr[1]] = 12;
	qstArr.i = qstArr[0];
	qstArr.j = qstArr[1];

}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * row + 1);
	var j = Math.floor(Math.random() * col + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * row + 1);
		j = Math.floor(Math.random() * col + 1);
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

function drawFood(text, x, y, color, size) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, size, 0, 2 * Math.PI);
	context.fill();
}

function Draw(x) {
	canvas.width = canvas.width;
	lblScore.value = score;
	lblTime.value = timeLeft;
	document.getElementById("lblname").value = connected_user;
	document.getElementById("5color-show").value = color5;
	document.getElementById("15color-show").value = color15;
	document.getElementById("25color-show").value = color25;


	for (var i = 0; i < col; i++) {
		for (var j = 0; j < row; j++) {
			var center = new Object();
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
			}
			else if (board[i][j] == 5) {//5point
				drawFood('5', center.x - 10, center.y - 10, color5, 5)
			}
			else if (board[i][j] == 4) { //draw obstacle
				img1 = new Image();
				img1.src = 'Images/brick.png';
				context.drawImage(img1, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 6) // draw monster
			{
				img2 = new Image();
				img2.src = 'Images/ghost.png';
				context.drawImage(img2, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 7) // draw monster
			{
				img3 = new Image();
				img3.src = 'Images/ghost1.png';
				context.drawImage(img3, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 8) // draw monster
			{
				img4 = new Image();
				img4.src = 'Images/ghost.png';
				context.drawImage(img4, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 9) // draw monster
			{
				img5 = new Image();
				img5.src = 'Images/ghost1.png';
				context.drawImage(img5, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 3) // draw movingScore
			{
				img6 = new Image();
				img6.src = 'Images/plus50.gif';
				context.drawImage(img6, center.x - 23, center.y - 23, 46, 46);
			}
			else if (board[i][j] == 15) // draw 15point
			{
				drawFood('15', center.x - 10, center.y - 10, color15, 8);
			}
			else if (board[i][j] == 25) // draw 25point
			{
				drawFood('25', center.x - 10, center.y - 10, color25, 12);
			}
			else if (board[i][j] == 10) // draw pill
			{
				img7 = new Image();
				img7.src = 'Images/pill.gif';
				context.drawImage(img7, center.x - 20, center.y - 20, 50, 50);
			}
			else if (board[i][j] == 11) // draw clock icon
			{
				img8 = new Image();
				img8.src = 'Images/clockPlus.gif';
				context.drawImage(img8, center.x - 20, center.y - 20, 45, 45);
			}
			else if (board[i][j] == 12) // draw qst mark
			{
				img9 = new Image();
				img9.src = 'Images/qstMark.gif';
				context.drawImage(img9, center.x - 20, center.y - 20, 50, 50);
			}
		}
	}
}

function givePill() {
	if (maxLife == life) {
		//   window.clearInterval(intervalOfPill);
	}
	else {
		if (prevPill.i != null && prevPill.j != null)
			board[prevPill.i][prevPill.j] = 0;
		var pill = [];
		pill = findRandomEmptyCell(board);
		board[pill[0]][pill[1]] = 10;
		prevPill.i = pill[0];
		prevPill.j = pill[1];
	}

}

function UpdatePosition() {

	if (!isMoreFood()) {
		gameIsOverScreen("Game completed!");
		window.clearInterval(interval);
		window.clearInterval(intervalOfPill);
		window.clearInterval(intervalOfTime);
		window.clearInterval(intervalOfClock);
		window.clearInterval(intervalOfQstMark);
		return;
	}
	if (lost) {
		gameIsOverScreen("Loser!");
		window.clearInterval(interval);
		window.clearInterval(intervalOfPill);
		window.clearInterval(intervalOfTime);
		window.clearInterval(intervalOfClock);
		window.clearInterval(intervalOfQstMark);
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
	//add time
	if (board[shape.i][shape.j] == 11 && !lost) {
		duration = duration + 10;
		intervalSettingTimeNew = duration * 1000;
		yayPopup('Images/clockPlus.gif');

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
			elem.src = 'Images/life1.png';
			elem.id = "life" + life;
			elem.style.marginRight = "4px";
			document.getElementById("lifeStatus").appendChild(elem);
		}
		yayPopup('Images/pill.gif');
	}

	//add qstMark
	if (board[shape.i][shape.j] == 12 && !lost) {
		var randomQst = getRndInteger(0, 1);
		if (randomQst == 0) {
			score = score + 10;
			yayPopup('Images/plus10.gif');

		}
		else {
			score = score - 10;
			yayPopup('Images/minus10.gif');
		}
	}

	//change pacman position
	board[shape.i][shape.j] = 2;

	//move monsters
	if (counter == 0) {
		counter = speed;
		for (var i = 0; i < monstersNum; i++) {
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
			board[movingScore.i][movingScore.j] = 3;
		}
	}

	var currTime = new Date();
	timeLeft = (duration * 1000 - (currTime - startTime)) / 1000;

	//eating pacman
	for (var i = 0; i < monstersNum; i++) {
		if (shape.i == monsterArr[i].i && shape.j == monsterArr[i].j) {
			if (life > 1) {
				dicreaseLife();
				break;
			}
			else {
				var id = "life" + life;
				score = score - 10;
				var img = document.getElementById(id);
				img.style.visibility = 'hidden';
				lost = true;
				gameIsOverScreen("game over");
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

function isMoreFood() {
	for (var i = 0; i < col; i++) {
		for (var j = 0; j < row; j++) {
			if (board[i][j] == 5 || board[i][j] == 15 || board[i][j] == 25)
				return true;
		}
	}
	for (var i = 0; i < monstersNum; i++) {
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
	score = score - 10;
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
	if (monstersNum - 1 > 0) {
		monsterArr[1].i = 1;
		monsterArr[1].j = row - 2;
		monsterArr[1].prev[1] = false;
		board[monsterArr[1].i][monsterArr[1].j] = 7;
	}
	//if 3 monsters - update the third
	if (monstersNum - 2 > 0) {
		monsterArr[2].i = col - 2;
		monsterArr[2].j = row - 2;
		monsterArr[2].prev[2] = false;
		board[monsterArr[2].i][monsterArr[2].j] = 8;
	}
	if (monstersNum - 3 > 0) {
		monsterArr[3].i = col - 2;
		monsterArr[3].j = 1;
		monsterArr[3].prev[3] = false;
		board[monsterArr[3].i][monsterArr[3].j] = 9;
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
			if (board[i][j] != 4 && board[i][j] != 6 && board[i][j] != 7 && board[i][j] != 8 && board[i][j] != 9 && board[i][j] != 10 && board[i][j] != 11 && board[i][j] != 12) {
				found = true;
				movingScore.i = i;
				movingScore.j = j;
			}
		}
		catch (exeption) { }
	}
}

//BFS function for the monsters
function BFS(x, y) //row,col
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

	if (currentNode.j > 0 && board[currentNode.i][currentNode.j - 1] != 4 && board[currentNode.i][currentNode.j - 1] != 6 && board[currentNode.i][currentNode.j - 1] != 7 && board[currentNode.i][currentNode.j - 1] != 8 && board[currentNode.i][currentNode.j - 1] != 9 && board[currentNode.i][currentNode.j - 1] != 11 && board[currentNode.i][currentNode.j - 1] != 10 && board[currentNode.i][currentNode.j - 1] != 12) {
		child.i = currentNode.i;
		child.j = currentNode.j - 1;
		children.push(child);
	}
	if (currentNode.j < row && board[currentNode.i][currentNode.j + 1] != 4 && board[currentNode.i][currentNode.j + 1] != 6 && board[currentNode.i][currentNode.j + 1] != 7 && board[currentNode.i][currentNode.j + 1] != 8 && board[currentNode.i][currentNode.j + 1] != 9 && board[currentNode.i][currentNode.j + 1] != 11 && board[currentNode.i][currentNode.j + 1] != 10 && board[currentNode.i][currentNode.j + 1] != 12) {
		child = new Object();
		child.i = currentNode.i;
		child.j = currentNode.j + 1;
		children.push(child);
	}
	if (currentNode.i > 0 && board[currentNode.i - 1][currentNode.j] != 4 && board[currentNode.i - 1][currentNode.j] != 6 && board[currentNode.i - 1][currentNode.j] != 7 && board[currentNode.i - 1][currentNode.j] != 8 && board[currentNode.i - 1][currentNode.j] != 9 && board[currentNode.i - 1][currentNode.j] != 11 && board[currentNode.i - 1][currentNode.j] != 10 && board[currentNode.i - 1][currentNode.j] != 12) {
		child = new Object();
		child.i = currentNode.i - 1;
		child.j = currentNode.j;
		children.push(child);
	}
	if (currentNode.i < col - 1 && board[currentNode.i + 1][currentNode.j] != 4 && board[currentNode.i + 1][currentNode.j] != 6 && board[currentNode.i + 1][currentNode.j] != 7 && board[currentNode.i + 1][currentNode.j] != 8 && board[currentNode.i + 1][currentNode.j] != 9 && board[currentNode.i + 1][currentNode.j] != 11 && board[currentNode.i + 1][currentNode.j] != 10 && board[currentNode.i + 1][currentNode.j] != 12) {
		child = new Object();
		child.i = currentNode.i + 1;
		child.j = currentNode.j;
		children.push(child);
	}
	return children;
}

function updateMonstersPosition(i) {
	var nextPos = BFS(monsterArr[i].j, monsterArr[i].i);
	if (nextPos != null) {
		monsterArr[i].i = nextPos.i;
		monsterArr[i].j = nextPos.j;
	}
}

function stopGame() {
	window.clearInterval(intervalOfTime);
	window.clearInterval(interval);
	window.clearInterval(intervalOfPill);
	window.clearInterval(intervalOfClock);
	window.clearInterval(intervalOfQstMark);
	stopMusic();
}

function gameIsOver() {
	if (!start) {
		if (score < 150)
			gameIsOverScreen("You can do better than that!");
		else
			gameIsOverScreen("We Wave a winner!!!");
		window.clearInterval(interval);
		window.clearInterval(intervalOfPill);
		window.clearInterval(intervalOfTime);
		window.clearInterval(intervalOfClock);
		window.clearInterval(intervalOfQstMark);
		stopMusic();
	}
}

function gameIsOverScreen(result) {
	document.getElementById('resultGame').innerHTML = result;
	document.getElementById('gameScore').innerHTML = "Your score:" + score;
	var x = document.getElementById('gameOver');
	x.style.display = 'block';
}
function startNewGame() {
	window.clearInterval(interval);
	window.clearInterval(intervalOfPill);
	window.clearInterval(intervalOfTime);
	window.clearInterval(intervalOfClock);
	window.clearInterval(intervalOfQstMark);
	// document.getElementById('game').style.display = 'none';
	// document.getElementById('settings').style.display = 'block';
	changePage("settings");
	setDefaultSetting();
	document.getElementById('gameOver').style.display = 'none';
}

function yayPopup(srcImg) {
	var image = document.getElementById("yayImage");
	image.src = srcImg;
	document.getElementById('yay').style.display = 'block';
	setTimeout(() => {
		document.getElementById('yay').style.display = 'none';
	}, 1000);
}


///*************** settings *****************////

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
	var rndMonsterNum = getRndInteger(1, 4);
	document.getElementById('monsterNum').value = rndMonsterNum;
	var rndGameDur = getRndInteger(60, 280);
	document.getElementById('gameDuration').value = rndGameDur;
	var rndBallNum = getRndInteger(50, 90);
	document.getElementById('ballNum').value = rndBallNum;
	document.getElementById('rightBtnSettings').value = 39;
	document.getElementById('leftBtnSettings').value = 37;
	document.getElementById('downBtnSettings').value = 40;
	document.getElementById('upBtnSettings').value = 38;
}

function SaveSettings() {
	ballNum = parseInt(document.getElementById('ballNum').value);
	monstersNum = parseInt(document.getElementById('monsterNum').value);
	duration = parseInt(document.getElementById('gameDuration').value);
	setUpBtn();
	setDownBtn();
	setLeftBtn();
	setRightBtn();
	upButton = upKeycode;
	downButton = downKeycode;
	leftButton = leftKeycode;
	rightButton = rightKeycode;
	color5 = document.getElementById('5color').value
	color15 = document.getElementById('15color').value
	color25 = document.getElementById('25color').value

	document.getElementById('settings').style.display = "none";
	document.getElementById('game').style.display = "block";
	Start();
}

function SetSettings() {
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

function setDefaultSetting() {
	upKeycode = 38;
	downKeycode = 40;
	leftKeycode = 37;
	rightKeycode = 39;
	document.getElementById('ballNumS').value = 90;
	document.getElementById('monstersNumS').value = 1;
	document.getElementById('gameDurationS').value = 60;
	document.getElementById('upBtnSettings').value = "⇧";
	document.getElementById('leftBtnSettings').value = "⇩";
	document.getElementById('rightBtnSettings').value = "⇦";
	document.getElementById('downBtnSettings').value = "➪";

}


