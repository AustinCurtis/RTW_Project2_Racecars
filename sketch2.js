var yGas;
var gameOn = false;
var beginFueling = false;
var myGas=0;
var waitMessage = true;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background('grey');

	
}

function draw(){
	background('grey');
	textSize(16);
	textAlign(CENTER);
	stroke('white');
	fill('black');
	text("Shake to fill up your gas tank", windowWidth/2, 25)
	arc(windowWidth/2, windowHeight/4, windowWidth/2, windowWidth/2, PI, TWO_PI);
	if (myGas<125) {
		line(windowWidth/2, windowHeight/4, (windowWidth/4)*(1.25), (windowHeight/4)-25);
	} else if(myGas>125 && myGas<250){
		line(windowWidth/2, windowHeight/4, (windowWidth/4)*(1.75), (windowHeight/4)-75);
	} else if (myGas>250 && myGas<375) {
		line(windowWidth/2, windowHeight/4, (windowWidth/2), (windowHeight/4)-75);
	} else if (myGas>375 && myGas<490) {
		line(windowWidth/2, windowHeight/4, (windowWidth/4)*(2.5), (windowHeight/4)-50);
	} else if (myGas>490) {
		line(windowWidth/2, windowHeight/4, (windowWidth/4)*(3)-25, (windowHeight/4)-25);
	}
	textAlign(CENTER);
	text("Push arrows to stear", windowWidth/2, (windowHeight/2)-125);

	triangle(50, windowHeight/2, (windowWidth/2)-25, (windowHeight/2)-100, (windowWidth/2)-25, (windowHeight/2)+100);
	triangle(windowWidth-50, windowHeight/2, (windowWidth/2)+25, (windowHeight/2)-100, (windowWidth/2)+25, (windowHeight/2)+100);

	rect(50, windowHeight-windowHeight/6, windowWidth-100, windowHeight/8);
	yGas = windowHeight-windowHeight/6;
	textSize(32);
	textAlign(CENTER);
	text("Gas", windowWidth/2, windowHeight-50)

	if(touches[0]!= null){
		if (touches[0].x>50 && touches[0].x < windowWidth-50 && touches[0].y > yGas && touches[0].y < yGas+windowHeight/8) {
			if (myGas>10) {
				console.log("go");
				socket.emit("drive");
				myGas-=10;
			}
		}else if (touches[0].x>50 && touches[0].x < windowWidth/2-25 && touches[0].y > (windowHeight/2)-100 && touches[0].y < (windowHeight/2)+100) {
			if (myGas>10) {
				console.log("left");
				socket.emit("left_m");
				myGas-=10;
			}
		}else if(touches[0].x<windowWidth-50 && touches[0].x > windowWidth/2+25 && touches[0].y > (windowHeight/2)-100 && touches[0].y < (windowHeight/2)+100){
			if (myGas>10) {
				console.log("right");
				socket.emit("right_m");
				myGas-=10;
			}
		}
	}

	if (waitMessage) {
		fill('black');
  		rect(0, windowHeight/3, windowWidth, windowHeight/3);
  		textSize(32);
		textAlign(CENTER);
		fill('white');
		text("Waiting for players...", windowWidth/2, windowHeight/2);
	}


	if (gameOn) {
		waitMessage = false;
		beginFueling = true;
		fill('green');
  		rect(0, windowHeight/3, windowWidth, windowHeight/3);
  		textSize(32);
		textAlign(CENTER);
		fill('white');
		text("GO! Start shaking!!", windowWidth/2, windowHeight/2);
		setTimeout(eraseStart, 2000);


	}


}

function eraseStart(){
	gameOn = false;
}

function init(){
	var ymotion
	function deviceMotion(event){
		var acc = event.acceleration;

		ymotion = Math.abs(acc.y);

		if (Math.floor(ymotion)>5 && myGas<500 && beginFueling) {
			myGas++;
		}
		
		

	}
	window.addEventListener('devicemotion', deviceMotion, true);
}

window.addEventListener('load', init);