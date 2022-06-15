Inherit = require("./Inherit")
module.exports = class Harvester extends Inherit {
	// harvester has a light blue "tail"
	// harvester eats spice and can't die
	// when harvester's energy equals 50, he spawns an omnivorous
	// if harvester is closed by grass, he spawns a grass eater on randomly chosen grass cell
	// harvester can't multiply

	constructor(x, y) {
		super(x, y)

		this.energy = 0
		this.prevX = undefined
		this.prevY = undefined

		matrix[this.y][this.x] = 5
		harvesterArr.push(this)
	}

	chooseCell(num) {
		super.update()
		return super.chooseCell(num)
	}

	eat() {
		const emptyCells = this.chooseCell(3)
		const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell){
			this.energy += 5
			let x = newCell[0]
			let y = newCell[1]

			for (let i = 0; i < spiceArr.length; i++) {
				if(spiceArr[i].x == x && spiceArr[i].y == y) {
					spiceArr.splice(i, 1)
				}
			}

			matrix[y][x] = 5
			matrix[this.y][this.x] = 6
			if (this.prevX || this.prevX == 0 || this.prevY == 0) {
				matrix[this.prevY][this.prevX] = 0
			}

			this.prevX = this.x
			this.prevY = this.y

			this.x = x
			this.y = y

			if(this.energy > 50) {
				const emptyCells = this.chooseCell(0)
				const openedCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

				if (openedCell) {
					let openedX = openedCell[0]
					let openedY = openedCell[1]

					this.energy = 0
					new Omnivorous(openedX, openedY)
				}
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

			matrix[y][x] = 5
			matrix[this.y][this.x] = 6
			if (this.prevX || this.prevX == 0 || this.prevY == 0) {
				matrix[this.prevY][this.prevX] = 0
			}

			this.prevX = this.x
			this.prevY = this.y

			this.x = x
			this.y = y
		}
		else {
			const emptyCells = this.chooseCell(1)
			const closingCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

			let closingX = closingCell[0]
			let closingY = closingCell[1]

			for (let i = 0; i < grassArr.length; i++) {
				if(grassArr[i].x == closingX && grassArr[i].y == closingY) {
					grassArr.splice(i, 1)
				}
			}

			matrix[closingY][closingX] = 0
			new GrassEater(closingX, closingY)
		}
	}

	die() {
		for (let i = 0; i < harvesterArr.length; i++) {
			if(harvesterArr[i].x == this.x && harvesterArr[i].y == this.y){
				harvesterArr.splice(i, 1)
			}
		}

		matrix[this.y][this.x] = 0
	}
}