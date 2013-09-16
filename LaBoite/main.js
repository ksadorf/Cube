/* =========================== */
/* =========================== */
/* =========================== */
/* KEYBOARD BLOCK RELATED MOVE */
var tabl=[];
Game = function(){
	this.keyboard=[];
	this.ctx;
	var canvasKeyboard = document.getElementById('game');    
    // Set a height and width for the canvas
    this.height = canvasKeyboard.height;
    this.width = canvasKeyboard.width;
	
	this.drawKeyboard = canvasKeyboard.getContext('2d');
	this.joueur= new Joueur(this.width,this.height);
	this.balles= new Balles(this.width,this.height,this.joueur);
	this.initKeyboard();
	

}
Game.prototype={
	redraw : function (mouvement){
		this.clear();
		this.balles.move();
		this.joueur.move(mouvement);
		this.joueur.draw(this.drawKeyboard);
		this.balles.draw(this.drawKeyboard);
	
	},
	initKeyboard : function(){
		this.balles.addRandom();
		document.onkeydown = keyDown;
		document.onkeyup = keyUp;
		requestAnimationFrame(function animate(){
				
				requestAnimationFrame(animate);
				this.redraw(tabl);
		});	
	},
	clear : function(){
		this.drawKeyboard.clearRect(0, 0, this.width, this.height);
	}
	
}




// The main function for initiating everything
function initKeyboard() {

	// Get the canvas by ID
    var canvasKeyboard = document.getElementById('game');
    
    // Set a height and width for the canvas
    var height = canvasKeyboard.height;
    var width = canvasKeyboard.width;
	joueur= new Joueur(width,height);
	balles= new Balles(width,height,joueur);
	
	joueur.x=width/2- joueur.w/2;
	joueur.y=height-joueur.h;
    // A variable we'll use to draw the actual item
    drawKeyboard = canvasKeyboard.getContext('2d');
	balles.addRandom();
	// We want to redraw every 30ms
	//setInterval(redraw, 30);
	// When the user presses a key run a function, when the user stops
	// run another function. We'll get to these functions later.
	
	document.onkeydown = keyDown;
	document.onkeyup = keyUp;
	requestAnimationFrame(function animate(){
			
			requestAnimationFrame(animate);
			redraw(width,height,joueur, balles,tabl);
	});	
}

// Wipe the canvas when we want to move the rectangle, then we can redraw it.
function clear(c,width,height) {
    c.clearRect(0, 0, width, height);
}

function redraw(width,height,joueur, balles,mouvement) {
	
	clear(drawKeyboard,width,height);
	if(tabl[82]){
		balles.removeAll();
		balles.addRandom();
	}
	
	balles.move();
	joueur.move(mouvement);
	joueur.draw(drawKeyboard);
	balles.draw(drawKeyboard);
}

function keyDown(e){
		if(e.keyCode == "39"){
			tabl[39]=true;
			return;
		}
		if(e.keyCode == '37') {
			tabl[37]=true;
			return;
		}
		if(e.keyCode == "82"){
			tabl[82]=true;
			return;
		}

}
function keyUp(e){
		if(e.keyCode == "39"){
			tabl[39]=false;
			return;
		}
		if(e.keyCode == '37') {
			tabl[37]=false;
			return;
		}
		if(e.keyCode == "82"){
			tabl[82]=false;
			return;
		}
}