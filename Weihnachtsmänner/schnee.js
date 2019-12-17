class Flocke {
				constructor()
				{
					this.size = Math.random() * 2;
					this.x = Math.random() * width;
					this.y = -10;
					this. moveX = Math.random() * 3 - 1.5;
					this.moveY = Math.random() * 2;
				}
				
				draw(flocken)
				{
					ctx.fillStyle = "#FFFFFF";
					ctx.beginPath();
					ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
					ctx.fill();
					ctx.strokeStyle = "#FFFFFF";
					ctx.stroke();
					this.x += this.moveX;
					this.y += this.moveY;
					if(this.y > height)
					{
						return true;
					}
				}
			}
			
			class SchneeFlocken{
				constructor()
				{
					this.flocken = new Array();
					for( var i = 0; i < 200; i++)
					{
						this.flocken.push(new Flocke());
					}
				}
				
				draw()
				{
					
					for( var i = 0; i < 200; i++)
					{
						if(this.flocken[i].draw(this))
						{
							this.flocken.splice(i,1);
							this.flocken.push(new Flocke());
						}
					}
				}
			}
			
			var canvas = document.getElementById('newCanvas');
			var ctx = canvas.getContext('2d');
			var schnee = new SchneeFlocken();
			var height = canvas.height;
			var width = canvas.width;
			draw();
			
			function draw() {
				ctx.clearRect(0, 0, width, height);
				window.requestAnimationFrame(draw);
				schnee.draw();
			}