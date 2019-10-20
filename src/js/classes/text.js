class TextObj extends EntityObj {
	constructor(canvas, x, y, text, options) {
        super(canvas);
		this.x = x;
        this.y = y;
        this.remove = false;
        this.text = text;
        this.font = options.font || '48px Arial';
        this.color = options.color || '#ffffff';
        this.textAlign = options.textAlign || '';
        this.height = 48; // temp
        context.font = this.font;
        this.width = context.measureText(text).width;
	}
	
	render(context) {
        context.fillStyle = this.color;
        context.textAlign = this.textAlign; 
        context.font = this.font;
        context.fillText(this.text, this.x, this.y);
	}
  }