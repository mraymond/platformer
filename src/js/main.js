var canvas, context, entities = [], playerEntity, clickHandlers = [];
var shouldRender = true;
var boxes = [];

// player start = 1
	// Block = 2
	// Empty = 0
	var level = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0],
		[0,0,1,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0],
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	];

init();
render();

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	playerEntity = new PlayerObj(canvas);
	entities.push(playerEntity);
	level.forEach(function(row, rowIndex) {
		row.forEach(function(cell, cellIndex) {
			context.fillStyle = "#00FF00";
			if(cell == 2) {
				boxes.push({
					width: 30,
					height: 30,
					x: cellIndex*30,
					y: rowIndex*30,
				});
			}
			if(cell == 1) playerEntity.setPosition(cellIndex*30, rowIndex*30);
		});
	});
	canvas.addEventListener("click", onClick, false);
}

function startOver() {
	entities = [];
	entities.push(playerEntity);
	level.forEach(function(row, rowIndex) {
		row.forEach(function(cell, cellIndex) {
			context.fillStyle = "#00FF00";
			if(cell == 1) playerEntity.setPosition(cellIndex*30, rowIndex*30);
		});
	});
}


function render() {
	clearCanvas()
	drawBackground();
	drawLevel();
	entities.every((entity, index, object) => {
		entity.render(context);
		return true;
	});
	boxes.forEach((box) => {
		var dir = colCheck(playerEntity, box);
		if (dir) console.log(dir);
	})
	if (shouldRender) {
		window.requestAnimationFrame(render);
	}
}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
				shapeA.y -= oY;
				shapeA.isJumping = false;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

function drawLevel() {
	level.forEach(function(row, rowIndex) {
		row.forEach(function(cell, cellIndex) {
			context.fillStyle = "#00FF00";
			if(cell == 2) context.fillRect(cellIndex*30, rowIndex*30, 30, 30);
		});
	});
}

function drawBackground() {
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.height, canvas.width);
}

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function gameOver() {
	clearInterval(enemySpawner);
	entities = [];
	entities.push(new TextObj(canvas,
		canvas.width/2,
		canvas.height/2,
		'GAME OVER',
		{
			color: '#ff0000',
			textAlign: 'center',
			font: '48px Arial',
		}
	));
	var newGame = new TextObj(canvas,
		canvas.width/2,
		canvas.height/2+60,
		'PLAY AGAIN?',
		{
			color: '#00FF00',
			textAlign: 'start',
			font: '48px Arial',
		}
	);
	addClickEvent(newGame, startOver);
	entities.push(newGame);
}

function addClickEvent(entity, callback) {
	clickHandlers.push({
		entity: entity,
		callback: callback,
	})
}

function onClick(event) {
	var x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
	clickHandlers.forEach(function(handler) {
		console.log(x, y, handler);
		if (y < handler.entity.y && y > handler.entity.y - handler.entity.height 
            && x > handler.entity.x && x < handler.entity.x + handler.entity.width) {
            handler.callback();
        }
	});
}