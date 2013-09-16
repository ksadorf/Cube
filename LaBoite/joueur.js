
Joueur = function(canH_,canW_){
	
	
	this.h=15;
	this.w=100;
	this.x=canW_/2-this.w/2;
	this.y=canH_-this.h;
	this.canW=canW_;
	this.canH=canH_;	
}
Joueur.prototype = {
	draw : function(drawKeyboard){
		drawKeyboard.fillStyle = 'rgba(0,0,0,0.5)';
		drawKeyboard.fillRect(this.x , this.y, this.w, this.h);
	},
	moveH : function(delta){
		var newX=this.x+delta;
		if( newX<0){
			if( this.x!=0){
				this.x=0;
			}
			return;
		}
		if(newX+this.w>this.canW ){
			if(this.x+this.w!=this.canW){
				this.x=this.canW-this.w;
			}
			return;
		}
		this.x=newX;
		return;
	},
	moveV: function(delta){
		var newY=this.y+delta;
		if( newY<0){
			if( this.y!=0){
				this.y=0;
			}
			return;
		}
		if(newY+this.h>this.canH ){
			if(this.y+this.h!=this.canH){
				this.y=this.canH-this.h;
			}
			return;
		}
		this.y=newY;
		return;
	},
	move : function(keyboard){
	if(typeof(keyboard)!="undefined"){
		if(keyboard[39]) { //left
			this.moveH(15);  
		}
		if(keyboard[37]) { //right
			this.moveH(-15); 
		}
	}
	}
}