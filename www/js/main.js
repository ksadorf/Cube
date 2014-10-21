window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
screen.mozLockOrientation("portrait-primary")

console.log("COUCOU")

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
			
		var elem = document.getElementById('Body'); 
		elem.addEventListener("touchmove", function(e){
			var touches = e.changedTouches;
			console.log("Mouve" + touches[0].pageX);
			that.joueur.moveAbs(touches[0].pageX);
	
		}, false);
		elem.addEventListener("touchstart", function(e){
			var touches = e.changedTouches;
			console.log("Mouve" + touches[0].pageX);
			that.joueur.moveAbs(touches[0].pageX);
	
		}, false);
		$$('body').doubleTap(function() {
			that.reRoll();
		});
	}
}
new Game();
