// P5 STUFF

var mycolor = "grey";
var dr = true;
var car1, car2, lWall, rWall, cWall, boulder1, boulder2, boulder3, boulder4, boulder5, boulder6;
var w;
var h;
var cars = [];
var begin = false;
var startScreen = false;
var car1Wins = false;
var car2Wins = false;


function setup() {
	createCanvas(windowWidth, windowHeight);
	w = windowWidth;
	h = windowHeight;

	car1 = createSprite((2*(w/6))-w/24, h-50);
	car1.addImage(loadImage("assets/racecar2.png"));

	car2 = createSprite((4*(w/6))+w/24, h-50);
	car2.addImage(loadImage("assets/racecar2.png"));

	fill(153, 102, 51);
	lWall = createSprite(0+w/12, 0, w/6, h*2);
	rWall = createSprite(w-(w/12), 0, w/6, h*2);
	cWall = createSprite(3*(w/6), 0, w/6, h*2);

	boulder1 = createSprite((2*(w/6))-w/24, h/2);
	boulder1.addImage(loadImage("assets/boulder3.png"));

	boulder3 = createSprite((2*(w/6)), h/2+windowHeight/8);
	boulder3.addImage(loadImage("assets/boulder3.png"));

	boulder4 = createSprite((2*(w/6))-w/12, h/2-windowHeight/8);
	boulder4.addImage(loadImage("assets/boulder3.png"));
	//boulder1.setCollider("circle", 0,0,60);

	boulder5 = createSprite((4*(w/6))+w/24, h/2);
	boulder5.addImage(loadImage("assets/boulder3.png"));

	boulder6 = createSprite((4*(w/6)), h/2+windowHeight/8);
	boulder6.addImage(loadImage("assets/boulder3.png"));

	boulder2 = createSprite((4*(w/6))+w/12, h/2-windowHeight/8);
	boulder2.addImage(loadImage("assets/boulder3.png"));
	//boulder2.setCollider("circle", 0,0,60);




}

function draw() {
	//console.log(mycolor);
	background(mycolor);
	//car1.velocity.x = (mouseX-car1.position.x)/10;
  	//car1.velocity.y = (mouseY-car1.position.y)/10;
  	//console.log(car1.position.y);

  	

  	car1.collide(lWall);
  	car1.collide(cWall);
  	car1.collide(boulder1);
  	car1.collide(boulder3);
  	car1.collide(boulder4);

  	car2.collide(rWall);
  	car2.collide(cWall);
  	car2.collide(boulder2);
  	car2.collide(boulder5);
  	car2.collide(boulder6);


  	car1.debug = mouseIsPressed;
  	car2.debug = mouseIsPressed;
  	lWall.debug = mouseIsPressed;
  	rWall.debug = mouseIsPressed;
  	cWall.debug = mouseIsPressed;
  	boulder1.debug = mouseIsPressed;
  	boulder2.debug = mouseIsPressed;
  	boulder3.debug = mouseIsPressed;
  	boulder4.debug = mouseIsPressed;
  	boulder5.debug = mouseIsPressed;
  	boulder6.debug = mouseIsPressed;
  	

  	drawSprites();

  	fill(153, 102, 51);
  	line(0, 100, windowWidth, 100);
	rect(0, 0, windowWidth/6, windowHeight);
	rect(windowWidth-(windowWidth/6), 0, windowWidth/6, windowHeight);
	rect(windowWidth-(7*(windowWidth/12)), 0, windowWidth/6, windowHeight);

	if (!begin) {
  		fill('black');
  		rect(windowWidth/4, windowHeight/3, windowWidth/2, windowHeight/3);
  		textSize(32);
		textAlign(CENTER);
		fill('white');
		text("Waiting for players", windowWidth/2, windowHeight/2);
  	}

  	if (startScreen) {
  		fill('black');
  		rect(windowWidth/4, windowHeight/3, windowWidth/2, windowHeight/3);
  		textSize(32);
		textAlign(CENTER);
		fill('green');
		text("Start!!", windowWidth/2, windowHeight/2);
		setTimeout(clearScreen, 3000);
		
  	}

  	if (car1.position.y< 100) {
  		car1Wins = true;
  		socket.emit("finish");
  	}

  	if (car2.position.y< 100) {
  		car2Wins = true;
  		socket.emit("finish");
  	}

  	if (car1Wins) {
  		fill('black');
  		rect(windowWidth/4, windowHeight/3, windowWidth/2, windowHeight/3);
  		textSize(32);
		textAlign(CENTER);
		fill('green');
		text("Car 1 Wins!!!", windowWidth/2, windowHeight/2);
  	}

  	if (car2Wins) {
  		fill('black');
  		rect(windowWidth/4, windowHeight/3, windowWidth/2, windowHeight/3);
  		textSize(32);
		textAlign(CENTER);
		fill('green');
		text("Car 2 Wins!!!", windowWidth/2, windowHeight/2);
  	}





}//end draw

