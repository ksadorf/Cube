
Game = function(){
	this.keyboard=[];
	var canvasKeyboard = document.getElementById('game');    
    // Set a height and width for the canvas
    this.height = canvasKeyboard.height;
    this.width = canvasKeyboard.width;
	
	this.drawKeyboard = canvasKeyboard.getContext('2d');
	this.joueur= new Joueur(this.width,this.height);
	this.balles= new Balles(this.width,this.height,this.joueur);
	this.balleMorte=0;
	this.balleSauve=0;
	this.highScore=0;
	
	this.initHandler();
	this.initKeyboard();
}
Game.prototype={
	redraw : function (){
		this.clear();
		if(this.keyboard[82]){
			this.reRoll();
		}
		this.balles.move();
		this.joueur.move(this.keyboard);
		document.getElementById('x').innerHTML=this.balleMorte;
		document.getElementById('y').innerHTML=this.balleSauve;
		var curScore=this.balleSauve*2-this.balleMorte;
		document.getElementById('score').innerHTML = curScore;
		if(curScore>=this.highScore){
			this.highScore=curScore;
			document.getElementById('score').style.color="#339933";
			document.getElementById('highScore').innerHTML = curScore;
		}else{
			document.getElementById('score').style.color="";
		}
		this.joueur.draw(this.drawKeyboard);
		this.balles.draw(this.drawKeyboard);
	
	},
	initKeyboard : function(){
		this.balles.addRandom();
		var that = this;		
		requestAnimationFrame(function animate(){				
				requestAnimationFrame(animate);
				
				that.redraw();
				
		});	
	},
	clear : function(){
		this.drawKeyboard.clearRect(0, 0, this.width, this.height);
	},
	reRoll : function() {
		this.balleMorte=0;
		this.balleSauve=0;
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
		document.addEventListener('balleMorte', function (e) {
				that.balleMorte++;
			}, false);
		document.addEventListener('balleSauve', function (e) {
				that.balleSauve++;
			}, false);
	}
}

