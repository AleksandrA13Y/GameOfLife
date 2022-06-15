Inherit = require("./Inherit")
module.exports = class Spice extends Inherit {
	// spice multiplies slowly
	// with 50% chance can spawn grass
	// only harvesters can eat spice

	constructor(x, y) {
		super(x, y)

		this.multiply = 0

		matrix[this.y][this.x] = 3
		spiceArr.push(this)
	}

	mul() {
		const emptyCells = super.chooseCell(0)
		const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell && this.multiply >= 15) {
			const newX = newCell[0]
			const newY = newCell[1]
			matrix[newY][newX] = 1

			var rand = Math.round(Math.random() * 9)

			if(rand < 5) {
				new Spice(newX, newY)
			}
			else {
				new Grass(newX, newY)
			}

			this.multiply = 0
		}
		this.multiply++
	}
}