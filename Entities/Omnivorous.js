Inherit = require("./Inherit")
module.exports = class Omnivorous extends Inherit {
	// omnivorous eats grass and grass eaters
	// omnivorous can't eat other omnivorouses

	constructor(x, y) {
		super(x, y)

		this.energy = 20

		matrix[this.y][this.x] = 4
	}

	moving() {
		const emptyCells = this.chooseCell(0)
		const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if(newCell) {
			const x = newCell[0]
			const y = newCell[1]

			matrix[y][x] = 4
			matrix[this.y][this.x] = 0

			this.energy--

			this.x = x
			this.y = y

			if(this.energy <= 0) {
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

	chooseCell(char1, char2) {
		super.update()
		const found = []

		for (const i in this.direction) {
			const x = this.direction[i][0]
			const y = this.direction[i][1]
			if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == char1 || matrix[y][x] == char2) {
					found.push(this.direction[i])
				}
			}
		}

		return found;
	}

	mul() {
		const emptyCells = this.chooseCell(0)
		const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			const x = newCell[0]
			const y = newCell[1]

			new Omnivorous(x, y)
			matrix[y][x] = 4

			this.energy = 20
		} 
	}

	eat() {
		const emptyCells = this.chooseCell(1, 2)
		const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if(newCell) {
			this.energy += 5
			const x = newCell[0]
			const y = newCell[1]

			for (let i = 0; i < grassArr.length; i++) {
				if(grassArr[i].x == x && grassArr[i].y == y) {
					grassArr.splice(i, 1)
				}
			}

			for (let i = 0; i < grassEaterArr.length; i++) {
				if(grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
					grassEaterArr.splice(i, 1)
				}
			}

			matrix[y][x] = 4
			matrix[this.y][this.x] = 0

			this.x = x
			this.y = y

			if(this.energy > 40) {
				this.mul()
			}
		}
		else {
			this.moving()
		}
	}

	die() {
		for (let i = 0; i < omnivorousArr.length; i++) {
			if(omnivorousArr[i].x == this.x && omnivorousArr[i].y == this.y) {
				omnivorousArr.splice(i, 1)
			}
		}

		matrix[this.y][this.x] = 0
	}
}