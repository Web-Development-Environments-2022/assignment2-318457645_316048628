var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var start_game = true;
var music;
var rightButton ;
var leftButton ;
var upButton;
var downButton;
var level;
var ballNum;
var monstersNum;
var duration;
var upDefined = false;
var downDefined = false;
var leftDefined = false;
var rightDefined = false;



$(document).ready(function() {
	jQuery.validator.addMethod("strongPassword", function(value, element) {
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
				onlyLetters : true
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
		  birthDate:{
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
			required : "Please enter your firstname",
			onlyLetters : "Full name need to contain only letters"
		},	  
	    password: {
			required: "Please provide a password",
			strongPassword: "Please provide at least 1 character and 1 letter",
			minlength: "Your password must be at least 6 characters long"
		},
		email: "Please enter a valid email address",
		birthDate: "Please choose date of birth",
		userName : "Please provide user name"

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

function changePage(id){
	var arr=["welcome","register","login","settings","about","game"]
	document.getElementById(id).style.display="block";
	for (var j = 0; j < 6; j++) {
		if (arr[j] != id) 
		{
			document.getElementById(arr[j]).style.display="none";
		}  
	}
}

function playMusic(){
	music = new Audio('Paamon.mp3');
	music.play();
	music.loop = true;
}

function stopMusic(){
	if(typeof(music) !== 'undefined')
	{
		music.pause();
	}
}

function Start() {
	playMusic();
	SetSettings();
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) 
			{
				board[i][j] = 4;
			} 
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
      addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
      }, false);
      addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
      }, false);

	interval = setInterval(UpdatePosition, 150);
}

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

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function ReduceGameLevel()
{
	var level = document.getElementById('gameLevel').value;
	if (level>1)
	{
		document.getElementById('gameLevel').value = parseInt(level)-1;
	}
}
function EnlargeGameLevel()
{
	var level = document.getElementById('gameLevel').value;
	if (level<4)
	{
		document.getElementById('gameLevel').value = parseInt(level)+1;
	}
}
function ReduceBall()
{
	var ballNum = document.getElementById('ballNum').value ;
	if(ballNum>50)
	{
		document.getElementById('ballNum').value = parseInt(ballNum)-1;
	}

}

function EnlargeBall()
{
	var ballNum = document.getElementById('ballNum').value ;
	if(ballNum<90)
	{
		document.getElementById('ballNum').value = parseInt(ballNum)+1;
	}
}

function ReduceMonster(){
	var monster = document.getElementById('monsterNum').value;
	if (monster>1)
	{
		document.getElementById('monsterNum').value = parseInt(monster)-1;
	}
}


function EnlargeMonster(){
	var monster = document.getElementById('monsterNum').value;
	if (monster<4)
	{
		document.getElementById('monsterNum').value = parseInt(monster)+1;
	}
}
function ReduceDuration(){
	var duration = document.getElementById('gameDuration').value;
	if (duration>60)
	{
		document.getElementById('gameDuration').value = parseInt(duration)-1;
	}
}
function EnlargeDuration(){
	var duration = document.getElementById('gameDuration').value;
	if (duration<280)
	{
		document.getElementById('gameDuration').value = parseInt(duration)+1;
	}
}
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function RandomSettings()
{
	document.getElementById('gameLevel').value = getRndInteger(1,4);
	document.getElementById('monsterNum').value = getRndInteger(1,4);
	document.getElementById('gameDuration').value= getRndInteger(60,280);
	document.getElementById('ballNum').value = getRndInteger(50,90);
	document.getElementById('rightBtnSettings').value = 39 ;
	document.getElementById('leftBtnSettings').value = 37;
	document.getElementById('downBtnSettings').value = 40;
	document.getElementById('upBtnSettings').value = 38 ;
}

function SaveSettings(){
	level = parseInt(document.getElementById('gameLevel').value);
	ballNum = parseInt(document.getElementById('ballNum').value);
	monstersNum = parseInt(document.getElementById('monsterNum').value);
	duration = parseInt(document.getElementById('gameDuration').value);
	// upButton = parseInt(document.getElementById('upBtnSettings').value);
	// downButton =  parseInt(document.getElementById('downBtnSettings').value);
	// leftButton =  parseInt(document.getElementById('leftBtnSettings').value);
	// rightButton =  parseInt(document.getElementById('rightBtnSettings').value);
	setUpBtn();
	setDownBtn();
	setLeftBtn();
	setRightBtn();
	changePage("game");
	Start();
}

function SetSettings(){
	document.getElementById('gameLevelS').value = level;
	document.getElementById('ballNumS').value = ballNum;
	document.getElementById('monstersNumS').value = monstersNum;
	document.getElementById('gameDurationS').value = duration;


}

function setUpBtn(){
	upDefined = false;
	addEventListener('keydown',function f(e){
		if( e!=undefined && !upDefined)
		{
			Key = e.key;
			document.getElementById('upBtnSettings').value = Key;
			upButton = e.keyCode;
			upDefined = true;
		}
	})
}


function setDownBtn(){
	downDefined = false;
	addEventListener('keydown',function f(e){
		if(  e!=undefined && !downDefined)
		{
			Key = e.key;
			document.getElementById('downBtnSettings').value = Key;
			downButton = e.keyCode;
			downDefined = true;
		}
	})
}

function setLeftBtn(){
	leftDefined = false;
	addEventListener('keydown',function f(e){
		if( e!=undefined && !leftDefined)
		{
			Key = e.key;
			document.getElementById('leftBtnSettings').value = Key;
			leftButton = e.keyCode;
			leftDefined = true;
		}
	})
}

function setRightBtn(){
	rightDefined = false;
	addEventListener('keydown',function f(e){
		if( e!=undefined && !rightDefined)
		{
			Key = e.key;
			document.getElementById('rightBtnSettings').value = Key;
			rightButton = e.keyCode;
			rightDefined = true;
		}
	})
}

