var canvas, context, entities = [], playerEntity, clickHandlers = [];
var shouldRender = true;
init();
render();

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	playerEntity = new PlayerObj(canvas);
	entities.push(playerEntity);
	canvas.addEventListener("click", onClick, false);
}

function startOver() {
	entities = [];
	entities.push(playerEntity);
}


function render() {
	clearCanvas()
	drawBackground();
	entities.every((entity, index, object) => {
		entity.render(context);
		return true;
	});
	if (shouldRender) {
		window.requestAnimationFrame(render);
	}
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