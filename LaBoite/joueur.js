
Joueur = function(canH_,canW_){
	this.x=0;
	this.y=0;
	this.h=15;
	this.w=400;
	this.canW=canW_;
	this.canH=canH_;
	this.left=false;
	this.right=false;
	this.mouvement=[];
}
Joueur.prototype = {
	draw : function(c){
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
	keyDown : function (e){
		if(e.keyCode == "39"){
			this.mouvement[39]=1;
			console.log("Passe a true");
			this.right=true;
		}
		if(e.keyCode == '37') {
			this.left=true;
		}
		console.log(this.right);
	},
	keyUp : function(e){
		console.log(this.right);
		if(e.keyCode == "39") {
			this.mouvement[39]=0;
			joueur.moveH(20);
			this.right=false;
		}
		if(e.keyCode == '37') {
			joueur.moveH(-20);
			this.left=false;
		}

	},
	move : function(){
		console.log(this.mouvement.length);
		if(this.right==true) {
			console.log("couou"); 
			joueur.moveH(20);  
		}
		if(this.left==true) {
			joueur.moveH(-20); 
		}
	}
}