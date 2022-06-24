Inherit = require("./Inherit")
module.exports = class Grass extends Inherit {
	constructor(x, y) {
		super(x, y)

		this.multiply = 0

		matrix[this.y][this.x] = 1
	}

	mul() {
		const emptyCells = super.chooseCell(0)
		const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell && this.multiply >= 7) {
			const newX = newCell[0]
			const newY = newCell[1]
			matrix[newY][newX] = 1

			new Grass(newX, newY)
			this.multiply = 0
		}
		this.multiply++
	}
}