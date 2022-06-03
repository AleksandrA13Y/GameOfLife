class Inherit {
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
		this.directions = [
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

class Grass extends Inherit {
	constructor(x, y) {
		super(x, y)

		this.multiply = 0

		matrix[this.y][this.x] = 1
		grassArr.push(this)
	}

	mul() {
		const newCell = random(super.chooseCell(0))

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

class GrassEater extends Inherit {
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
		let exact = random(this.chooseCell(0))

		if (exact && this.energy > 8) {
			let x = exact[0]
			let y = exact[1]

			new GrassEater(x, y);
			matrix[y][x] = 2;

			this.energy = 20
		} 
	}

	eat() {
		let exact = random(this.chooseCell(1))

		if (exact){
			this.energy += 5
			let x = exact[0]
			let y = exact[1]

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
		let exact = random(this.chooseCell(0))

		if (exact){
			let x = exact[0]
			let y = exact[1]

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

class Spice extends Inherit {
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
		const newCell = random(super.chooseCell(0))

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

class Omnivorous extends Inherit {
	// omnivorous eats grass and grass eaters
	// omnivorous can't eat other omnivorouses

	constructor(x, y) {
		super(x, y)

		this.energy = 20

		matrix[this.y][this.x] = 4
		omnivorousArr.push(this)
	}

	moving() {
		const movingCell = random(this.chooseCell(0))

		if(movingCell) {
			const x = movingCell[0]
			const y = movingCell[1]

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
		const exact = random(this.chooseCell(0))

		if (exact) {
			const x = exact[0]
			const y = exact[1]

			new Omnivorous(x, y)
			matrix[y][x] = 4

			this.energy = 20
		} 
	}

	eat() {
		const exact = random(this.chooseCell(1, 2))

		if(exact) {
			this.energy += 5
			const x = exact[0]
			const y = exact[1]

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

class Harvester extends Inherit {
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
		let exact = random(this.chooseCell(3))

		if (exact){
			this.energy += 5
			let x = exact[0]
			let y = exact[1]

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
				let openedCell = random(this.chooseCell(0))

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
		let exact = random(this.chooseCell(0))

		if (exact){
			let x = exact[0]
			let y = exact[1]

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
			let closingCell = random(this.chooseCell(1))

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