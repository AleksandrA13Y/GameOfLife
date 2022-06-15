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
for (var y = 0; y <= 50; y++) {
    matrix.push([])
    for (var x = 0; x <= 50; x++) {
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

function gen(matrix) {
    for (let i = 0; i < 20; i++) {
        y = Math.round(Math.random() * 99)
        x = Math.round(Math.random() * 99)
        if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
            new Grass(x, y)
        }
    }
    

    for (let i = 0; i < 5; i++) {
        y = Math.round(Math.random() * 99)
        x = Math.round(Math.random() * 99)
        if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
            new GrassEater(x, y)
        }
    }

    for (let i = 0; i < 12; i++) {
        y = Math.round(Math.random() * 99)
        x = Math.round(Math.random() * 99)
        if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
            new Spice(x, y)
        }
    }

    for (let i = 0; i < 3; i++) {
        y = Math.round(Math.random() * 99)
        x = Math.round(Math.random() * 99)
        if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
            new Omnivorous(x, y)
        }
    }

    for (let i = 0; i < 2; i++) {
        y = Math.round(Math.random() * 99)
        x = Math.round(Math.random() * 99)
        if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
            new Harvester(x, y)
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

    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 500)

io.on('connection', function(socket) {
    gen(matrix)
})