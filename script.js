var socket = io();

var side = 21.75

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

function KillAll(matrix) {
	socket.emit('kill')
}

function SpawnGrass(matrix) {
	socket.emit('spawnGrass')
}

function SpawnGrassEater(matrix) {
	socket.emit('spawnGrassEater')
}

function SpawnSpice(matrix) {
	socket.emit('spawnSpice')
}

function SpawnOmnivorous(matrix) {
	socket.emit('spawnOmnivorous')
}

function SpawnHarvester(matrix) {
	socket.emit('spawnHarvester')
}


function fn(statistics) {
	grassCount = statistics.grassArr
	grassEaterCount = statistics.grassEaterArr
	spiceCount = statistics.spiceArr
	omnivorousCount = statistics.omnivorousArr
	harvesterCount = statistics.harvesterArr
}

setInterval(
	function(){
		socket.on('send matrix', drawn)
		socket.on('sendStat', fn)
		document.getElementById("GRT").innerHTML = grassCount
		document.getElementById("GERT").innerHTML = grassEaterCount
		document.getElementById("ORT").innerHTML = spiceCount
		document.getElementById("SRT").innerHTML = omnivorousCount
		document.getElementById("HRT").innerHTML = harvesterCount
	}, 250
)