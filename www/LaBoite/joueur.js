
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
	moveAbs:function (newX){
		
		if(typeof(newX)!="undefined"){
			var equivalentX=newX/document.getElementById('game').offsetWidth*this.canW;
			equivalentX=equivalentX-this.w/2;
			if(equivalentX<0){
				this.x=0
			}else if(equivalentX+this.w> this.canW){
				this.x=this.canW-this.w;
			}else{
				this.x=equivalentX;
				}
		}
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