ScoreElement = function(id,val){
	this.dom=document.getElementById(id);
	this.val=val;
	this.dom.innerHTML=this.val;
}

ScoreElement.prototype={
	incr : function(){
		this.val++;
		this.dom.innerHTML=this.val;
	},
	maj : function(n_val){
		this.val=n_val;
		this.dom.innerHTML=this.val;
	}
}

GameScore = function(divGame){
	this.game = divGame;
	this.curScore = new ScoreElement('score',0);
	
	this.balleMorte = new ScoreElement('x',0);
	this.balleSauve = new ScoreElement('y',0);
	var oldHigh=localStorage.getItem("highScore");
	
	if(oldHigh){
		this.highScore = new ScoreElement('highScore',oldHigh);
	}else{
		this.highScore = new ScoreElement('highScore',0);
	}
	
	this.nbBalle = new ScoreElement('nbBalle',1);
	
	this.initHandler();
}

GameScore.prototype= {
	updateScore : function(){
		var score = this.balleSauve.val *2 - this.balleMorte.val;
		this.curScore.maj(score);
		if(this.curScore.val>= this.highScore.val){//Better highscore
			this.curScore.dom.style.color="#339933";
			this.highScore.maj(score);
			localStorage.setItem("highScore",JSON.stringify(score));
			
		}else{
			this.curScore.dom.style.color="";
		}
		
	},
	ras : function (){
		this.curScore.maj(0);
		this.curScore.dom.style.color="";
		this.balleMorte.maj(0);
		this.nbBalle.maj(1);
		this.balleSauve.maj(0);
	}, 
	initHandler : function(){
		var that=this;
		document.addEventListener('balleMorte', function (e) {
					that.balleMorte.incr();
					that.updateScore();
					
			}, false);
		document.addEventListener('balleSauve', function (e) {
					that.balleSauve.incr();
					if(that.balleSauve.val %3 == 0){
						var event = new Event('addBalle');
						document.dispatchEvent(event);
						that.nbBalle.maj(Math.floor(that.balleSauve.val/3)+1);
					}					
					that.updateScore();
			}, false);	
	}
}