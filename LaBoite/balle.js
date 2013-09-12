Balle=function(x,y,canH_,canW_,joueur_){	
	this.x=x;
	this.y=y;
	this.R=10;
	this.dx=Math.random() *8+0.1;
	this.dy=Math.random() *5+3;
	this.canW=canW_;
	this.canH=canH_;
	this.joueur=joueur_;
	this.color=0;
}
Balle.prototype = {
	draw : function(c,color){
		drawKeyboard.fillStyle = color;	
		drawKeyboard.beginPath();
		drawKeyboard.arc(this.x,this.y,this.R,0,Math.PI*2);
		drawKeyboard.fill();
		
	},
	
	move : function(){
		if(this.color>0)
			this.color--;
		this.moveH(this.dx);
		return this.moveV(this.dy);
	},
	moveH : function(delta){
		var newX=this.x+delta;
		if( newX-this.R>0 && newX+this.R<this.canW){
			this.x=newX;
			return;
		}else{
			if( newX-this.R<=0)
				this.x=this.R;
			else
				this.x=this.canW-this.R;
			this.dx*=-1;
		}
	},
	moveV: function(delta){
		var newY=this.y+delta;
		var res=false;
		if( newY-this.R>0 && newY+this.R<this.canH-this.joueur.h){
			this.y=newY;
			return res;
		}else{
			if( newY-this.R<=0){
				this.Y=this.R;
			}else{
				this.y=this.canH-this.R-this.joueur.h;
				if(this.x>this.joueur.x && this.x<this.joueur.x+this.joueur.w){
					var safe =parseInt(document.getElementById('y').innerHTML) + 1;
					if(safe%3==0)
						res =true;
					document.getElementById('y').innerHTML = safe;
				}
				else{
					document.getElementById('x').innerHTML = parseInt(document.getElementById('x').innerHTML) + 1;
					mort+=2;
					this.color+=5;
				}
			}
			
			this.dy*=-1;
		}
		return res;
	}
}
Balles = function(canH_,canW_,joueur_){
	this.tab=[];
	this.Tmax=10000;
	this.canW=canW_;
	this.canH=canH_;
	this.joueur=joueur_;
	this.colorList=['rgba(0,20,30,0.5)','rgba(250,2,3,0.5)','rgba(250,2,3,0.7)','rgba(250,2,3,1)','rgba(250,2,3,0.7)','rgba(250,2,3,1)'];
}
Balles.prototype= {
	add : function (b){
		if(this.tab.length<this.Tmax)
			this.tab.push(b);
		return false;
	},
	move : function (){
		var end= this.tab.length;
		for(var i=0 ;i<end;i++){
			if(this.tab[i].move())
				this.addRandom();
		}
	},
	draw : function(drawKeyboard){
		var end= this.tab.length;
		for(var i=0 ;i<end;i++){
			this.tab[i].draw(drawKeyboard,this.colorList[this.tab[i].color]);
		}
	},
	addRandom : function(){
		var b=new Balle(Math.random()*this.canW,Math.random()*90+10,this.canH,this.canW,this.joueur);		
		if(!this.add(b))
			delete(b);
		document.getElementById('nbBalle').innerHTML=this.tab.length;
	}
}
