window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
screen.mozLockOrientation("portrait-primary")



Game = function(){
	this.keyboard=[];
	var canvasKeyboard = document.getElementById('game');    
    // Set a height and width for the canvas
    this.height = canvasKeyboard.height;
    this.width = canvasKeyboard.width;
	
	this.drawKeyboard = canvasKeyboard.getContext('2d');
	this.joueur= new Joueur(this.width,this.height);
	this.balles= new Balles(this.width,this.height,this.joueur);
	this.gameScore = new GameScore();
	
	this.initHandler();
	this.launchGame();
}
Game.prototype={
	redraw : function (){	
		this.clear();
		if(this.keyboard[82]){
			this.reRoll();
		}
		this.balles.move();
		this.joueur.move(this.keyboard);
		this.joueur.draw(this.drawKeyboard);
		this.balles.draw(this.drawKeyboard);
	
	},
	launchGame : function(){
		this.balles.addRandom();
		var that = this;
		
		requestAnimFrame(function animate(){				
				requestAnimFrame(animate);	
		
				that.redraw();				
		});	
		
	},
	clear : function(){
		this.drawKeyboard.clearRect(0, 0, this.width, this.height);
	},
	reRoll : function() {
		this.gameScore.ras();
		this.balles.removeAll();
		this.balles.addRandom();
	},
	initHandler : function(){
		var that = this;
		document.onkeydown = function(e){
			var key=parseInt(e.keyCode);
			that.keyboard[key]=true;
		};
		document.onkeyup = function(e){
			var key=parseInt(e.keyCode);
			that.keyboard[key]=false;
		};
		document.addEventListener('addBalle', function (e) {
				that.balles.addRandom();
			}, false);

	window.ondeviceorientation= function(e) {
			var y = e.gamma; // En degré sur l'interval [-90,90].
	
			// Pour rendre le calcul plus simple.
			// On délimite l'intervalle de x et y sur [0, 180].
			y += 90;
			if( y<85){
				that.keyboard[39]=true;
				that.keyboard[37]=false;
				if( y<20){
					that.reRoll();
				}
			}else if( y>95){
				that.keyboard[37]=true;
				that.keyboard[39]=false;
				if( y>160){
					that.reRoll();
				}
			}else{
				that.keyboard[37]=false;
				that.keyboard[39]=false;
			}

		};
	}
}

