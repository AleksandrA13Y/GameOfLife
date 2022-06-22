module.exports = class Inherit {
	constructor(x, y) {
		this.x = x
		this.y = y

		this.direction = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x + 1, this.y],
			[this.x + 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x - 1, this.y + 1],
			[this.x - 1, this.y]
		]
	}

	update() {
		this.direction = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		]
	}

	chooseCell(num) {
		const found = []

		for (const i in this.direction) {
			const x = this.direction[i][0]
			const y = this.direction[i][1]
			if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == num) {
					found.push(this.direction[i])
				}
			}
		}

		return found;
	}
}