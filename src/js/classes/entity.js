class EntityObj {
	constructor(canvas) {
		this.speed = 4;
		this.canMove = true;
		this.inMotion = false;
		this.width = 30;
		this.height = 30;
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - this.height - 10;
		this.remove = false;
		this.canCollide = false;
	}
	move(x,y) {
		this.x = x;
		this.y = y;
	}
	
	render(context) {
		context.fillStyle = "#FFFFFF";
		context.fillRect(this.x, this.y, this.width, this.height);
	}
  }