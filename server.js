var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

// ---------------------------------

matrix = []
for (var y = 0; y < 50; y++) {
    matrix.push([])
    for (var x = 0; x < 50; x++) {
        matrix[y].push(0)
    }
}

// console.log(matrix)
io.sockets.emit('send matrix', matrix)

grassArr = [];
grassEaterArr = [];
spiceArr = [];
omnivorousArr = [];
harvesterArr = [];

Inherit = require("./Entities/Inherit")
Grass = require("./Entities/Grass")
GrassEater = require("./Entities/GrassEater")
Omnivorous = require("./Entities/Omnivorous")
Spice = require("./Entities/Spice")
Harvester = require("./Entities/Harvester")

statistics = {}

function gen(matrix) {
    for (let i = 0; i < 30; i++) {
        y = Math.round(Math.random() * 49)
        x = Math.round(Math.random() * 49)
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            grassArr.push(new Grass(x, y))
        }
    }
    

    for (let i = 0; i < 10; i++) {
        y = Math.round(Math.random() * 49)
        x = Math.round(Math.random() * 49)
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            grassEaterArr.push(new GrassEater(x, y))
        }
    }

    for (let i = 0; i < 7; i++) {
        y = Math.round(Math.random() * 49)
        x = Math.round(Math.random() * 49)
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            spiceArr.push(new Spice(x, y))
        }
    }

    for (let i = 0; i < 3; i++) {
        y = Math.round(Math.random() * 49)
        x = Math.round(Math.random() * 49)
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            omnivorousArr.push(new Omnivorous(x, y))
        }
    }

    for (let i = 0; i < 1; i++) {
        y = Math.round(Math.random() * 49)
        x = Math.round(Math.random() * 49)
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            harvesterArr.push(new Harvester(x, y))
        }
    }

    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }
    for (let i = 0; i < spiceArr.length; i++) {
        spiceArr[i].mul()
    }
    for (let i = 0; i < omnivorousArr.length; i++) {
        omnivorousArr[i].eat()
    }
    for (let i = 0; i < harvesterArr.length; i++) {
        harvesterArr[i].eat()
    }

    statistics.grassArr = grassArr.length
    statistics.grassEaterArr = grassEaterArr.length
    statistics.spiceArr = spiceArr.length
    statistics.omnivorousArr = omnivorousArr.length
    statistics.harvesterArr = harvesterArr.length

    io.sockets.emit('sendStat', statistics);
    io.sockets.emit("send matrix", matrix);
}

function killAll() {
    grassArr = [];
    grassEaterArr = [];
    spiceArr = [];
    omnivorousArr = [];
    harvesterArr = [];

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0
        }
    }
}

function spawnGrass() {
    y = Math.round(Math.random() * 49)
    x = Math.round(Math.random() * 49)
    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        new Grass(x, y)
    }
    else {
        spawnGrass()
    }
}

function spawnGrassEater() {
    y = Math.round(Math.random() * 49)
    x = Math.round(Math.random() * 49)
    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        new GrassEater(x, y)
    }
    else {
        spawnGrassEater()
    }
}

function spawnSpice() {
    y = Math.round(Math.random() * 49)
    x = Math.round(Math.random() * 49)
    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        new Spice(x, y)
    }
    else {
        spawnSpice()
    }
}

function spawnOmnivorous() {
    y = Math.round(Math.random() * 49)
    x = Math.round(Math.random() * 49)
    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        new Omnivorous(x, y)
    }
    else {
        spawnOmnivorous()
    }
}

function spawnHarvester() {
    y = Math.round(Math.random() * 49)
    x = Math.round(Math.random() * 49)
    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        new Harvester(x, y)
    }
    else {
        spawnHarvester()
    }
}

setInterval(game, 250)

io.on('connection', function(socket) {
    gen(matrix)

    socket.on("kill", killAll)
    socket.on("spawnGrass", spawnGrass)
    socket.on("spawnGrassEater", spawnGrassEater)
    socket.on("spawnSpice", spawnSpice)
    socket.on("spawnOmnivorous", spawnOmnivorous)
    socket.on("spawnHarvester", spawnHarvester)
})