function clearScreen(){
	startScreen = false;
}

function drive_d(data){
	var thiscar = cars.findIndex(x => x == data);
		console.log(thiscar);
	if(thiscar == 0){
		car1.velocity.y = -1;
		setTimeout(function() {
    		clear_v_y(car1);
		}, 1000)
	} else{
		car2.velocity.y = -1;
		setTimeout(function() {
    		clear_v_y(car2);
		}, 1000)
	}
}

function left_d(data){
	var thiscar = cars.findIndex(x => x == data);
	if(thiscar == 0){
		car1.velocity.x = -1;
		setTimeout(function() {
    		clear_v_x(car1);
		}, 1000)
	} else{
		car2.velocity.x = -1;
		setTimeout(function() {
    		clear_v_x(car2);
		}, 1000)
	}
}

function right_d(data){
	var thiscar = cars.findIndex(x => x == data);
	if(thiscar == 0){
		car1.velocity.x = 1;
		setTimeout(function() {
    		clear_v_x(car1);
		}, 1000)
	} else{
		car2.velocity.x = 1;
		setTimeout(function() {
    		clear_v_x(car2);
		}, 1000)
	}
}

function clear_v_y(givenCar){
	givenCar.velocity.y = 0;
}

function clear_v_x(givenCar){
	givenCar.velocity.x = 0;
}


// function init() {
// 	var alpha, beta, gamma;
// 	//var mycolor = "green";

// 	function handleOrientation(event){
// 		alpha = Math.floor(event.alpha);
// 		beta = Math.floor(event.beta);
// 		gamma = Math.floor(event.gamma);

// 		if (alpha<100) {
// 			mycolor = 'pink';
// 		}else if(alpha>100&&alpha<200){
// 			mycolor = 'blue';
// 		}else{
// 			mycolor = 'green';
// 		}

// 		document.getElementById('alpha').innerHTML = alpha;
// 		document.getElementById('beta').innerHTML = beta;
// 		document.getElementById('gamma').innerHTML = gamma;

// 		socket.emit('orientation', {
// 			'alpha': alpha,
// 			'beta' : beta,
// 			'gamma' : gamma
// 		});
// 	}

// 	window.addEventListener('deviceorientation', handleOrientation, true);

// 	var xmotion, ymotion, zmotion;
// 	function deviceMotion(event){
// 		var acc = event.acceleration;

// 		xmotion = Math.abs(acc.x);
// 		ymotion = Math.abs(acc.y);
// 		zmotion = Math.abs(acc.z);

// 		document.getElementById('accx').innerHTML = Math.floor(xmotion);
// 		document.getElementById('accy').innerHTML = Math.floor(ymotion);
// 		document.getElementById('accz').innerHTML = Math.floor(zmotion);
		
// 		if (zmotion>5) {
// 			dr = true;
// 		}

// 	}
// 	window.addEventListener('devicemotion', deviceMotion, true);

// }

// window.addEventListener('load', init);

