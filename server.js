// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	//console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}

var desktop_id = null;
var player_count = 0;
var players = [];
var play = false;
var finish = false;
var gameover = false;

function startTheGame(){
	io.to(desktop_id).emit("start", players);
	io.to(players[0]).emit("drive");
	io.to(players[1]).emit("drive");
	console.log("Start");
	play=false;
}


// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);


		if(player_count<2  && socket.id != desktop_id){
			players.push(socket.id);
			player_count++;
			console.log(players);
		}

		if (player_count == 2 && desktop_id != null) {
			player_count++;
			play = true;
		}

		

		socket.on('desktop', function(){
			desktop_id = socket.id;
			gameover = false;
			console.log("desktop conected");
			if(players.indexOf(desktop_id) != -1){
				var arrLen = players.length;
				var tmp1 = players[0];
				var tmp2 = players[1];
				console.log(arrLen);
				if (tmp1 == desktop_id) {
					players.length = 0;
					if(arrLen == 2){
						players.push(tmp2);
						//console.log("Add")
					}
					player_count--;
					console.log("Desktop removed");
					console.log(players);

				} else{
					players.length = 0;
					if(arrLen == 2){
						players.push(tmp1);
						//console.log("add")
					}
					player_count--;
					console.log("Desktop removed");
					console.log(players);
				}

			}
			if (players.length == 2) {
				player_count++;
				startTheGame();
				console.log("2 Players in");
			}

		});

		if(play){
			startTheGame();
		}

		socket.on('finish', function(){
			gameover = true;
			players.length = 0;
			player_count=0;
			desktop_id = null;
			play = false;
			finish = false;
		})

		socket.on('drive', function(){
			if ((players.indexOf(socket.id) != -1) && !gameover) {
				io.to(desktop_id).emit("foreword", socket.id);
			}
		});

		socket.on('left_m', function(){
			if ((players.indexOf(socket.id) != -1) && !gameover) {
				io.to(desktop_id).emit("left", socket.id);
			}
		});

		socket.on('right_m', function(){
			if ((players.indexOf(socket.id) != -1) && !gameover) {
				io.to(desktop_id).emit("right", socket.id);
			}
		});

		
		///MY SOCKET EVENTS HERE


		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);