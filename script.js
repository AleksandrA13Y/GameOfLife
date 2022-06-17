var socket = io();

var side = 23

var grassArr = [];
var grassEaterArr = [];
var spiceArr = [];
var omnivorousArr = [];
var harvesterArr = [];

function setup() {
	createCanvas(50 * side, 50 * side)
	background(70, 70, 70)
}

function drawn(matrix) {
	for (var y = 0; y < 50; y++) {
		for (var x = 0; x < 50; x++) {
			if (matrix[y][x] == 0) {
				fill("grey")
			}
			else if (matrix[y][x] == 1) {
				fill("green")
			}
			else if (matrix[y][x] == 2) {
				fill("yellow")
			}
			else if (matrix[y][x] == 3) {
				fill("red")
			}
			else if (matrix[y][x] == 4) {
				fill(153, 51, 153)
			}
			else if (matrix[y][x] == 5) {
				fill(0, 102, 255)
			}
			else if (matrix[y][x] == 6) {
				fill(51, 153, 255)
			}
			stroke(70, 70, 70)
			rect(x * side, y * side, side, side, 4)
		} 
	}
}

function KillAll(){
	socket.emit("kill")
}

setInterval(
	function(){
		socket.on('send matrix', drawn)
		// document.getElementById("GRT").innerHTML = grassArray.length()
		// document.getElementById("GERT").innerHTML = grassArray.length()
		// document.getElementById("ORT").innerHTML = grassArray.length()
		// document.getElementById("SRT").innerHTML = grassArray.length()
		// document.getElementById("HRT").innerHTML = grassArray.length()
	}, 250
)