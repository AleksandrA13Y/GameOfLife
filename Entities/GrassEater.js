Inherit = require("./Inherit")
module.exports = class GrassEater extends Inherit {
	constructor(x, y) {
		super(x, y);

		this.energy = 20

		matrix[this.y][this.x] = 2
		grassEaterArr.push(this)
	}

	
	chooseCell(num){
		super.update();
		return super.chooseCell(num);
	}

	mul() {
		const emptyCells = this.chooseCell(0)
		const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell && this.energy > 8) {
			let x = newCell[0]
			let y = newCell[1]

			new GrassEater(x, y);
			matrix[y][x] = 2;

			this.energy = 15
		} 
	}

	eat() {
		const emptyCells = this.chooseCell(1)
		const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell){
			this.energy += 5
			let x = newCell[0]
			let y = newCell[1]

			for (let i = 0; i < grassArr.length; i++) {
				if(grassArr[i].x == x && grassArr[i].y == y) {
					grassArr.splice(i, 1)
				}
			}

			matrix[y][x] = 2
			matrix[this.y][this.x] = 0
			
			this.x = x
			this.y = y

			if(this.energy > 30) {
				this.mul()
			}

		} else {
			this.move()
		}
	}

	move() {
		const emptyCells = this.chooseCell(0)
		const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell){
			let x = newCell[0]
			let y = newCell[1]

			matrix[y][x] = 2
			matrix[this.y][this.x] = 0

			this.x = x
			this.y = y

			this.energy--

			if(this.energy < 0) {
				this.die()
			}
		}
		else {
			this.energy--

			if(this.energy <= 0) {
				this.die()
			}
		}
	}

	die() {
		for (let i = 0; i < grassEaterArr.length; i++) {
			if(grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y){
				grassEaterArr.splice(i, 1)
			}
		}

		matrix[this.y][this.x] = 0
	}
}