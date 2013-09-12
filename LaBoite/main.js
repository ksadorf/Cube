/* =========================== */
/* =========================== */
/* =========================== */
/* KEYBOARD BLOCK RELATED MOVE */



var mort = 0;

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
	document.onkeydown = joueur.keyDown;
	document.onkeyup = joueur.keyUp;
	requestAnimationFrame(function animate(){
			requestAnimationFrame(animate);
			redraw(width,height,joueur, balles);
	});
	
	
}

// Wipe the canvas when we want to move the rectangle, then we can redraw it.
function clear(c,width,height) {
    c.clearRect(0, 0, width, height);
}

function redraw(width,height,joueur, balles) {
	clear(drawKeyboard,width,height);
	balles.move();
	joueur.move();
	if(mort>0){
		drawKeyboard.fillStyle = 'rgba(255,0,0,1)';
		drawKeyboard.fillRect(0 , 0, width, height);
		mort--;
	}
	joueur.draw(drawKeyboard);
	balles.draw(drawKeyboard);
}