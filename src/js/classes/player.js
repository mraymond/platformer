class PlayerObj extends EntityObj {
	constructor(canvas) {
		super(canvas);
		this.speed = 4;
		this.canMove = true;
		this.inMotion = false;
		this.canCollide = true;
		this.width = 30;
		this.height = 30;
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - this.height - 10;
		this.bounds = {
			x: canvas.width - this.width,
			y: canvas.height - this.height,
		}
		this.moveDirection = {
			right: false,
			left: false,
		};
		this.jump = false;
		this.jumpHeight = 100;
		this.jumpDelta = 0;
		this.isJumping = false;
		window.addEventListener("keydown", this.onKeyDown.bind(this), false);
		window.addEventListener("keyup", this.onKeyUp.bind(this), false);
	}
	onKeyDown(e) {
		switch(e.code) {
			case 'ArrowLeft':
				this.moveDirection.left = true;
				break;
			case 'ArrowRight':
				this.moveDirection.right = true;
				break;
			case 'Space':
				if (this.isJumping) break;
				this.isJumping = true;
				this.jumpDelta = 0;
				this.jump = true;
				break;
		}
	}
	onKeyUp(e) {
		switch(e.code) {
			case 'ArrowLeft':
				this.moveDirection.left = false;
				break;
			case 'ArrowRight':
				this.moveDirection.right = false;
				break;
			case 'Space':
				this.jump = false;
				break;
		}
	}
	move() {
		if(this.moveDirection.left) {
			this.x -= this.speed;
		}
		if(this.moveDirection.right) {
			this.x += this.speed;
		}
		if(this.jump) {
			this.y -= this.speed;
			this.jumpDelta += this.speed;
			if (this.jumpDelta >= this.jumpHeight) this.jump = false; 
		} else {
			this.y += this.speed
		}
	}

	checkBounds() {
		if (this.x < 0) this.x = 0;
		else if (this.x > this.bounds.x) this.x = this.bounds.x;
		if (this.y < 0) this.y = 0;
		else if (this.y > this.bounds.y) {
			this.y = this.bounds.y;
			this.isJumping = false; // This will need to be somewhere else
		}
	}
	
	render(context) {
		this.move();
		this.checkBounds(0);
		context.fillStyle = "#FFFFFF";
		context.fillRect(this.x, this.y, this.width, this.height);
	}
  }