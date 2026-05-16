// MathMaty Games Library - Juegos HTML5 Canvas
var MathGames = {
  current: null,
  games: {},
  score: 0,
  running: false,
  animFrame: null,
  onEnd: null,
  onScoreCallback: null,

  register: function(id, name, desc, icon, cls, config) {
    this.games[id] = { id:id, name:name, desc:desc, icon:icon, cls:cls, config:config||{} };
  },

  getRandom: function() {
    var keys = Object.keys(this.games);
    return this.games[keys[Math.floor(Math.random() * keys.length)]];
  },

  launch: function(gameId, containerId, onEndCallback) {
    this.onEnd = onEndCallback || null;
    this.running = true;
    this.score = 0;
    var game = this.games[gameId] || this.getRandom();
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    var h = document.createElement('div');
    h.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0;font-size:.85rem;';
    h.innerHTML = '<span>' + (game.icon||'') + ' ' + game.name + ' | <span style="color:var(--color-text-muted);font-size:.75rem;">' + (game.config.controls||'') + '</span></span>' +
      '<span style="color:var(--color-warning)" id="game-score-label">0</span>';
    container.appendChild(h);
    var scoreEl = document.getElementById('game-score-label');
    var me = this;
    var area = document.createElement('div');
    area.style.cssText = 'width:100%;background:#000;border-radius:8px;overflow:hidden;';
    var cv = document.createElement('canvas');
    cv.style.cssText = 'display:block;width:100%;aspect-ratio:4/3;';
    area.appendChild(cv);
    container.appendChild(area);
    this.current = new game.cls(cv, {
      width:400,height:300,
      onScore:function(p){me.score+=p;if(scoreEl)scoreEl.textContent=me.score;},
      onEnd:function(){me.running=false;if(me._lf){cancelAnimationFrame(me._lf);me._lf=null;}if(me.current&&me.current.cleanup)me.current.cleanup();if(me.onEnd)me.onEnd(me.score);}
    });
    try { if (this.current && this.current.start) this.current.start(); } catch(e) {}
    var l = function(){if(!me.running||!me.current)return;try{if(me.current.update)me.current.update();}catch(e){}me._lf=requestAnimationFrame(l);};
    me._lf = requestAnimationFrame(l);
  },

  stop: function() {
    this.running = false;
    if (this._lf) { cancelAnimationFrame(this._lf); this._lf = null; }
    if (this.animFrame) { cancelAnimationFrame(this.animFrame); this.animFrame = null; }
    if (this.current && this.current.cleanup) this.current.cleanup();
    this.current = null;
  }
};

// ===== BASE GAME =====
function BaseGame(canvas, opts) {
  this.canvas = canvas; this.ctx = canvas.getContext('2d');
  this.opts = opts || {}; this.W = opts.width || 400; this.H = opts.height || 300;
  canvas.width = this.W; canvas.height = this.H;
  this.keys = {}; this.score = 0; this.alive = true;
  var s = this;
  this._kh = function(e) {
    s.keys[e.key] = e.type === 'keydown';
    // Prevent game keys from triggering page buttons
    var gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'];
    if (gameKeys.indexOf(e.key) !== -1) {
      e.preventDefault();
    }
  };
  document.addEventListener('keydown', this._kh);
  document.addEventListener('keyup', this._kh);
  // Focus canvas on click so it captures keys
  this.canvas.tabIndex = 0;
  this._focusHandler = function() { s.canvas.focus(); };
  this.canvas.addEventListener('click', this._focusHandler);
  c.width = this.W; c.height = this.H;
  setTimeout(function() { s.canvas.focus(); }, 100);
}
BaseGame.prototype.pts = function(p) { this.score += (p||1); if(this.opts.onScore) this.opts.onScore(p||1); };
BaseGame.prototype.end = function() { this.alive = false; this.cleanup(); if(this.opts.onEnd) this.opts.onEnd(this.score); };
BaseGame.prototype.cleanup = function() {
  document.removeEventListener('keydown', this._kh);
  document.removeEventListener('keyup', this._kh);
  // Remove click-to-focus handler
  if (this.canvas && this._focusHandler) {
    this.canvas.removeEventListener('click', this._focusHandler);
  }
};
BaseGame.prototype.cls = function() { this.ctx.fillStyle = '#000'; this.ctx.fillRect(0,0,this.W,this.H); };
BaseGame.prototype.txt = function(s, x, y, c) { this.ctx.fillStyle = c||'#fff'; this.ctx.font='13px monospace'; this.ctx.textAlign='center'; this.ctx.fillText(s, x||this.W/2, y||20); };

// ===== 1. SNAKE (Culebrita) =====
function SnakeGame(c, o) { BaseGame.call(this,c,o); this.cell=10; this.vx=1; this.vy=0; this.body=[{x:10,y:10}]; this.food={x:15,y:15}; this.t=0; this.d=100; }
SnakeGame.prototype = Object.create(BaseGame.prototype);
SnakeGame.prototype.start = function() { this.food={x:2+Math.floor(Math.random()*((this.W/this.cell)-4)),y:2+Math.floor(Math.random()*((this.H/this.cell)-4))}; };
SnakeGame.prototype.update = function() {
  if(!this.alive) return;
  if(this.keys['ArrowUp']&&this.vy===0){this.vx=0;this.vy=-1}if(this.keys['ArrowDown']&&this.vy===0){this.vx=0;this.vy=1}
  if(this.keys['ArrowLeft']&&this.vx===0){this.vx=-1;this.vy=0}if(this.keys['ArrowRight']&&this.vx===0){this.vx=1;this.vy=0}
  this.t+=16;if(this.t<this.d){this.paint();return}this.t=0;
  var h={x:this.body[0].x+this.vx,y:this.body[0].y+this.vy};
  if(h.x<0||h.x>=this.W/this.cell||h.y<0||h.y>=this.H/this.cell){this.end();return}
  for(var i=0;i<this.body.length;i++){if(h.x===this.body[i].x&&h.y===this.body[i].y){this.end();return}}
  this.body.unshift(h);
  if(h.x===this.food.x&&h.y===this.food.y){this.pts(10);this.food={x:2+Math.floor(Math.random()*((this.W/this.cell)-4)),y:2+Math.floor(Math.random()*((this.H/this.cell)-4))};this.d=Math.max(40,this.d-2);}
  else this.body.pop();
  this.paint();
};
SnakeGame.prototype.paint = function() {
  this.cls(); this.ctx.fillStyle='#ef4444'; this.ctx.fillRect(this.food.x*this.cell,this.food.y*this.cell,this.cell-1,this.cell-1);
  this.ctx.fillStyle='#10b981'; for(var i=0;i<this.body.length;i++) this.ctx.fillRect(this.body[i].x*this.cell,this.body[i].y*this.cell,this.cell-1,this.cell-1);
  this.txt('Snake | Pts: '+this.score);
};

// ===== 2. PONG =====
function PongGame(c,o){BaseGame.call(this,c,o);this.b={x:this.W/2,y:this.H/2,vx:3,vy:2,r:6};this.p1={y:this.H/2-30,h:60};this.p2={y:this.H/2-30,h:60};this.pw=8;this.s1=0;this.s2=0;}
PongGame.prototype=Object.create(BaseGame.prototype);
PongGame.prototype.update=function(){
  if(this.keys['w']||this.keys['W'])this.p1.y=Math.max(0,this.p1.y-5);if(this.keys['s']||this.keys['S'])this.p1.y=Math.min(this.H-this.p1.h,this.p1.y+5);
  if(this.keys['ArrowUp'])this.p2.y=Math.max(0,this.p2.y-4);else if(this.keys['ArrowDown'])this.p2.y=Math.min(this.H-this.p2.h,this.p2.y+4);
  else{var t=this.b.y-this.p2.h/2;if(Math.abs(this.p2.y-t)>3)this.p2.y+=(t>this.p2.y?2:-2);}
  this.b.x+=this.b.vx;this.b.y+=this.b.vy;if(this.b.y<=0||this.b.y>=this.H)this.b.vy*=-1;
  if(this.b.x<=this.pw+5&&this.b.y>=this.p1.y&&this.b.y<=this.p1.y+this.p1.h)this.b.vx=Math.abs(this.b.vx);
  if(this.b.x>=this.W-this.pw-5-this.b.r&&this.b.y>=this.p2.y&&this.b.y<=this.p2.y+this.p2.h)this.b.vx=-Math.abs(this.b.vx);
  if(this.b.x<0){this.s2++;this.reset();}if(this.b.x>this.W){this.s1++;this.pts(10);this.reset();}
  if(this.s1>=5||this.s2>=5){this.end();return;}this.paint();
};
PongGame.prototype.reset=function(){this.b.x=this.W/2;this.b.y=this.H/2;this.b.vx=(Math.random()>0.5?1:-1)*3;this.b.vy=(Math.random()>0.5?1:-1)*2;};
PongGame.prototype.paint=function(){this.cls();this.ctx.fillStyle='#fff';this.ctx.fillRect(5,this.p1.y,this.pw,this.p1.h);this.ctx.fillRect(this.W-5-this.pw,this.p2.y,this.pw,this.p2.h);this.ctx.beginPath();this.ctx.arc(this.b.x,this.b.y,this.b.r,0,Math.PI*2);this.ctx.fill();this.txt(this.s1+' - '+this.s2);};

// ===== 3. TIC TAC TOE (Gato) =====
function TTTGame(c,o){BaseGame.call(this,c,o);this.b=[[0,0,0],[0,0,0],[0,0,0]];this.t=1;this.w=0;this.go=false;var s=this;this.canvas.onclick=function(e){
  if(s.go)return;var r=s.canvas.getBoundingClientRect();var sx=s.W/r.width;var sy=s.H/r.height;
  var x=Math.floor(((e.clientX-r.left)*sx)/(s.W/3));var y=Math.floor(((e.clientY-r.top)*sy)/(s.H/3));
  if(x<0||x>2||y<0||y>2)return;if(s.b[y][x]!==0)return;s.b[y][x]=s.t;s.w=s.ck();
  if(s.w!==0){s.go=true;s.pts(s.w===1?50:10);s.end();return}
  if(s.b.every(function(r){return r.every(function(c){return c!==0})})){s.go=true;s.pts(20);s.end();return}
  s.t=s.t===1?2:1;if(s.t===2)setTimeout(function(){s.ai();},200);
};}
TTTGame.prototype=Object.create(BaseGame.prototype);
TTTGame.prototype.ck=function(){for(var i=0;i<3;i++){if(this.b[i][0]!==0&&this.b[i][0]===this.b[i][1]&&this.b[i][1]===this.b[i][2])return this.b[i][0];if(this.b[0][i]!==0&&this.b[0][i]===this.b[1][i]&&this.b[1][i]===this.b[2][i])return this.b[0][i];}if(this.b[0][0]!==0&&this.b[0][0]===this.b[1][1]&&this.b[1][1]===this.b[2][2])return this.b[0][0];if(this.b[0][2]!==0&&this.b[0][2]===this.b[1][1]&&this.b[1][1]===this.b[2][0])return this.b[0][2];return 0;};
TTTGame.prototype.ai=function(){
  for(var i=0;i<3;i++)for(var j=0;j<3;j++)if(this.b[i][j]===0){this.b[i][j]=2;if(this.ck()===2){this.ft();return}this.b[i][j]=0;}
  for(var i=0;i<3;i++)for(var j=0;j<3;j++)if(this.b[i][j]===0){this.b[i][j]=1;if(this.ck()===1){this.b[i][j]=2;this.ft();return}this.b[i][j]=0;}
  if(this.b[1][1]===0){this.b[1][1]=2;this.ft();return}var e=[];for(var i=0;i<3;i++)for(var j=0;j<3;j++)if(this.b[i][j]===0)e.push({x:j,y:i});if(e.length>0){var p=e[Math.floor(Math.random()*e.length)];this.b[p.y][p.x]=2;this.ft();}
};
TTTGame.prototype.ft=function(){this.w=this.ck();if(this.w!==0||this.b.every(function(r){return r.every(function(c){return c!==0})})){this.go=true;this.pts(20);this.end();return}this.t=1;};
TTTGame.prototype.update=function(){
  this.cls();var s=this.W/3;this.ctx.strokeStyle='#333';this.ctx.lineWidth=2;
  for(var i=1;i<3;i++){this.ctx.beginPath();this.ctx.moveTo(i*s,0);this.ctx.lineTo(i*s,this.H);this.ctx.stroke();this.ctx.beginPath();this.ctx.moveTo(0,i*s);this.ctx.lineTo(this.W,i*s);this.ctx.stroke();}
  for(var y=0;y<3;y++)for(var x=0;x<3;x++){
    if(this.b[y][x]===1){this.ctx.fillStyle='#3b82f6';this.ctx.font='40px sans-serif';this.ctx.textAlign='center';this.ctx.textBaseline='middle';this.ctx.fillText('X',x*s+s/2,y*s+s/2);}
    else if(this.b[y][x]===2){this.ctx.strokeStyle='#ef4444';this.ctx.lineWidth=3;this.ctx.beginPath();this.ctx.arc(x*s+s/2,y*s+s/2,s/3,0,Math.PI*2);this.ctx.stroke();}
  }
  this.txt(this.go?'Fin':'Turno: '+(this.t===1?'X (Tu)':'O (IA)'));
};

// ===== 4. DINO RUN (Chrome Dino) =====
function DinoGame(c,o){BaseGame.call(this,c,o);this.d={x:50,y:this.H-50,w:28,h:38,vy:0};this.obs=[];this.g=0.6;this.jp=-10;this.gr=this.H-10;this.sp=4;this.f=0;}
DinoGame.prototype=Object.create(BaseGame.prototype);
DinoGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if((this.keys[' ']||this.keys['ArrowUp']||this.keys['w'])&&this.d.y>=this.gr-this.d.h)this.d.vy=this.jp;
  this.d.vy+=this.g;this.d.y+=this.d.vy;if(this.d.y>this.gr-this.d.h){this.d.y=this.gr-this.d.h;this.d.vy=0;}
  if(this.f%60===0&&Math.random()<0.5)this.obs.push({x:this.W,y:this.gr-20-Math.random()*20,w:8+Math.random()*15,h:20+Math.random()*25});
  for(var i=this.obs.length-1;i>=0;i--){
    this.obs[i].x-=this.sp;
    if(this.obs[i].x<this.d.x+this.d.w&&this.obs[i].x+this.obs[i].w>this.d.x&&this.gr-this.d.h<this.obs[i].y+this.obs[i].h&&this.gr>this.obs[i].y){this.end();return}
    if(this.obs[i].x+this.obs[i].w<0){this.obs.splice(i,1);this.pts(1);}
  }
  this.sp=4+Math.floor(this.score/15)*0.5;
  this.cls();this.ctx.fillStyle='#555';this.ctx.fillRect(0,this.gr,this.W,2);
  this.ctx.fillStyle='#10b981';this.ctx.fillRect(this.d.x,this.d.y,this.d.w,this.d.h);
  this.ctx.fillStyle='#ef4444';for(var i=0;i<this.obs.length;i++)this.ctx.fillRect(this.obs[i].x,this.obs[i].y,this.obs[i].w,this.obs[i].h);
  this.txt('Dino Run | '+this.score);
};

// ===== 5. BREAKOUT =====
function BreakGame(c,o){BaseGame.call(this,c,o);this.p={x:this.W/2-40,y:this.H-20,w:80,h:10};this.bb={x:this.W/2,y:this.H-35,vx:3,vy:-3,r:5};this.br=[];this.lv=3;
  var cs=['#ef4444','#f59e0b','#10b981','#3b82f6','#a855f7'];for(var r=0;r<5;r++)for(var cl=0;cl<8;cl++)this.br.push({x:cl*50+5,y:r*20+25,w:45,h:15,al:true,col:cs[r]});}
BreakGame.prototype=Object.create(BaseGame.prototype);
BreakGame.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowLeft']||this.keys['a'])this.p.x=Math.max(0,this.p.x-5);if(this.keys['ArrowRight']||this.keys['d'])this.p.x=Math.min(this.W-this.p.w,this.p.x+5);
  this.bb.x+=this.bb.vx;this.bb.y+=this.bb.vy;if(this.bb.x<=0||this.bb.x>=this.W)this.bb.vx*=-1;if(this.bb.y<=0)this.bb.vy*=-1;
  if(this.bb.y+this.bb.r>=this.p.y&&this.bb.y+this.bb.r<=this.p.y+this.p.h&&this.bb.x>=this.p.x&&this.bb.x<=this.p.x+this.p.w)this.bb.vy=-Math.abs(this.bb.vy);
  for(var i=0;i<this.br.length;i++){var b=this.br[i];if(!b.al)continue;if(this.bb.x>b.x&&this.bb.x<b.x+b.w&&this.bb.y>b.y&&this.bb.y<b.y+b.h){b.al=false;this.bb.vy*=-1;this.pts(5);}}
  if(this.bb.y>this.H){this.lv--;if(this.lv<=0){this.end();return}this.bb.x=this.W/2;this.bb.y=this.H-35;this.bb.vx=3*(Math.random()>0.5?1:-1);this.bb.vy=-3;}
  if(this.br.every(function(b){return !b.al})){this.pts(100);this.end();return}
  this.cls();this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.p.x,this.p.y,this.p.w,this.p.h);
  this.ctx.fillStyle='#fff';this.ctx.beginPath();this.ctx.arc(this.bb.x,this.bb.y,this.bb.r,0,Math.PI*2);this.ctx.fill();
  for(var i=0;i<this.br.length;i++){if(this.br[i].al){this.ctx.fillStyle=this.br[i].col;this.ctx.fillRect(this.br[i].x,this.br[i].y,this.br[i].w,this.br[i].h);}}
  this.txt('Breakout | V:'+this.lv+' Pts:'+this.score);
};

// ===== 6. SPACE INVADERS =====
function SpaceGame(c,o){BaseGame.call(this,c,o);this.p={x:this.W/2-20,y:this.H-30,w:40,h:20};this.bul=[];this.ens=[];this.dir=1;this.ft=0;
  for(var r=0;r<4;r++)for(var cl=0;cl<8;cl++)this.ens.push({x:cl*45+20,y:r*30+20,w:35,h:20,al:true});}
SpaceGame.prototype=Object.create(BaseGame.prototype);
SpaceGame.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowLeft']||this.keys['a'])this.p.x=Math.max(0,this.p.x-4);if(this.keys['ArrowRight']||this.keys['d'])this.p.x=Math.min(this.W-this.p.w,this.p.x+4);
  if((this.keys[' ']||this.keys['ArrowUp'])&&this.ft<=0){this.bul.push({x:this.p.x+this.p.w/2-2,y:this.p.y,w:4,h:10,vy:-5});this.ft=15;}this.ft--;
  for(var i=this.bul.length-1;i>=0;i--){this.bul[i].y+=this.bul[i].vy;if(this.bul[i].y<0){this.bul.splice(i,1);continue}
    for(var j=0;j<this.ens.length;j++){if(!this.ens[j].al)continue;if(this.bul[i]&&this.bul[i].x<this.ens[j].x+this.ens[j].w&&this.bul[i].x+this.bul[i].w>this.ens[j].x&&this.bul[i].y<this.ens[j].y+this.ens[j].h&&this.bul[i].y+this.bul[i].h>this.ens[j].y){this.ens[j].al=false;this.bul.splice(i,1);this.pts(10);break;}}}
  var he=false;for(var i=0;i<this.ens.length;i++){if(!this.ens[i].al)continue;this.ens[i].x+=this.dir*0.5;if(this.ens[i].x<=0||this.ens[i].x>=this.W-this.ens[i].w)he=true;if(this.ens[i].y+this.ens[i].h>=this.p.y){this.end();return}}
  if(he){this.dir*=-1;for(var i=0;i<this.ens.length;i++)if(this.ens[i].al)this.ens[i].y+=10;}
  if(this.ens.every(function(e){return !e.al})){this.pts(200);this.end();return}
  this.cls();this.ctx.fillStyle='#10b981';this.ctx.fillRect(this.p.x,this.p.y,this.p.w,this.p.h);
  for(var i=0;i<this.bul.length;i++){this.ctx.fillStyle='#f59e0b';this.ctx.fillRect(this.bul[i].x,this.bul[i].y,this.bul[i].w,this.bul[i].h);}
  for(var i=0;i<this.ens.length;i++){if(this.ens[i].al){this.ctx.fillStyle='#ef4444';this.ctx.fillRect(this.ens[i].x,this.ens[i].y,this.ens[i].w,this.ens[i].h);}}
  this.txt('Invaders | '+this.score);
};

// ===== 7. FLAPPY BIRD =====
function FlappyGame(c,o){BaseGame.call(this,c,o);this.b={x:60,y:this.H/2,vy:0,r:8};this.ps=[];this.f=0;this.g=0.35;this.gap=90;this.pw=35;}
FlappyGame.prototype=Object.create(BaseGame.prototype);
FlappyGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if(this.keys[' ']||this.keys['ArrowUp']||this.keys['w'])this.b.vy=-5.5;
  this.b.vy+=this.g;this.b.y+=this.b.vy;if(this.b.y<0||this.b.y>this.H){this.end();return}
  if(this.f%70===0){var py=20+Math.floor(Math.random()*(this.H-this.gap-40));this.ps.push({x:this.W,top:py,bot:py+this.gap,sc:false});}
  for(var i=this.ps.length-1;i>=0;i--){this.ps[i].x-=2.5;if(this.ps[i].x+this.pw<0){this.ps.splice(i,1);continue}
    if(!this.ps[i].sc&&this.ps[i].x+this.pw<this.b.x){this.ps[i].sc=true;this.pts(5);}
    if(this.b.x+this.b.r>this.ps[i].x&&this.b.x-this.b.r<this.ps[i].x+this.pw&&(this.b.y-this.b.r<this.ps[i].top||this.b.y+this.b.r>this.ps[i].bot)){this.end();return}}
  this.cls();this.ctx.fillStyle='#f59e0b';this.ctx.beginPath();this.ctx.arc(this.b.x,this.b.y,this.b.r,0,Math.PI*2);this.ctx.fill();
  this.ctx.fillStyle='#10b981';for(var i=0;i<this.ps.length;i++){this.ctx.fillRect(this.ps[i].x,0,this.pw,this.ps[i].top);this.ctx.fillRect(this.ps[i].x,this.ps[i].bot,this.pw,this.H-this.ps[i].bot);}
  this.txt('Flappy | '+this.score);
};

// ===== 8. MEMORY MATCH =====
function MemGame(c,o){BaseGame.call(this,c,o);this.cards=[];this.fl=[];this.mt=[];this.gs=4;this.cw=this.W/this.gs-4;this.ch=this.H/this.gs-4;this.can=true;this.mv=0;
  var sym='ABCDEFGH';var dk=[];for(var i=0;i<sym.length;i++){dk.push(sym[i]);dk.push(sym[i]);}
  for(var i=dk.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=dk[i];dk[i]=dk[j];dk[j]=t;}
  for(var i=0;i<dk.length;i++)this.cards.push({id:dk[i],fl:false,mt:false});
  var s=this;this.canvas.onclick=function(e){
    if(!s.can||!s.alive)return;var r=s.canvas.getBoundingClientRect();var sx=s.W/r.width;var sy=s.H/r.height;
    var c=Math.floor(((e.clientX-r.left)*sx)/(s.W/s.gs));var rr=Math.floor(((e.clientY-r.top)*sy)/(s.H/s.gs));
    if(c<0||c>=s.gs||rr<0||rr>=s.gs)return;var idx=rr*s.gs+c;if(idx>=s.cards.length||s.cards[idx].fl||s.cards[idx].mt)return;
    s.fl.push(idx);s.cards[idx].fl=true;s.mv++;
    if(s.fl.length===2){s.can=false;var a=s.cards[s.fl[0]],b=s.cards[s.fl[1]];
      if(a.id===b.id){a.mt=true;b.mt=true;s.mt=s.cards.filter(function(x){return x.mt});s.pts(10);s.fl=[];s.can=true;if(s.mt.length===s.cards.length){s.end();}}
      else{var s2=s;setTimeout(function(){a.fl=false;b.fl=false;s2.fl=[];s2.can=true;},700);}
    }
  };
}
MemGame.prototype=Object.create(BaseGame.prototype);
MemGame.prototype.update=function(){
  this.cls();
  for(var i=0;i<this.cards.length;i++){var c=i%this.gs,r=Math.floor(i/this.gs);var x=c*(this.cw+4)+2,y=r*(this.ch+4)+2;
    if(this.cards[i].fl||this.cards[i].mt){this.ctx.fillStyle=this.cards[i].mt?'#10b981':'#3b82f6';this.ctx.fillRect(x,y,this.cw,this.ch);this.ctx.fillStyle='#fff';this.ctx.font='20px sans-serif';this.ctx.textAlign='center';this.ctx.textBaseline='middle';this.ctx.fillText(this.cards[i].id,x+this.cw/2,y+this.ch/2);}
    else{this.ctx.fillStyle='#27272a';this.ctx.fillRect(x,y,this.cw,this.ch);}
  }
  this.txt('Memoria | Mov:'+this.mv+' Pares:'+this.mt.length+'/'+Math.floor(this.cards.length/2),this.W/2,this.H-8);
};

// ===== 9. TETRIS =====
function TetroGame(c,o){BaseGame.call(this,c,o);this.brd=[];for(var y=0;y<20;y++){this.brd[y]=[];for(var x=0;x<10;x++)this.brd[y][x]=0;}
  this.pzs=[[[1,1,1,1]],[[1,1],[1,1]],[[1,1,1],[0,1,0]],[[1,1,1],[1,0,0]],[[1,1,1],[0,0,1]],[[1,1,0],[0,1,1]],[[0,1,1],[1,1,0]]];
  this.cols=['#0ff','#ff0','#a0f','#f90','#00f','#0f0','#f00'];this.cur=null;this.nxt=null;this.tmr=0;this.del=400;this.R=20;this.C=10;this.cs=this.W/this.C;this.gen();}
TetroGame.prototype=Object.create(BaseGame.prototype);
TetroGame.prototype.gen=function(){if(this.nxt===null)this.nxt=Math.floor(Math.random()*this.pzs.length);this.cur={t:this.nxt,p:this.pzs[this.nxt],c:this.cols[this.nxt],x:3,y:0};this.nxt=Math.floor(Math.random()*this.pzs.length);if(this.col(0,0,this.cur.p)){this.end();}};
TetroGame.prototype.col=function(dx,dy,p){for(var y=0;y<p.length;y++)for(var x=0;x<p[y].length;x++)if(p[y][x]){var nx=this.cur.x+x+dx,ny=this.cur.y+y+dy;if(nx<0||nx>=this.C||ny>=this.R)return true;if(ny>=0&&this.brd[ny][nx])return true;}return false;};
TetroGame.prototype.lock=function(){var p=this.cur.p;for(var y=0;y<p.length;y++)for(var x=0;x<p[y].length;x++)if(p[y][x]){var ny=this.cur.y+y;if(ny>=0)this.brd[ny][this.cur.x+x]=this.cur.c;}
  var cl=0;for(var y=this.R-1;y>=0;y--){if(this.brd[y].every(function(c){return c!==0})){this.brd.splice(y,1);this.brd.unshift([]);for(var x=0;x<this.C;x++)this.brd[0][x]=0;cl++;y++;}}
  if(cl>0)this.pts(cl*50);this.gen();
};
TetroGame.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowLeft']&&!this.col(-1,0,this.cur.p))this.cur.x--;if(this.keys['ArrowRight']&&!this.col(1,0,this.cur.p))this.cur.x++;
  if(this.keys['ArrowDown']&&!this.col(0,1,this.cur.p))this.cur.y++;
  if(this.keys['ArrowUp']){var p=[];for(var x=0;x<this.cur.p[0].length;x++){p[x]=[];for(var y=this.cur.p.length-1;y>=0;y--)p[x][this.cur.p.length-1-y]=this.cur.p[y][x];}if(!this.col(0,0,p))this.cur.p=p;}
  this.tmr+=16;if(this.tmr>=this.del){this.tmr=0;if(!this.col(0,1,this.cur.p))this.cur.y++;else this.lock();}
  this.cls();
  for(var y=0;y<this.R;y++)for(var x=0;x<this.C;x++){if(this.brd[y][x]){this.ctx.fillStyle=this.brd[y][x];this.ctx.fillRect(x*this.cs,y*this.cs,this.cs-1,this.cs-1);}}
  if(this.cur){var p=this.cur.p;for(var y=0;y<p.length;y++)for(var x=0;x<p[y].length;x++)if(p[y][x]){this.ctx.fillStyle=this.cur.c;this.ctx.fillRect((this.cur.x+x)*this.cs,(this.cur.y+y)*this.cs,this.cs-1,this.cs-1);}}
  this.txt('Tetris | '+this.score);
};

// ===== 10. ASTEROIDS =====
function AstroGame(c,o){BaseGame.call(this,c,o);this.ship={x:this.W/2,y:this.H/2,vx:0,vy:0,ang:0,r:12};this.bul=[];this.rocks=[];this.fd=0;
  for(var i=0;i<6;i++){var a=Math.random()*Math.PI*2;var d=100+Math.random()*60;this.rocks.push({x:this.W/2+Math.cos(a)*d,y:this.H/2+Math.sin(a)*d,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5,r:12+Math.random()*15});}}
AstroGame.prototype=Object.create(BaseGame.prototype);
AstroGame.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowLeft'])this.ship.ang-=0.06;if(this.keys['ArrowRight'])this.ship.ang+=0.06;
  if(this.keys['ArrowUp']){this.ship.vx+=Math.cos(this.ship.ang)*0.15;this.ship.vy+=Math.sin(this.ship.ang)*0.15;}
  if(this.keys[' ']){if(this.fd<=0){this.bul.push({x:this.ship.x,y:this.ship.y,vx:Math.cos(this.ship.ang)*6,vy:Math.sin(this.ship.ang)*6,r:3,l:50});this.fd=12;}this.fd--;}else this.fd=0;
  this.ship.x+=this.ship.vx;this.ship.y+=this.ship.vy;
  if(this.ship.x<0)this.ship.x=this.W;if(this.ship.x>this.W)this.ship.x=0;if(this.ship.y<0)this.ship.y=this.H;if(this.ship.y>this.H)this.ship.y=0;
  for(var i=this.bul.length-1;i>=0;i--){this.bul[i].x+=this.bul[i].vx;this.bul[i].y+=this.bul[i].vy;this.bul[i].l--;if(this.bul[i].l<=0){this.bul.splice(i,1);continue}
    for(var j=0;j<this.rocks.length;j++){var dx=this.bul[i].x-this.rocks[j].x,dy=this.bul[i].y-this.rocks[j].y;if(Math.sqrt(dx*dx+dy*dy)<this.rocks[j].r){this.rocks.splice(j,1);this.bul.splice(i,1);this.pts(20);break;}}}
  for(var i=0;i<this.rocks.length;i++){this.rocks[i].x+=this.rocks[i].vx;this.rocks[i].y+=this.rocks[i].vy;
    if(this.rocks[i].x<0)this.rocks[i].x=this.W;if(this.rocks[i].x>this.W)this.rocks[i].x=0;if(this.rocks[i].y<0)this.rocks[i].y=this.H;if(this.rocks[i].y>this.H)this.rocks[i].y=0;
    var dx=this.ship.x-this.rocks[i].x,dy=this.ship.y-this.rocks[i].y;if(Math.sqrt(dx*dx+dy*dy)<this.ship.r+this.rocks[i].r){this.end();return;}}
  if(this.rocks.length===0){this.pts(100);this.end();return;}
  this.cls();
  this.ctx.save();this.ctx.translate(this.ship.x,this.ship.y);this.ctx.rotate(this.ship.ang);
  this.ctx.fillStyle='#10b981';this.ctx.beginPath();this.ctx.moveTo(this.ship.r,0);this.ctx.lineTo(-this.ship.r,-this.ship.r/2);this.ctx.lineTo(-this.ship.r/2,0);this.ctx.lineTo(-this.ship.r,this.ship.r/2);this.ctx.closePath();this.ctx.fill();
  this.ctx.restore();
  this.ctx.fillStyle='#f59e0b';for(var i=0;i<this.bul.length;i++){this.ctx.beginPath();this.ctx.arc(this.bul[i].x,this.bul[i].y,this.bul[i].r,0,Math.PI*2);this.ctx.fill();}
  this.ctx.strokeStyle='#ef4444';this.ctx.lineWidth=2;for(var i=0;i<this.rocks.length;i++){this.ctx.beginPath();this.ctx.arc(this.rocks[i].x,this.rocks[i].y,this.rocks[i].r,0,Math.PI*2);this.ctx.stroke();}
  this.txt('Asteroids | '+this.score);
};

// ===== 11. PAC-MAN (simplificado) =====
function PacGame(c,o){BaseGame.call(this,c,o);this.maze=[];this.pac={x:9,y:13,dir:0,nextDir:0};
  this.dots=[];this.ghosts=[];this.power=0;this.dotCount=0;this.totalDots=0;
  var map=['####################','#..................#','#.####.##.##.####.#','#o####.##.##.####o','#.####.##.##.####.#','#..................#','#.##.##.####.##.##.#','#.##.##.####.##.##.#','#..................#','#.####.##.##.####.#','#o####.##.##.####o','#.####.##.##.####.#','#..................#','####################'];
  for(var y=0;y<map.length;y++){this.maze[y]=[];for(var x=0;x<map[y].length;x++){var ch=map[y][x];this.maze[y][x]=(ch==='#');if(ch==='.'||ch==='o'){this.dots.push({x:x,y:y,big:ch==='o',eaten:false});this.totalDots++;}}}
  this.ghosts.push({x:9,y:10,c:'#ef4444',vx:0,vy:0,scared:false});
  this.ghosts.push({x:9,y:11,c:'#f59e0b',vx:0,vy:0,scared:false});
  var s=this;this.ghosts.forEach(function(g){g.vx=(Math.random()>0.5?1:-1);});
}
PacGame.prototype=Object.create(BaseGame.prototype);
PacGame.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowUp'])this.pac.nextDir={x:0,y:-1};if(this.keys['ArrowDown'])this.pac.nextDir={x:0,y:1};
  if(this.keys['ArrowLeft'])this.pac.nextDir={x:-1,y:0};if(this.keys['ArrowRight'])this.pac.nextDir={x:1,y:0};
  var canMove=function(m,x,y){return x>=0&&x<20&&y>=0&&y<14&&!m[y][x];};
  if(canMove(this.maze,this.pac.x+this.pac.nextDir.x,this.pac.y+this.pac.nextDir.y))this.pac.dir=this.pac.nextDir;
  if(canMove(this.maze,this.pac.x+this.pac.dir.x,this.pac.y+this.pac.dir.y)){this.pac.x+=this.pac.dir.x;this.pac.y+=this.pac.dir.y;}
  for(var i=0;i<this.dots.length;i++){var d=this.dots[i];if(!d.eaten&&d.x===this.pac.x&&d.y===this.pac.y){d.eaten=true;this.dotCount++;this.pts(d.big?20:5);if(d.big)this.power=200;}}
  if(this.dotCount>=this.totalDots){this.pts(200);this.end();return;}
  if(this.power>0)this.power--;
  for(var i=0;i<this.ghosts.length;i++){var g=this.ghosts[i];
    if(Math.random()<0.05||!canMove(this.maze,g.x+g.vx,g.y+g.vy)){
      var dirs=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];var ok=[];for(var j=0;j<4;j++){var nd=dirs[j];if(canMove(this.maze,g.x+nd.x,g.y+nd.y))ok.push(nd);}
      if(ok.length>0){var mv=ok[Math.floor(Math.random()*ok.length)];g.vx=mv.x;g.vy=mv.y;}
    }
    if(canMove(this.maze,g.x+g.vx,g.y+g.vy)){g.x+=g.vx;g.y+=g.vy;}
    if(g.x===this.pac.x&&g.y===this.pac.y){if(this.power>0){this.pts(50);g.x=9;g.y=10;}else{this.end();return;}}
  }
  this.paint();
};
PacGame.prototype.paint=function(){
  this.cls();var cs=this.W/20;
  for(var y=0;y<14;y++)for(var x=0;x<20;x++){if(this.maze[y][x]){this.ctx.fillStyle='#1a1a3e';this.ctx.fillRect(x*cs,y*cs,cs,cs);}else{this.ctx.fillStyle='#000';this.ctx.fillRect(x*cs,y*cs,cs,cs);}}
  this.ctx.fillStyle='#ffa500';this.ctx.beginPath();this.ctx.arc(this.pac.x*cs+cs/2,this.pac.y*cs+cs/2,cs/3,0,Math.PI*2);this.ctx.fill();
  for(var i=0;i<this.dots.length;i++){var d=this.dots[i];if(!d.eaten){this.ctx.fillStyle=d.big?'#ffa500':'#fff';this.ctx.beginPath();this.ctx.arc(d.x*cs+cs/2,d.y*cs+cs/2,d.big?5:2,0,Math.PI*2);this.ctx.fill();}}
  for(var i=0;i<this.ghosts.length;i++){var g=this.ghosts[i];this.ctx.fillStyle=this.power>0?'#66f':g.c;this.ctx.fillRect(g.x*cs+2,g.y*cs+2,cs-4,cs-4);}
  this.txt('Pac-Man | '+this.score);
};

// ===== 12. MINESWEEPER (Buscaminas) =====
function MineGame(c,o){BaseGame.call(this,c,o);this.rows=10;this.cols=10;this.cell=this.W/this.cols;this.brd=[];this.rev=[];this.flg=[];this.mines=15;this.gameOver=false;this.first=true;
  for(var y=0;y<this.rows;y++){this.brd[y]=[];this.rev[y]=[];this.flg[y]=[];for(var x=0;x<this.cols;x++){this.brd[y][x]=0;this.rev[y][x]=false;this.flg[y][x]=false;}}
  var s=this;this.canvas.onclick=function(e){if(s.gameOver||!s.alive)return;s.click(e,false);};
  this.canvas.oncontextmenu=function(e){e.preventDefault();if(s.gameOver||!s.alive)return;s.click(e,true);return false;};
}
MineGame.prototype=Object.create(BaseGame.prototype);
MineGame.prototype.place=function(sx,sy){
  var placed=0;while(placed<this.mines){var x=Math.floor(Math.random()*this.cols);var y=Math.floor(Math.random()*this.rows);if(this.brd[y][x]!==-1&&!(Math.abs(x-sx)<=1&&Math.abs(y-sy)<=1)){this.brd[y][x]=-1;placed++;}}
  for(var y=0;y<this.rows;y++)for(var x=0;x<this.cols;x++){if(this.brd[y][x]===-1)continue;var c=0;for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){var ny=y+dy,nx=x+dx;if(ny>=0&&ny<this.rows&&nx>=0&&nx<this.cols&&this.brd[ny][nx]===-1)c++;}this.brd[y][x]=c;}
};
MineGame.prototype.click=function(e,flag){
  var r=this.canvas.getBoundingClientRect();var sx=this.W/r.width;var sy=this.H/r.height;
  var x=Math.floor(((e.clientX-r.left)*sx)/this.cell);var y=Math.floor(((e.clientY-r.top)*sy)/this.cell);
  if(x<0||x>=this.cols||y<0||y>=this.rows||this.rev[y][x])return;
  if(flag){this.flg[y][x]=!this.flg[y][x];this.pts(flag?0:0);return;}
  if(this.first){this.first=false;this.place(x,y);}
  if(this.brd[y][x]===-1){this.rev[y][x]=true;this.gameOver=true;this.end();return;}
  this.reveal(x,y);
  var won=true;for(var yy=0;yy<this.rows;yy++)for(var xx=0;xx<this.cols;xx++)if(this.brd[yy][xx]!==-1&&!this.rev[yy][xx])won=false;
  if(won){this.pts(100);this.gameOver=true;this.end();}
};
MineGame.prototype.reveal=function(x,y){if(this.rev[y][x])return;this.rev[y][x]=true;this.pts(1);if(this.brd[y][x]===0){for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){var ny=y+dy,nx=x+dx;if(ny>=0&&ny<this.rows&&nx>=0&&nx<this.cols&&!this.rev[ny][nx]&&this.brd[ny][nx]!==-1)this.reveal(nx,ny);}}};
MineGame.prototype.update=function(){
  this.cls();
  for(var y=0;y<this.rows;y++)for(var x=0;x<this.cols;x++){
    this.ctx.strokeStyle='#333';this.ctx.strokeRect(x*this.cell,y*this.cell,this.cell,this.cell);
    if(this.rev[y][x]){if(this.brd[y][x]===-1){this.ctx.fillStyle='#ef4444';this.ctx.fillRect(x*this.cell+1,y*this.cell+1,this.cell-2,this.cell-2);this.ctx.fillStyle='#fff';this.ctx.font='14px sans-serif';this.ctx.textAlign='center';this.ctx.textBaseline='middle';this.ctx.fillText('X',x*this.cell+this.cell/2,y*this.cell+this.cell/2);}else if(this.brd[y][x]>0){this.ctx.fillStyle='#10b981';this.ctx.fillRect(x*this.cell+1,y*this.cell+1,this.cell-2,this.cell-2);this.ctx.fillStyle='#fff';this.ctx.font='12px sans-serif';this.ctx.textAlign='center';this.ctx.textBaseline='middle';this.ctx.fillText(this.brd[y][x],x*this.cell+this.cell/2,y*this.cell+this.cell/2);}else{this.ctx.fillStyle='#1a1a2e';this.ctx.fillRect(x*this.cell+1,y*this.cell+1,this.cell-2,this.cell-2);}}
    if(this.flg[y][x]){this.ctx.fillStyle='#f59e0b';this.ctx.font='16px sans-serif';this.ctx.textAlign='center';this.ctx.textBaseline='middle';this.ctx.fillText('F',x*this.cell+this.cell/2,y*this.cell+this.cell/2);}
  }
  this.txt('Buscaminas | '+this.score);
};

// ===== 13. SIMON (Secuencia de colores) =====
function SimonGame(c,o){BaseGame.call(this,c,o);this.seq=[];this.player=[];this.idx=0;this.colors=['#ef4444','#10b981','#3b82f6','#f59e0b'];this.turn='wait';this.step=0;this.highlight=-1;this.hlTimer=0;this.canClick=true;this.gen();}
SimonGame.prototype=Object.create(BaseGame.prototype);
SimonGame.prototype.gen=function(){this.seq.push(Math.floor(Math.random()*4));this.idx=0;this.turn='show';this.step=0;this.canClick=false;this.showNext();};
SimonGame.prototype.showNext=function(){
  if(this.step>=this.seq.length){this.turn='player';this.idx=0;this.canClick=true;return;}
  this.highlight=this.seq[this.step];this.hlTimer=30;this.step++;
};
SimonGame.prototype.update=function(){
  if(this.hlTimer>0){this.hlTimer--;if(this.hlTimer===0){this.highlight=-1;var s=this;setTimeout(function(){s.showNext();},200);}}
  var q=this.W/2;var h=this.H/2;var r=Math.min(q,h)-10;
  this.cls();
  for(var i=0;i<4;i++){var a=i*Math.PI/2;this.ctx.fillStyle=i===this.highlight?'#fff':this.colors[i];
    this.ctx.beginPath();this.ctx.moveTo(q,h);this.ctx.arc(q,h,r,a,a+Math.PI/2);this.ctx.closePath();this.ctx.fill();
    this.ctx.fillStyle='#000';this.ctx.font='14px sans-serif';this.ctx.textAlign='center';this.ctx.textBaseline='middle';
    var tx=q+Math.cos(a+Math.PI/4)*r*0.6,ty=h+Math.sin(a+Math.PI/4)*r*0.6;this.ctx.fillText(['R','V','A','A'][i],tx,ty);
  }
  var s=this;if(this.turn==='player'&&this.canClick&&this.keys[' ']){this.keys[' ']=false;this.click(0);}
  if(this.turn==='player'&&this.canClick&&this.keys['ArrowUp']){this.keys['ArrowUp']=false;this.click(0);}
  if(this.turn==='player'&&this.canClick&&this.keys['ArrowRight']){this.keys['ArrowRight']=false;this.click(1);}
  if(this.turn==='player'&&this.canClick&&this.keys['ArrowDown']){this.keys['ArrowDown']=false;this.click(2);}
  if(this.turn==='player'&&this.canClick&&this.keys['ArrowLeft']){this.keys['ArrowLeft']=false;this.click(3);}
  this.canvas.onclick=function(e){if(s.turn!=='player'||!s.canClick)return;var r=s.canvas.getBoundingClientRect();var sx=s.W/r.width,sy=s.H/r.height;var mx=(e.clientX-r.left)*sx,my=(e.clientY-r.top)*sy;var dx=mx-q,dy=my-h;var ang=Math.atan2(dy,dx);if(ang<0)ang+=Math.PI*2;var ci=Math.floor(ang/(Math.PI/2))%4;s.click(ci);};
  this.txt('Simon | Nivel:'+this.seq.length);
};
SimonGame.prototype.click=function(ci){
  if(!this.canClick||this.turn!=='player')return;
  if(ci===this.seq[this.idx]){this.idx++;this.pts(5);if(this.idx>=this.seq.length){this.canClick=false;var s=this;setTimeout(function(){s.gen();},500);}}
  else{this.end();}
};

// ===== 14. WHACK-A-MOLE (Tope los topos) =====
function MoleGame(c,o){BaseGame.call(this,c,o);this.grid=4;this.cell=this.W/this.grid;this.moles=[];this.timer=600;this.spawnTimer=0;var s=this;this.canvas.onclick=function(e){s.clickMole(e);};}
MoleGame.prototype=Object.create(BaseGame.prototype);
MoleGame.prototype.clickMole=function(e){
  var r=this.canvas.getBoundingClientRect();var sx=this.W/r.width;var sy=this.H/r.height;
  var x=Math.floor(((e.clientX-r.left)*sx)/this.cell);var y=Math.floor(((e.clientY-r.top)*sy)/this.cell);
  if(x<0||x>=4||y<0||y>=4)return;
  for(var i=0;i<this.moles.length;i++){var m=this.moles[i];if(m.x===x&&m.y===y){this.moles.splice(i,1);this.pts(10);return;}}
};
MoleGame.prototype.update=function(){
  if(!this.alive)return;
  this.timer--;this.spawnTimer++;
  if(this.spawnTimer>30){this.spawnTimer=0;
    if(Math.random()<0.4){var x=Math.floor(Math.random()*4);var y=Math.floor(Math.random()*4);var exists=false;for(var i=0;i<this.moles.length;i++){if(this.moles[i].x===x&&this.moles[i].y===y){exists=true;break;}}if(!exists){this.moles.push({x:x,y:y,t:100});}}}
  for(var i=this.moles.length-1;i>=0;i--){this.moles[i].t--;if(this.moles[i].t<=0)this.moles.splice(i,1);}
  if(this.timer<=0){this.end();return;}
  this.cls();
  for(var y=0;y<4;y++)for(var x=0;x<4;x++){this.ctx.strokeStyle='#333';this.ctx.strokeRect(x*this.cell,y*this.cell,this.cell,this.cell);}
  this.ctx.fillStyle='#8B4513';for(var y=0;y<4;y++)for(var x=0;x<4;x++){this.ctx.beginPath();this.ctx.arc(x*this.cell+this.cell/2,y*this.cell+this.cell/2,this.cell/3,0,Math.PI*2);this.ctx.fill();}
  for(var i=0;i<this.moles.length;i++){var m=this.moles[i];this.ctx.fillStyle='#10b981';this.ctx.beginPath();this.ctx.arc(m.x*this.cell+this.cell/2,m.y*this.cell+this.cell/2,this.cell/3-2,0,Math.PI*2);this.ctx.fill();this.ctx.fillStyle='#000';this.ctx.beginPath();this.ctx.arc(m.x*this.cell+this.cell/2-3,m.y*this.cell+this.cell/2-2,2,0,Math.PI*2);this.ctx.fill();}
  this.txt('Topos | Tiempo:'+Math.floor(this.timer/10)+'s Pts:'+this.score,this.W/2,this.H-8);
};


// ===== 15. 2048 =====
function TwoZeroGame(c,o){BaseGame.call(this,c,o);this.g=[];this.sz=4;this.cell=this.W/this.sz;for(var y=0;y<this.sz;y++){this.g[y]=[];for(var x=0;x<this.sz;x++)this.g[y][x]=0;}this.add();this.add();this.moved=false;}
TwoZeroGame.prototype=Object.create(BaseGame.prototype);
TwoZeroGame.prototype.add=function(){var e=[];for(var y=0;y<this.sz;y++)for(var x=0;x<this.sz;x++)if(this.g[y][x]===0)e.push({x:x,y:y});if(e.length>0){var c=e[Math.floor(Math.random()*e.length)];this.g[c.y][c.x]=Math.random()<0.9?2:4;}};
TwoZeroGame.prototype.slide=function(arr){var f=arr.filter(function(v){return v!==0});if(f.length===0)return arr;var r=[];for(var i=0;i<f.length;i++){if(i+1<f.length&&f[i]===f[i+1]){r.push(f[i]*2);this.pts(f[i]);i++;}else r.push(f[i]);}while(r.length<arr.length)r.push(0);return r;};
TwoZeroGame.prototype.move=function(dx,dy){
  var moved=false;var s=this;
  if(dy===1||dy===-1){for(var x=0;x<this.sz;x++){var col=[];for(var y=0;y<this.sz;y++)col.push(this.g[y][x]);if(dy===-1)col.reverse();var ncol=s.slide(col);if(dy===-1)ncol.reverse();for(var y=0;y<this.sz;y++){if(this.g[y][x]!==ncol[y])moved=true;this.g[y][x]=ncol[y];}}}
  else if(dx===1||dx===-1){for(var y=0;y<this.sz;y++){var row=[].concat(this.g[y]);if(dx===-1)row.reverse();var nrow=s.slide(row);if(dx===-1)nrow.reverse();for(var x=0;x<this.sz;x++){if(this.g[y][x]!==nrow[x])moved=true;this.g[y][x]=nrow[x];}}}
  if(moved)this.add();
};
TwoZeroGame.prototype.check=function(){for(var y=0;y<this.sz;y++)for(var x=0;x<this.sz;x++)if(this.g[y][x]===0)return false;return true;};
TwoZeroGame.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowUp']){this.keys['ArrowUp']=false;this.move(0,-1);if(this.check()){this.end();return;}}
  if(this.keys['ArrowDown']){this.keys['ArrowDown']=false;this.move(0,1);if(this.check()){this.end();return;}}
  if(this.keys['ArrowLeft']){this.keys['ArrowLeft']=false;this.move(-1,0);if(this.check()){this.end();return;}}
  if(this.keys['ArrowRight']){this.keys['ArrowRight']=false;this.move(1,0);if(this.check()){this.end();return;}}
  var cs=this.cell;this.cls();
  for(var y=0;y<this.sz;y++)for(var x=0;x<this.sz;x++){
    var v=this.g[y][x];var col=v===0?'#1a1a2e':v===2?'#eee4da':v===4?'#ede0c8':v===8?'#f2b179':v===16?'#f59563':v===32?'#f67c5f':v===64?'#f65e3b':v>=128?'#edcf72':'#3b82f6';
    this.ctx.fillStyle=col;this.ctx.fillRect(x*cs+1,y*cs+1,cs-2,cs-2);
    if(v>0){this.ctx.fillStyle=v<=4?'#776e65':'#fff';this.ctx.font='bold '+(v>=1000?16:22)+'px sans-serif';this.ctx.textAlign='center';this.ctx.textBaseline='middle';this.ctx.fillText(v,x*cs+cs/2,y*cs+cs/2);}
  }
  this.txt('2048 | Puntos: '+this.score);
};

// ===== 16. SNAKE 2 (con paredes/obstaculos) =====
function Snake2Game(c,o){BaseGame.call(this,c,o);this.cell=12;this.vx=1;this.vy=0;this.body=[{x:8,y:8},{x:7,y:8},{x:6,y:8}];this.food={x:15,y:8};this.walls=[];this.t=0;this.d=100;
  for(var x=0;x<Math.floor(this.W/this.cell);x++){this.walls.push({x:x,y:0});this.walls.push({x:x,y:Math.floor(this.H/this.cell)-1});}
  for(var y=0;y<Math.floor(this.H/this.cell);y++){this.walls.push({x:0,y:y});this.walls.push({x:Math.floor(this.W/this.cell)-1,y:y});}
  for(var i=0;i<8;i++){var wx=4+Math.floor(Math.random()*((this.W/this.cell)-8));var wy=4+Math.floor(Math.random()*((this.H/this.cell)-8));this.walls.push({x:wx,y:wy});}}
Snake2Game.prototype=Object.create(BaseGame.prototype);
Snake2Game.prototype.start=function(){this.dropFood();};
Snake2Game.prototype.dropFood=function(){this.food={x:2+Math.floor(Math.random()*((this.W/this.cell)-4)),y:2+Math.floor(Math.random()*((this.H/this.cell)-4))};for(var i=0;i<this.walls.length;i++){if(this.walls[i].x===this.food.x&&this.walls[i].y===this.food.y){this.dropFood();return;}}for(var i=0;i<this.body.length;i++){if(this.body[i].x===this.food.x&&this.body[i].y===this.food.y){this.dropFood();return;}}};
Snake2Game.prototype.isWall=function(x,y){for(var i=0;i<this.walls.length;i++)if(this.walls[i].x===x&&this.walls[i].y===y)return true;return false;};
Snake2Game.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowUp']&&this.vy===0){this.vx=0;this.vy=-1}if(this.keys['ArrowDown']&&this.vy===0){this.vx=0;this.vy=1}
  if(this.keys['ArrowLeft']&&this.vx===0){this.vx=-1;this.vy=0}if(this.keys['ArrowRight']&&this.vx===0){this.vx=1;this.vy=0}
  this.t+=16;if(this.t<this.d){this.paint();return}this.t=0;
  var h={x:this.body[0].x+this.vx,y:this.body[0].y+this.vy};
  if(this.isWall(h.x,h.y)){this.end();return}
  for(var i=0;i<this.body.length;i++){if(h.x===this.body[i].x&&h.y===this.body[i].y){this.end();return}}
  this.body.unshift(h);
  if(h.x===this.food.x&&h.y===this.food.y){this.pts(10);this.dropFood();this.d=Math.max(40,this.d-2);}else this.body.pop();
  this.paint();
};
Snake2Game.prototype.paint=function(){
  this.cls();
  this.ctx.fillStyle='#333';for(var i=0;i<this.walls.length;i++)this.ctx.fillRect(this.walls[i].x*this.cell,this.walls[i].y*this.cell,this.cell-1,this.cell-1);
  this.ctx.fillStyle='#ef4444';this.ctx.fillRect(this.food.x*this.cell,this.food.y*this.cell,this.cell-1,this.cell-1);
  this.ctx.fillStyle='#10b981';for(var i=0;i<this.body.length;i++)this.ctx.fillRect(this.body[i].x*this.cell,this.body[i].y*this.cell,this.cell-1,this.cell-1);
  this.txt('Snake 2 | Pts: '+this.score);
};

// ===== 17. CONNECT 4 (Conecta 4) =====
function C4Game(c,o){BaseGame.call(this,c,o);this.brd=[];this.R=6;this.C=7;this.cell=this.W/this.C;this.turn=1;this.gameOver=false;
  for(var y=0;y<this.R;y++){this.brd[y]=[];for(var x=0;x<this.C;x++)this.brd[y][x]=0;}
  var s=this;this.canvas.onclick=function(e){if(s.gameOver||!s.alive)return;var r=s.canvas.getBoundingClientRect();var sx=s.W/r.width;var col=Math.floor(((e.clientX-r.left)*sx)/s.cell);if(col<0||col>=s.C)return;if(s.brd[0][col]!==0)return;
    for(var y=s.R-1;y>=0;y--){if(s.brd[y][col]===0){s.brd[y][col]=s.turn;var w=s.check(y,col,s.turn);if(w){s.gameOver=true;var pts=s.turn===1?100:10;s.pts(pts);s.end();return}
    if(s.brd.every(function(r){return r.every(function(c){return c!==0})})){s.gameOver=true;s.pts(50);s.end();return}
    s.turn=s.turn===1?2:1;if(s.turn===2)setTimeout(function(){s.aiMove();},300);break;}}};}
C4Game.prototype=Object.create(BaseGame.prototype);
C4Game.prototype.check=function(y,x,p){var dirs=[[1,0],[0,1],[1,1],[1,-1]];for(var d=0;d<4;d++){var dx=dirs[d][0],dy=dirs[d][1];var c=1;for(var i=1;i<4;i++){var ny=y+dy*i,nx=x+dx*i;if(ny>=0&&ny<this.R&&nx>=0&&nx<this.C&&this.brd[ny][nx]===p)c++;else break;}for(var i=1;i<4;i++){var ny=y-dy*i,nx=x-dx*i;if(ny>=0&&ny<this.R&&nx>=0&&nx<this.C&&this.brd[ny][nx]===p)c++;else break;}if(c>=4)return true;}return false;};
C4Game.prototype.aiMove=function(){for(var x=0;x<this.C;x++){for(var y=this.R-1;y>=0;y--){if(this.brd[y][x]===0){this.brd[y][x]=2;if(this.check(y,x,2)){this.brd[y][x]=2;return;}this.brd[y][x]=0;break;}}}
  for(var x=0;x<this.C;x++){for(var y=this.R-1;y>=0;y--){if(this.brd[y][x]===0){this.brd[y][x]=1;if(this.check(y,x,1)){this.brd[y][x]=2;return;}this.brd[y][x]=0;break;}}}
  if(this.brd[0][3]===0){this.brd[0][3]=this.brd[5][3]===0?2:2;this.drop(3,2);return;}var cols=[];for(var x=0;x<this.C;x++)if(this.brd[0][x]===0)cols.push(x);if(cols.length>0)this.drop(cols[Math.floor(Math.random()*cols.length)],2);};
C4Game.prototype.drop=function(col,p){for(var y=this.R-1;y>=0;y--){if(this.brd[y][col]===0){this.brd[y][col]=p;var w=this.check(y,col,p);if(w){this.gameOver=true;this.pts(10);this.end();return}this.turn=1;return;}}};
C4Game.prototype.update=function(){
  this.cls();var cs=this.cell;
  for(var y=0;y<this.R;y++)for(var x=0;x<this.C;x++){
    this.ctx.fillStyle='#0066cc';this.ctx.fillRect(x*cs+1,y*cs+1,cs-2,cs-2);
    if(this.brd[y][x]===1){this.ctx.fillStyle='#ef4444';this.ctx.beginPath();this.ctx.arc(x*cs+cs/2,y*cs+cs/2,cs/2-3,0,Math.PI*2);this.ctx.fill();}
    else if(this.brd[y][x]===2){this.ctx.fillStyle='#f59e0b';this.ctx.beginPath();this.ctx.arc(x*cs+cs/2,y*cs+cs/2,cs/2-3,0,Math.PI*2);this.ctx.fill();}
  }
  this.txt('Conecta 4 | Turno: '+(this.turn===1?'Rojo (Tu)':'Amarillo (IA)'));
};

// ===== 18. CARRERA (Carrera de obstaculos) =====
function RaceGame(c,o){BaseGame.call(this,c,o);this.car={x:this.W/2-15,y:this.H-50,w:30,h:40};this.obs=[];this.f=0;this.sp=4;}
RaceGame.prototype=Object.create(BaseGame.prototype);
RaceGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if(this.keys['ArrowLeft']||this.keys['a'])this.car.x=Math.max(0,this.car.x-4);if(this.keys['ArrowRight']||this.keys['d'])this.car.x=Math.min(this.W-this.car.w,this.car.x+4);
  if(this.f%25===0){var lane=Math.floor(Math.random()*4);this.obs.push({x:lane*this.W/4+10,y:-40,w:this.W/4-20,h:30});}
  for(var i=this.obs.length-1;i>=0;i--){this.obs[i].y+=this.sp;if(this.obs[i].y>this.H){this.obs.splice(i,1);this.pts(2);continue;}
    if(this.car.x<this.obs[i].x+this.obs[i].w&&this.car.x+this.car.w>this.obs[i].x&&this.car.y<this.obs[i].y+this.obs[i].h&&this.car.y+this.car.h>this.obs[i].y){this.end();return;}}
  this.sp=4+Math.floor(this.f/300);
  this.cls();for(var i=0;i<4;i++){this.ctx.strokeStyle='#333';this.ctx.strokeRect(i*this.W/4,0,1,this.H);}
  this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.car.x,this.car.y,this.car.w,this.car.h);
  this.ctx.fillStyle='#ef4444';for(var i=0;i<this.obs.length;i++)this.ctx.fillRect(this.obs[i].x,this.obs[i].y,this.obs[i].w,this.obs[i].h);
  this.txt('Carrera | '+this.score);
};

// ===== 19. HELICOPTER =====
function HeliGame(c,o){BaseGame.call(this,c,o);this.h={x:80,y:this.H/2,vy:0,r:10};this.obs=[];this.f=0;this.g=0.3;}
HeliGame.prototype=Object.create(BaseGame.prototype);
HeliGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if(this.keys[' ']||this.keys['ArrowUp']||this.keys['w'])this.h.vy=-4;
  this.h.vy+=this.g;this.h.y+=this.h.vy;
  if(this.h.y<5||this.h.y>this.H-5){this.end();return;}
  if(this.f%45===0){var gap=60+Math.random()*40;var ty=20+Math.random()*(this.H-gap-40);this.obs.push({x:this.W,t:ty,b:ty+gap,w:30,sc:false});}
  for(var i=this.obs.length-1;i>=0;i--){var o=this.obs[i];o.x-=3;if(o.x+o.w<0){this.obs.splice(i,1);continue;}
    if(!o.sc&&o.x+o.w<this.h.x){o.sc=true;this.pts(2);}
    if(this.h.x+this.h.r>o.x&&this.h.x-this.h.r<o.x+o.w&&(this.h.y-this.h.r<o.t||this.h.y+this.h.r>o.b)){this.end();return;}}
  this.cls();this.ctx.fillStyle='#f59e0b';this.ctx.beginPath();this.ctx.arc(this.h.x,this.h.y,this.h.r,0,Math.PI*2);this.ctx.fill();
  this.ctx.fillStyle='#ef4444';for(var i=0;i<this.obs.length;i++){this.ctx.fillRect(this.obs[i].x,0,this.obs[i].w,this.obs[i].t);this.ctx.fillRect(this.obs[i].x,this.obs[i].b,this.obs[i].w,this.H-this.obs[i].b);}
  this.txt('Helicoptero | '+this.score);
};

// ===== 20. PLATFORM JUMPER =====
function PlatGame(c,o){BaseGame.call(this,c,o);this.p={x:this.W/2-12,y:this.H-60,w:24,h:24,vy:0,on:false};this.plats=[];this.f=0;this.scroll=0;this.g=0.5;
  for(var i=0;i<6;i++){this.plats.push({x:Math.random()*(this.W-60),y:this.H-40-i*60,w:60});}}
PlatGame.prototype=Object.create(BaseGame.prototype);
PlatGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if((this.keys['ArrowLeft']||this.keys['a'])&&this.p.x>0)this.p.x-=3;
  if((this.keys['ArrowRight']||this.keys['d'])&&this.p.x<this.W-this.p.w)this.p.x+=3;
  this.p.vy+=this.g;this.p.y+=this.p.vy;this.p.on=false;
  for(var i=0;i<this.plats.length;i++){var pl=this.plats[i];
    if(this.p.vy>=0&&this.p.y+this.p.h>=pl.y&&this.p.y+this.p.h<=pl.y+10&&this.p.x+this.p.w>pl.x&&this.p.x<pl.x+pl.w){
      this.p.y=pl.y-this.p.h;this.p.vy=this.keys[' ']||this.keys['ArrowUp']||this.keys['w']?-8:0;this.p.on=true;}}
  if(this.p.y>this.H){this.end();return;}
  var top=this.plats[0].y;if(top>0){var diff=top;for(var i=0;i<this.plats.length;i++)this.plats[i].y-=diff;this.p.y+=diff;}
  if(this.plats[this.plats.length-1].y>20){this.plats.push({x:Math.random()*(this.W-60),y:10,w:60});this.pts(2);}
  if(this.plats.length>8&&this.plats[0].y>this.H)this.plats.shift();
  this.cls();this.ctx.fillStyle='#10b981';for(var i=0;i<this.plats.length;i++)this.ctx.fillRect(this.plats[i].x,this.plats[i].y,this.plats[i].w,8);
  this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.p.x,this.p.y,this.p.w,this.p.h);
  this.txt('Saltarin | '+this.score);
};

// ===== 21. COLOR MATCH =====
function ColorMatchGame(c,o){BaseGame.call(this,c,o);this.colors=['#ef4444','#10b981','#3b82f6','#f59e0b','#a855f7'];this.target='';this.options=[];this.score=0;this.timer=0;this.gen();var s=this;this.canvas.onclick=function(e){s.click(e);};}
ColorMatchGame.prototype=Object.create(BaseGame.prototype);
ColorMatchGame.prototype.gen=function(){this.target=this.colors[Math.floor(Math.random()*this.colors.length)];
  var names={};names['#ef4444']='ROJO';names['#10b981']='VERDE';names['#3b82f6']='AZUL';names['#f59e0b']='AMARILLO';names['#a855f7']='MORADO';
  var nameIdx=Math.floor(Math.random()*5);var colorNames=['ROJO','VERDE','AZUL','AMARILLO','MORADO'];
  var wrongColors=this.colors.filter(function(c){return c!==this.target});var actualName=names[this.target];
  this.options=[];this.options.push({color:this.target,text:colorNames[nameIdx],correct:colorNames[nameIdx]===actualName});
  for(var i=0;i<3;i++){var wc=wrongColors[Math.floor(Math.random()*wrongColors.length)];var wn=colorNames[Math.floor(Math.random()*5)];this.options.push({color:wc,text:wn,correct:false});}
  for(var i=this.options.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=this.options[i];this.options[i]=this.options[j];this.options[j]=t;}
  this.timer=120;};
ColorMatchGame.prototype.click=function(e){
  if(this.timer<=0)return;var r=this.canvas.getBoundingClientRect();var sx=this.W/r.width,sy=this.H/r.height;
  var x=Math.floor(((e.clientX-r.left)*sx)/2);var y=Math.floor(((e.clientY-r.top)*sy)/2);
  var idx=y*2+x;if(idx>=0&&idx<this.options.length){if(this.options[idx].correct){this.pts(10);this.gen();}else{this.end();}}};
ColorMatchGame.prototype.update=function(){
  if(!this.alive)return;this.cls();this.timer--;
  if(this.timer<=0){this.end();return;}
  this.txt('ColorMatch | Tiempo:'+Math.floor(this.timer/6),this.W/2,15);
  for(var i=0;i<this.options.length;i++){
    var x=(i%2)*this.W/2;var y=Math.floor(i/2)*this.H/2+20;
    this.ctx.fillStyle=this.options[i].color;this.ctx.fillRect(x+5,y+5,this.W/2-10,this.H/2-25);
    this.ctx.fillStyle='#fff';this.ctx.font='bold 18px sans-serif';this.ctx.textAlign='center';this.ctx.textBaseline='middle';this.ctx.fillText(this.options[i].text,x+this.W/4,y+this.H/4+10);}
};

// ===== 22. AIM TRAINER =====
function AimGame(c,o){BaseGame.call(this,c,o);this.targets=[];this.timer=300;this.spawnTimer=0;var s=this;this.canvas.onclick=function(e){s.click(e);};}
AimGame.prototype=Object.create(BaseGame.prototype);
AimGame.prototype.click=function(e){var r=this.canvas.getBoundingClientRect();var sx=this.W/r.width,sy=this.H/r.height;
  var mx=(e.clientX-r.left)*sx,my=(e.clientY-r.top)*sy;
  for(var i=this.targets.length-1;i>=0;i--){var t=this.targets[i];var d=Math.sqrt((mx-t.x)*(mx-t.x)+(my-t.y)*(my-t.y));if(d<t.r){this.targets.splice(i,1);this.pts(5);return;}}};
AimGame.prototype.update=function(){
  if(!this.alive)return;this.timer--;this.spawnTimer++;
  if(this.spawnTimer>20){this.spawnTimer=0;this.targets.push({x:20+Math.random()*(this.W-40),y:20+Math.random()*(this.H-40),r:10+Math.random()*10,life:80});}
  for(var i=this.targets.length-1;i>=0;i--){this.targets[i].life--;if(this.targets[i].life<=0)this.targets.splice(i,1);}
  if(this.timer<=0){this.end();return;}
  this.cls();this.ctx.fillStyle='#10b981';for(var i=0;i<this.targets.length;i++){var t=this.targets[i];this.ctx.beginPath();this.ctx.arc(t.x,t.y,t.r,0,Math.PI*2);this.ctx.fill();}
  this.txt('Punteria | Tiempo:'+Math.floor(this.timer/6)+'s Pts:'+this.score);
};

// ===== 23. REACTION TEST =====
function ReactGame(c,o){BaseGame.call(this,c,o);this.state='wait';this.timer=0;this.reactTime=0;this.best=999;this.squares=[];var s=this;this.canvas.onclick=function(e){s.click();};}
ReactGame.prototype=Object.create(BaseGame.prototype);
ReactGame.prototype.click=function(){
  if(this.state==='wait'){this.state='ready';this.timer=30+Math.floor(Math.random()*60);}
  else if(this.state==='ready'){this.state='wait';}
  else if(this.state==='go'){var t=(Date.now()-this.goTime);this.reactTime=t;if(t<this.best)this.best=t;this.pts(Math.max(1,Math.floor(500/t)));this.state='wait';}};
ReactGame.prototype.update=function(){
  if(!this.alive)return;this.cls();
  if(this.state==='wait'){this.ctx.fillStyle='#ef4444';this.ctx.fillRect(this.W/4,this.H/4,this.W/2,this.H/2);this.txt('Espera... Haz clic para comenzar',this.W/2,this.H/2-10);}
  else if(this.state==='ready'){this.timer--;this.ctx.fillStyle='#f59e0b';this.ctx.fillRect(this.W/4,this.H/4,this.W/2,this.H/2);this.txt('Preparate... '+Math.floor(this.timer/6)+'s',this.W/2,this.H/2-10);if(this.timer<=0){this.state='go';this.goTime=Date.now();}}
  else if(this.state==='go'){this.ctx.fillStyle='#10b981';this.ctx.fillRect(this.W/4,this.H/4,this.W/2,this.H/2);this.txt('¡HAZ CLIC AHORA!',this.W/2,this.H/2-10);}
  var bestTxt=this.best<999?'Mejor: '+this.best+'ms':'';
  this.txt('Reaccion | '+bestTxt,this.W/2,this.H-8);
};

// ===== 24. TYPING SPEED =====
function TypeGame(c,o){BaseGame.call(this,c,o);this.words=['CASA','PERRO','GATO','SOL','LUNA','MAR','SOL','HOLA','MUNDO','MATE','TEC','ALGEBRA','NUMERO','FORMA','RAPIDO','JUEGO'];this.current='';this.input='';this.timer=300;this.score=0;this.wordCount=0;this.nextWord();}
TypeGame.prototype=Object.create(BaseGame.prototype);
TypeGame.prototype.nextWord=function(){this.current=this.words[Math.floor(Math.random()*this.words.length)];this.input='';};
TypeGame.prototype.update=function(){
  if(!this.alive)return;this.timer--;
  if(this.timer<=0){this.end();return;}
  var s=this;for(var key in this.keys){if(this.keys[key]&&key.length===1){this.keys[key]=false;s.input+=key.toUpperCase();if(s.input===s.current){s.pts(10);s.wordCount++;s.nextWord();}else if(!s.current.startsWith(s.input)){s.input='';}}}
  if(this.keys['Backspace']&&this.input.length>0){this.keys['Backspace']=false;this.input=this.input.slice(0,-1);}
  this.cls();
  this.ctx.fillStyle='#333';this.ctx.fillRect(10,this.H/2-20,this.W-20,40);
  this.ctx.fillStyle='#fff';this.ctx.font='18px monospace';this.ctx.textAlign='center';this.ctx.textBaseline='middle';
  this.ctx.fillText(this.current,this.W/2,this.H/2-5);
  this.ctx.fillStyle='#10b981';this.ctx.fillText(this.input,this.W/2,this.H/2+25);
  this.txt('Tipeo | Palabras:'+this.wordCount+' Tiempo:'+Math.floor(this.timer/6)+'s');
};

// ===== 25. MATCH 3 (simplificado) =====
function Match3Game(c,o){BaseGame.call(this,c,o);this.G=8;this.cs=this.W/this.G;this.brd=[];this.sel=null;this.cells=['#ef4444','#10b981','#3b82f6','#f59e0b','#a855f7'];
  for(var y=0;y<this.G;y++){this.brd[y]=[];for(var x=0;x<this.G;x++)this.brd[y][x]=Math.floor(Math.random()*this.cells.length);}this.clearMatches();
  var s=this;this.canvas.onclick=function(e){s.click(e);};}
Match3Game.prototype=Object.create(BaseGame.prototype);
Match3Game.prototype.click=function(e){var r=this.canvas.getBoundingClientRect();var sx=this.W/r.width,sy=this.H/r.height;
  var x=Math.floor(((e.clientX-r.left)*sx)/this.cs);var y=Math.floor(((e.clientY-r.top)*sy)/this.cs);
  if(x<0||x>=this.G||y<0||y>=this.G)return;
  if(!this.sel){this.sel={x:x,y:y};return;}
  var dx=Math.abs(x-this.sel.x),dy=Math.abs(y-this.sel.y);
  if(dx+dy!==1){this.sel={x:x,y:y};return;}
  var t=this.brd[y][x];this.brd[y][x]=this.brd[this.sel.y][this.sel.x];this.brd[this.sel.y][this.sel.x]=t;
  if(this.checkMatches()){this.clearMatches();this.pts(10);}else{t=this.brd[y][x];this.brd[y][x]=this.brd[this.sel.y][this.sel.x];this.brd[this.sel.y][this.sel.x]=t;}
  this.sel=null;};
Match3Game.prototype.checkMatches=function(){for(var y=0;y<this.G;y++)for(var x=0;x<this.G;x++){var v=this.brd[y][x];if(x<=this.G-3&&this.brd[y][x+1]===v&&this.brd[y][x+2]===v)return true;if(y<=this.G-3&&this.brd[y+1][x]===v&&this.brd[y+2][x]===v)return true;}return false;};
Match3Game.prototype.clearMatches=function(){var c=true;while(c){c=false;var m=[];for(var y=0;y<this.G;y++)for(var x=0;x<this.G;x++){var v=this.brd[y][x];if(v===-1)continue;
    if(x<=this.G-3&&this.brd[y][x+1]===v&&this.brd[y][x+2]===v){m.push({x:x,y:y});m.push({x:x+1,y:y});m.push({x:x+2,y:y});c=true;}
    if(y<=this.G-3&&this.brd[y+1][x]===v&&this.brd[y+2][x]===v){m.push({x:x,y:y});m.push({x:x,y:y+1});m.push({x:x,y:y+2});c=true;}}
    for(var i=0;i<m.length;i++)this.brd[m[i].y][m[i].x]=-1;
    for(var x=0;x<this.G;x++){var col=[];for(var y=this.G-1;y>=0;y--)if(this.brd[y][x]!==-1)col.push(this.brd[y][x]);while(col.length<this.G)col.unshift(Math.floor(Math.random()*this.cells.length));for(var y=0;y<this.G;y++)this.brd[y][x]=col[this.G-1-y];}}};
Match3Game.prototype.update=function(){
  this.cls();var cs=this.cs;
  for(var y=0;y<this.G;y++)for(var x=0;x<this.G;x++){this.ctx.fillStyle=this.cells[this.brd[y][x]];this.ctx.fillRect(x*cs+1,y*cs+1,cs-2,cs-2);}
  if(this.sel){this.ctx.strokeStyle='#fff';this.ctx.lineWidth=3;this.ctx.strokeRect(this.sel.x*cs,this.sel.y*cs,cs,cs);}
  this.txt('Match 3 | '+this.score);
};

// ===== 26. FALLING BALLS =====
function FallGame(c,o){BaseGame.call(this,c,o);this.balls=[];this.f=0;this.sp=3;this.timer=600;}
FallGame.prototype=Object.create(BaseGame.prototype);
FallGame.prototype.update=function(){
  if(!this.alive)return;this.f++;this.timer--;
  if(this.timer<=0){this.end();return;}
  if(this.f%20===0){var side=Math.random()<0.5?-1:this.W+1;var target=Math.random()*this.W;this.balls.push({x:side,y:Math.random()*this.H*0.3,r:8+Math.random()*8,vx:(target-side)/80+Math.random(),vy:0.5+Math.random()*1.5});}
  for(var i=this.balls.length-1;i>=0;i--){var b=this.balls[i];b.x+=b.vx;b.y+=b.vy;if(b.y>this.H+20||b.x<-20||b.x>this.W+20){this.balls.splice(i,1);continue;}}
  this.cls();this.ctx.fillStyle='#ef4444';for(var i=0;i<this.balls.length;i++){var b=this.balls[i];this.ctx.beginPath();this.ctx.arc(b.x,b.y,b.r,0,Math.PI*2);this.ctx.fill();}
  this.txt('Bolas | Tiempo:'+Math.floor(this.timer/6)+'s');
};

// ===== 27. FRUIT CATCH =====
function CatchGame(c,o){BaseGame.call(this,c,o);this.basket={x:this.W/2-30,y:this.H-30,w:60,h:20};this.items=[];this.f=0;this.lives=3;this.ps=[0,0,5,10,15,20];}
CatchGame.prototype=Object.create(BaseGame.prototype);
CatchGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if(this.keys['ArrowLeft']||this.keys['a'])this.basket.x=Math.max(0,this.basket.x-4);
  if(this.keys['ArrowRight']||this.keys['d'])this.basket.x=Math.min(this.W-this.basket.w,this.basket.x+4);
  if(this.f%30===0){var t=Math.random();this.items.push({x:Math.random()*(this.W-20),y:-15,w:20,h:20,good:t<0.7,pts:t<0.7?10:-5,speed:2+Math.random()*2});}
  for(var i=this.items.length-1;i>=0;i--){var it=this.items[i];it.y+=it.speed;
    if(it.y+it.h>this.basket.y&&it.x+it.w>this.basket.x&&it.x<this.basket.x+this.basket.w&&it.y<this.basket.y+this.basket.h){if(it.good){this.pts(it.pts);}else{this.lives--;if(this.lives<=0){this.end();return;}}this.items.splice(i,1);}
    else if(it.y>this.H){if(it.good)this.lives--;this.items.splice(i,1);if(this.lives<=0){this.end();return;}}}
  this.cls();this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.basket.x,this.basket.y,this.basket.w,this.basket.h);
  for(var i=0;i<this.items.length;i++){var it=this.items[i];this.ctx.fillStyle=it.good?'#10b981':'#ef4444';this.ctx.fillRect(it.x,it.y,it.w,it.h);}
  this.txt('Atrapa | Vidas:'+this.lives+' Pts:'+this.score);
};

// ===== 28. PONG SOLO (contra pared) =====
function SoloPongGame(c,o){BaseGame.call(this,c,o);this.p={x:this.W/2-30,y:this.H-15,w:60,h:10};this.ball={x:this.W/2,y:this.H-30,vx:3,vy:-3,r:6};this.lives=3;this.bricks=[];this.score=0;
  for(var r=0;r<3;r++)for(var cl=0;cl<8;cl++)this.bricks.push({x:cl*50+5,y:r*20+20,w:45,h:15,al:true});}
SoloPongGame.prototype=Object.create(BaseGame.prototype);
SoloPongGame.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowLeft']||this.keys['a'])this.p.x=Math.max(0,this.p.x-5);if(this.keys['ArrowRight']||this.keys['d'])this.p.x=Math.min(this.W-this.p.w,this.p.x+5);
  this.ball.x+=this.ball.vx;this.ball.y+=this.ball.vy;
  if(this.ball.x<=0||this.ball.x>=this.W)this.ball.vx*=-1;if(this.ball.y<=0)this.ball.vy*=-1;
  if(this.ball.y+this.ball.r>=this.p.y&&this.ball.y+this.ball.r<=this.p.y+this.p.h&&this.ball.x>=this.p.x&&this.ball.x<=this.p.x+this.p.w)this.ball.vy=-Math.abs(this.ball.vy);
  for(var i=0;i<this.bricks.length;i++){var b=this.bricks[i];if(!b.al)continue;
    if(this.ball.x>b.x&&this.ball.x<b.x+b.w&&this.ball.y>b.y&&this.ball.y<b.y+b.h){b.al=false;this.ball.vy*=-1;this.pts(5);}}
  if(this.ball.y>this.H){this.lives--;if(this.lives<=0){this.end();return;}this.ball.x=this.W/2;this.ball.y=this.H-30;this.ball.vx=3*(Math.random()>0.5?1:-1);this.ball.vy=-3;}
  this.cls();this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.p.x,this.p.y,this.p.w,this.p.h);
  this.ctx.fillStyle='#fff';this.ctx.beginPath();this.ctx.arc(this.ball.x,this.ball.y,this.ball.r,0,Math.PI*2);this.ctx.fill();
  this.ctx.fillStyle='#ef4444';for(var i=0;i<this.bricks.length;i++){if(this.bricks[i].al)this.ctx.fillRect(this.bricks[i].x,this.bricks[i].y,this.bricks[i].w,this.bricks[i].h);}
  var bt=this.bricks.filter(function(b){return b.al}).length;if(bt===0){this.pts(100);this.end();return;}
  this.txt('Pong Solo | V:'+this.lives+' Lad:'+bt+' Pts:'+this.score);
};

// ===== 29. NUMBER NINJA =====
function NumGame(c,o){BaseGame.call(this,c,o);this.nums=[];this.target=0;this.f=0;this.lives=3;this.gen();var s=this;this.canvas.onclick=function(e){s.click(e);};}
NumGame.prototype=Object.create(BaseGame.prototype);
NumGame.prototype.gen=function(){this.target=10+Math.floor(Math.random()*90);this.nums=[];for(var i=0;i<6;i++)this.nums.push(Math.floor(Math.random()*50)+1);};
NumGame.prototype.click=function(e){var r=this.canvas.getBoundingClientRect();var sx=this.W/r.width,sy=this.H/r.height;
  var col=Math.floor(((e.clientX-r.left)*sx)/(this.W/3));var row=Math.floor(((e.clientY-r.top)*sy-30)/((this.H-30)/2));
  var idx=row*3+col;if(idx>=0&&idx<this.nums.length){if(this.nums[idx]===this.target){this.pts(20);this.gen();}else{this.lives--;if(this.lives<=0){this.end();return;}this.nums[idx]=-1;}}};
NumGame.prototype.update=function(){
  if(!this.alive)return;this.cls();var cw=this.W/3,ch=(this.H-30)/2;
  this.ctx.fillStyle='#f59e0b';this.ctx.font='bold 22px sans-serif';this.ctx.textAlign='center';this.ctx.fillText('Encuentra: '+this.target,this.W/2,25);
  for(var i=0;i<this.nums.length;i++){var x=(i%3)*cw,y=Math.floor(i/3)*ch+35;if(this.nums[i]===-1)continue;
    this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(x+5,y+5,cw-10,ch-10);
    this.ctx.fillStyle='#fff';this.ctx.font='bold 20px sans-serif';this.ctx.textAlign='center';this.ctx.textBaseline='middle';this.ctx.fillText(this.nums[i],x+cw/2,y+ch/2+5);}
  this.txt('Ninja | Vidas:'+this.lives+' Pts:'+this.score,this.W/2,this.H-8);
};

// ===== 30. DRUM TAP (Bateria) =====
function DrumGame(c,o){BaseGame.call(this,c,o);this.keys=[{key:'d',x:0.25,y:0.5,w:0.2,h:0.3,c:'#ef4444',n:'BOM'},{key:'f',x:0.55,y:0.5,w:0.2,h:0.3,c:'#10b981',n:'TSS'},{key:'j',x:0.25,y:0.2,w:0.2,h:0.2,c:'#3b82f6',n:'CHN'},{key:'k',x:0.55,y:0.2,w:0.2,h:0.2,c:'#f59e0b',n:'TIC'}];this.hits=[];this.combo=0;}
DrumGame.prototype=Object.create(BaseGame.prototype);
DrumGame.prototype.update=function(){
  if(!this.alive)return;this.cls();
  var me=this;
  this.keys.forEach(function(k){
    var kc=k.key;if(me.keys[kc]||me.keys[kc.toUpperCase()]){me.keys[kc]=false;me.keys[kc.toUpperCase()]=false;me.combo++;me.pts(me.combo);me.hits.push({x:k.x*me.W+me.W*k.w/2,t:20});}
    var x=k.x*me.W,y=k.y*me.H,w=me.W*k.w,h=me.H*k.h;
    me.ctx.fillStyle=k.c;me.ctx.fillRect(x,y,w,h);
    me.ctx.fillStyle='#fff';me.ctx.font='bold 16px sans-serif';me.ctx.textAlign='center';me.ctx.textBaseline='middle';me.ctx.fillText(k.n,x+w/2,y+h/2);});
  for(var i=this.hits.length-1;i>=0;i--){this.hits[i].t--;if(this.hits[i].t<=0)this.hits.splice(i,1);}
  this.txt('Bateria | Combo:'+this.combo+' Pts:'+this.score,this.W/2,this.H-8);
};

// ===== 31. MACH RIDER (Carreras futuristas con perspectiva) =====
function MachGame(c,o){BaseGame.call(this,c,o);this.moto={x:this.W/2-20,y:this.H-80,w:40,h:50};this.obs=[];this.f=0;this.sp=2;this.roadW=200;this.score=0;}
MachGame.prototype=Object.create(BaseGame.prototype);
MachGame.prototype.update=function(){
  if(!this.alive)return;this.f++;this.sp=2+Math.floor(this.score/20);
  if(this.keys['ArrowLeft']||this.keys['a'])this.moto.x=Math.max(0,this.moto.x-5);if(this.keys['ArrowRight']||this.keys['d'])this.moto.x=Math.min(this.W-this.moto.w,this.moto.x+5);
  if(this.f%40===0){this.obs.push({x:this.W/2+Math.random()*60-30,y:200,w:6+Math.random()*15,h:6,sp:2});}
  for(var i=this.obs.length-1;i>=0;i--){var h=this.obs[i];h.y+=h.sp;h.sp+=0.15;h.w+=0.7;h.x+=(this.moto.x-this.W/2+20)*-0.03;
    if(h.y>this.H||h.w>80){this.obs.splice(i,1);if(h.y>this.H)this.pts(2);continue;}
    var hr={x:h.x-h.w/2,y:h.y,w:h.w,h:h.h};if(this.moto.x<hr.x+hr.w&&this.moto.x+this.moto.w>hr.x&&this.moto.y<hr.y+hr.h&&this.moto.y+this.moto.h>hr.y){this.end();return;}}
  this.cls();
  var rw=120+this.f*1.5;this.ctx.fillStyle='#333';var px=[this.W/2-rw,this.W/2+rw,this.W+50,-50];var py=[200,200,this.H+20,this.H+20];
  this.ctx.beginPath();this.ctx.moveTo(px[0],py[0]);for(var i=1;i<4;i++)this.ctx.lineTo(px[i],py[i]);this.ctx.closePath();this.ctx.fill();
  this.ctx.strokeStyle='#fff';this.ctx.lineWidth=2;for(var i=0;i<3;i++){var lx=px[0]+(px[2]-px[0])*((i+1)/4);this.ctx.beginPath();this.ctx.moveTo(lx,py[0]);this.ctx.lineTo(lx+rw*0.3,this.H);this.ctx.stroke();}
  this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.moto.x,this.moto.y,this.moto.w,this.moto.h);
  this.ctx.fillStyle='#ef4444';for(var i=0;i<this.obs.length;i++){var h=this.obs[i];this.ctx.fillRect(h.x-h.w/2,h.y,h.w,h.h);}
  this.txt('Mach Rider | '+this.score);
};

// ===== 32. DUCK HUNT (Caceria con clic) =====
function DuckGame(c,o){BaseGame.call(this,c,o);this.ducks=[];this.shots=0;this.timer=600;this.spawnTimer=0;var s=this;this.canvas.onclick=function(e){s.shoot(e);};}
DuckGame.prototype=Object.create(BaseGame.prototype);
DuckGame.prototype.shoot=function(e){this.shots++;
  var r=this.canvas.getBoundingClientRect();var sx=this.W/r.width,sy=this.H/r.height;
  var mx=(e.clientX-r.left)*sx,my=(e.clientY-r.top)*sy;
  for(var i=this.ducks.length-1;i>=0;i--){var d=this.ducks[i];if(mx>d.x&&mx<d.x+40&&my>d.y&&my<d.y+30){this.ducks.splice(i,1);this.pts(15);}}};
DuckGame.prototype.update=function(){
  if(!this.alive)return;this.timer--;this.spawnTimer++;
  if(this.spawnTimer>80&&this.ducks.length<3){this.spawnTimer=0;this.ducks.push({x:Math.random()*(this.W-100),y:this.H-40,vx:(Math.random()>0.5?4:-4),vy:-4});}
  for(var i=this.ducks.length-1;i>=0;i--){var d=this.ducks[i];d.x+=d.vx;d.y+=d.vy;d.vy+=0.15;
    if(d.x<=0||d.x>=this.W-40)d.vx*=-1;if(d.y<=0)d.vy=Math.abs(d.vy);if(d.y>this.H+30){this.ducks.splice(i,1);}}
  if(this.timer<=0){this.end();return;}
  this.cls();this.ctx.fillStyle='#6495ED';this.ctx.fillRect(0,0,this.W,this.H*0.7);
  this.ctx.fillStyle='#228B22';this.ctx.fillRect(0,this.H*0.7,this.W,this.H*0.3);
  this.ctx.fillStyle='#8B4513';for(var i=0;i<this.ducks.length;i++){var d=this.ducks[i];this.ctx.fillRect(d.x,d.y,40,30);this.ctx.fillStyle='#fff';this.ctx.beginPath();this.ctx.arc(d.x+35,d.y+5,4,0,Math.PI*2);this.ctx.fill();this.ctx.fillStyle='#8B4513';}
  this.txt('Duck Hunt | Tiempo:'+Math.floor(this.timer/6)+'s Patos:'+Math.floor(this.score/15)+' Disparos:'+this.shots);
};

// ===== 33. ICE CLIMBER (Plataformas verticales) =====
function IceGame(c,o){BaseGame.call(this,c,o);this.p={x:this.W/2-12,y:this.H-60,w:24,h:24,vy:0};this.blocks=[];this.f=0;this.g=0.4;this.vx=0;
  for(var y=0;y<12;y++)for(var x=0;x<10;x++){if(Math.random()<0.3||y===11)this.blocks.push({x:x*40,y:y*25,w:40,h:25,al:true});}}
IceGame.prototype=Object.create(BaseGame.prototype);
IceGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if(this.keys['ArrowLeft']||this.keys['a'])this.p.x=Math.max(0,this.p.x-3);
  if(this.keys['ArrowRight']||this.keys['d'])this.p.x=Math.min(this.W-this.p.w,this.p.x+3);
  this.p.vy+=this.g;this.p.y+=this.p.vy;var on=false;
  for(var i=0;i<this.blocks.length;i++){var b=this.blocks[i];if(!b.al)continue;
    if(this.p.vy>=0&&this.p.y+this.p.h>=b.y&&this.p.y+this.p.h<=b.y+8&&this.p.x+this.p.w>b.x&&this.p.x<b.x+b.w){this.p.y=b.y-this.p.h;this.p.vy=0;on=true;}}
  var headY=this.p.y;for(var i=0;i<this.blocks.length;i++){var b=this.blocks[i];if(!b.al)continue;
    if(headY-5<b.y+b.h&&headY+5>b.y&&this.p.x+this.p.w>b.x&&this.p.x<b.x+b.w&&(this.keys['ArrowUp']||this.keys['w'])){
      b.al=false;this.p.y=b.y-this.p.h;this.p.vy=0;this.pts(5);}}
  if(this.p.y>this.H){this.end();return;}
  if(on&&this.keys[' ']){this.p.vy=-6;}
  var topY=this.p.y;if(topY<this.H/2){var diff=this.H/2-topY;for(var i=0;i<this.blocks.length;i++)this.blocks[i].y+=diff;this.p.y+=diff;}
  this.cls();
  for(var i=0;i<this.blocks.length;i++){var b=this.blocks[i];if(b.al){this.ctx.fillStyle=b.al?'#87CEEB':'#333';this.ctx.fillRect(b.x,b.y,b.w,b.h);this.ctx.strokeStyle='#fff';this.ctx.strokeRect(b.x,b.y,b.w,b.h);}}
  this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.p.x,this.p.y,this.p.w,this.p.h);
  this.txt('Ice Climber | '+this.score);
};

// ===== 34. BALLOON FIGHT =====
function BalloonGame(c,o){BaseGame.call(this,c,o);this.p={x:this.W/2,y:this.H/2,w:20,h:24,vy:0};this.balls=[];this.enemies=[];this.f=0;this.g=0.3;
  for(var i=0;i<2;i++)this.enemies.push({x:100+Math.random()*200,y:50+Math.random()*100,w:20,h:24,vy:0,al:true});}
BalloonGame.prototype=Object.create(BaseGame.prototype);
BalloonGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if(this.keys[' ']||this.keys['ArrowUp']||this.keys['w']){this.p.vy=-3;}
  this.p.vy+=this.g;this.p.y+=this.p.vy;
  if(this.p.y<5)this.p.y=5;if(this.p.y>this.H-30){this.end();return;}
  if(this.f%60===0){this.balls.push({x:this.p.x,y:this.p.y-5,r:3,vy:-4});}
  for(var i=this.balls.length-1;i>=0;i--){var b=this.balls[i];b.y+=b.vy;if(b.y<0){this.balls.splice(i,1);continue;}
    for(var j=0;j<this.enemies.length;j++){var e=this.enemies[j];if(!e.al)continue;
      if(b.x>e.x&&b.x<e.x+e.w&&b.y>e.y&&b.y<e.y+e.h){e.al=false;this.balls.splice(i,1);this.pts(20);break;}}}
  for(var i=0;i<this.enemies.length;i++){var e=this.enemies[i];if(!e.al)continue;
    e.vy+=0.2;e.y+=e.vy;e.x+=Math.sin(this.f*0.05+i)*2;
    if(e.y<30)e.vy=1;if(e.y>this.H-30)e.vy=-1;
    if(Math.abs(this.p.x-e.x)<25&&Math.abs(this.p.y-e.y)<25){this.end();return;}}
  this.cls();this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.p.x-10,this.p.y,20,24);
  this.ctx.fillStyle='#f59e0b';this.ctx.beginPath();this.ctx.arc(this.p.x,this.p.y-5,10,0,Math.PI*2);this.ctx.fill();
  for(var i=0;i<this.balls.length;i++){this.ctx.fillStyle='#fff';this.ctx.beginPath();this.ctx.arc(this.balls[i].x,this.balls[i].y,3,0,Math.PI*2);this.ctx.fill();}
  for(var i=0;i<this.enemies.length;i++){if(!this.enemies[i].al)continue;var e=this.enemies[i];
    this.ctx.fillStyle='#ef4444';this.ctx.fillRect(e.x,e.y,e.w,e.h);
    this.ctx.fillStyle='#f59e0b';this.ctx.beginPath();this.ctx.arc(e.x+10,e.y-8,8,0,Math.PI*2);this.ctx.fill();}
  this.txt('Balloon Fight | '+this.score);
};

// ===== 35. EXCITEBIKE (Carreras con temperatura) =====
function ExciteGame(c,o){BaseGame.call(this,c,o);this.bike={x:this.W/2-15,y:this.H-60,w:30,h:30,vy:0};this.temp=0;this.obs=[];this.f=0;this.g=0.5;this.sp=3;this.road=[];this.gameOver=false;
  for(var i=0;i<20;i++)this.road.push({x:Math.random()*this.W,h:20});}
ExciteGame.prototype=Object.create(BaseGame.prototype);
ExciteGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  var accel=this.keys['ArrowUp']||this.keys['w'];var brake=this.keys['ArrowDown']||this.keys['s'];
  if(this.keys['ArrowLeft']||this.keys['a'])this.bike.x=Math.max(0,this.bike.x-4);
  if(this.keys['ArrowRight']||this.keys['d'])this.bike.x=Math.min(this.W-this.bike.w,this.bike.x+4);
  if(accel){this.sp=Math.min(8,this.sp+0.1);this.temp+=2;}else{this.sp=Math.max(2,this.sp-0.05);this.temp=Math.max(0,this.temp-1);}
  if(brake){this.sp=Math.max(1,this.sp-0.3);this.temp=Math.max(0,this.temp-3);}
  if(this.temp>100){this.end();return;}
  if(this.f%30===0&&Math.random()<0.4){var lane=Math.floor(Math.random()*4);this.obs.push({x:lane*this.W/4+10,y:-20,w:this.W/4-20,h:20});}
  for(var i=this.obs.length-1;i>=0;i--){var o=this.obs[i];o.y+=this.sp;if(o.y>this.H){this.obs.splice(i,1);if(o.y>this.H)this.pts(accel?3:1);continue;}
    if(this.bike.x<o.x+o.w&&this.bike.x+this.bike.w>o.x&&this.bike.y<o.y+o.h&&this.bike.y+this.bike.h>o.y){this.end();return;}}
  this.cls();this.ctx.fillStyle='#555';
  for(var i=0;i<this.road.length;i++){var r=this.road[i];r.y+=this.sp;if(r.y>this.H){r.y=-20;r.x=Math.random()*this.W;r.h=10+Math.random()*20;}this.ctx.fillRect(r.x,r.y,30,r.h);}
  this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.bike.x,this.bike.y,this.bike.w,this.bike.h);
  this.ctx.fillStyle='#ef4444';for(var i=0;i<this.obs.length;i++)this.ctx.fillRect(this.obs[i].x,this.obs[i].y,this.obs[i].w,this.obs[i].h);
  var tempColor=this.temp>80?'#ef4444':this.temp>50?'#f59e0b':'#10b981';
  this.ctx.fillStyle=tempColor;this.ctx.fillRect(10,10,this.temp,8);
  this.txt('Excitebike | Temp:'+Math.floor(this.temp)+'% Vel:'+this.sp.toFixed(1)+' Pts:'+this.score);
};

// ===== 36. BOMBERMAN =====
function BombGame(c,o){BaseGame.call(this,c,o);this.G=11;this.cs=this.W/this.G;this.brd=[];this.bombs=[];this.explosions=[];this.p={x:1,y:1};
  for(var y=0;y<this.G;y++){this.brd[y]=[];for(var x=0;x<this.G;x++){this.brd[y][x]=0;if(x%2===0&&y%2===0&&!(x===1&&y===1))this.brd[y][x]=1;if(Math.random()<0.25&&!(x===0&&y===0)&&!(x===0&&y===1)&&!(x===1&&y===0)&&!(x===1&&y===1))this.brd[y][x]=2;}}}
BombGame.prototype=Object.create(BaseGame.prototype);
BombGame.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowUp']&&this.p.y>0&&this.brd[this.p.y-1][this.p.x]!==1&&this.brd[this.p.y-1][this.p.x]!==2){this.keys['ArrowUp']=false;this.p.y--;}
  if(this.keys['ArrowDown']&&this.p.y<this.G-1&&this.brd[this.p.y+1][this.p.x]!==1&&this.brd[this.p.y+1][this.p.x]!==2){this.keys['ArrowDown']=false;this.p.y++;}
  if(this.keys['ArrowLeft']&&this.p.x>0&&this.brd[this.p.y][this.p.x-1]!==1&&this.brd[this.p.y][this.p.x-1]!==2){this.keys['ArrowLeft']=false;this.p.x--;}
  if(this.keys['ArrowRight']&&this.p.x<this.G-1&&this.brd[this.p.y][this.p.x+1]!==1&&this.brd[this.p.y][this.p.x+1]!==2){this.keys['ArrowRight']=false;this.p.x++;}
  if(this.keys[' ']){this.keys[' ']=false;this.bombs.push({x:this.p.x,y:this.p.y,t:90});}
  for(var i=this.bombs.length-1;i>=0;i--){var b=this.bombs[i];b.t--;if(b.t<=0){
    for(var dx=-1;dx<=1;dx++)for(var dy=-1;dy<=1;dy++){if(Math.abs(dx)===Math.abs(dy))continue;
      for(var d=0;d<=2;d++){var nx=b.x+dx*d,ny=b.y+dy*d;if(nx<0||nx>=this.G||ny<0||ny>=this.G)break;
        if(this.brd[ny][nx]===2){this.brd[ny][nx]=0;this.pts(5);}if(this.brd[ny][nx]===1)break;}}
    this.bombs.splice(i,1);}}
  this.cls();var cs=this.cs;
  for(var y=0;y<this.G;y++)for(var x=0;x<this.G;x++){
    if(this.brd[y][x]===1){this.ctx.fillStyle='#555';this.ctx.fillRect(x*cs,y*cs,cs,cs);}
    else if(this.brd[y][x]===2){this.ctx.fillStyle='#8B4513';this.ctx.fillRect(x*cs,y*cs,cs,cs);}
    else{this.ctx.fillStyle='#1a1a2e';this.ctx.fillRect(x*cs,y*cs,cs,cs);}}
  for(var i=0;i<this.bombs.length;i++){var b=this.bombs[i];this.ctx.fillStyle='#000';this.ctx.beginPath();this.ctx.arc(b.x*cs+cs/2,b.y*cs+cs/2,cs/3,0,Math.PI*2);this.ctx.fill();this.ctx.fillStyle='#fff';this.ctx.font='8px sans-serif';this.ctx.textAlign='center';this.ctx.fillText(Math.ceil(b.t/30),b.x*cs+cs/2,b.y*cs+cs/2+3);}
  this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.p.x*cs+2,this.p.y*cs+2,cs-4,cs-4);
  this.txt('Bomberman | Bombas:'+this.bombs.length+' Pts:'+this.score);
};

// ===== 37. KUNG FU MASTER =====
function KungFuGame(c,o){BaseGame.call(this,c,o);this.p={x:50,y:this.H-80,w:30,h:50};this.ens=[];this.f=0;this.lives=3;this.punchTimer=0;}
KungFuGame.prototype=Object.create(BaseGame.prototype);
KungFuGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if(this.keys['ArrowUp']||this.keys['w'])this.p.y=Math.max(0,this.p.y-3);if(this.keys['ArrowDown']||this.keys['s'])this.p.y=Math.min(this.H-this.p.h,this.p.y+3);
  if(this.punchTimer>0)this.punchTimer--;
  if(this.keys[' ']){this.keys[' ']=false;this.punchTimer=10;
    for(var i=this.ens.length-1;i>=0;i--){var e=this.ens[i];if(Math.abs(this.p.x-e.x)<50&&Math.abs(this.p.y-e.y)<40){this.ens.splice(i,1);this.pts(10);}}}
  if(this.f%50===0&&this.ens.length<4){this.ens.push({x:this.W,y:this.p.y+Math.random()*40-20,vx:-2-this.score/50});}
  for(var i=this.ens.length-1;i>=0;i--){var e=this.ens[i];e.x+=e.vx;if(e.x<0){this.lives--;this.ens.splice(i,1);if(this.lives<=0){this.end();return;}}
    if(Math.abs(e.x-this.p.x)<20&&Math.abs(e.y-this.p.y)<30){this.lives--;this.ens.splice(i,1);if(this.lives<=0){this.end();return;}}}
  this.cls();this.ctx.fillStyle='#87CEEB';this.ctx.fillRect(0,0,this.W,30);
  this.ctx.fillStyle='#228B22';this.ctx.fillRect(0,this.H-10,this.W,10);
  this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.p.x,this.p.y,this.p.w,this.p.h);
  if(this.punchTimer>0){this.ctx.fillStyle='#fff';this.ctx.fillRect(this.p.x+this.p.w,this.p.y+10,15,10);}
  this.ctx.fillStyle='#ef4444';for(var i=0;i<this.ens.length;i++){var e=this.ens[i];this.ctx.fillRect(e.x,e.y,20,30);}
  this.txt('Kung Fu | Vidas:'+this.lives+' Pts:'+this.score);
};

// ===== 38. GALAXIAN (Enemigos en picada) =====
function GalaxGame(c,o){BaseGame.call(this,c,o);this.p={x:this.W/2-20,y:this.H-40,w:40,h:20};this.bul=[];this.ens=[];this.dir=1;this.ft=0;this.dive=false;this.diver=null;
  for(var r=0;r<4;r++)for(var cl=0;cl<7;cl++)this.ens.push({x:cl*50+30,y:r*30+20,w:30,h:20,al:true});}
GalaxGame.prototype=Object.create(BaseGame.prototype);
GalaxGame.prototype.update=function(){
  if(!this.alive)return;
  if(this.keys['ArrowLeft']||this.keys['a'])this.p.x=Math.max(0,this.p.x-4);if(this.keys['ArrowRight']||this.keys['d'])this.p.x=Math.min(this.W-this.p.w,this.p.x+4);
  if((this.keys[' ']||this.keys['ArrowUp'])&&this.ft<=0){this.bul.push({x:this.p.x+this.p.w/2-2,y:this.p.y,w:4,h:10,vy:-5});this.ft=10;}this.ft--;
  for(var i=this.bul.length-1;i>=0;i--){this.bul[i].y+=this.bul[i].vy;if(this.bul[i].y<0){this.bul.splice(i,1);continue;}
    for(var j=0;j<this.ens.length;j++){if(!this.ens[j].al)continue;var e=this.ens[j];
      if(this.bul[i]&&this.bul[i].x<e.x+e.w&&this.bul[i].x+this.bul[i].w>e.x&&this.bul[i].y<e.y+e.h&&this.bul[i].y+this.bul[i].h>e.y){e.al=false;this.bul.splice(i,1);this.pts(10);break;}}}
  if(!this.dive&&this.f%120===0&&Math.random()<0.3){var alive=this.ens.filter(function(e){return e.al});if(alive.length>0){this.diver=alive[Math.floor(Math.random()*alive.length)];this.dive=true;}}
  if(this.dive&&this.diver){this.diver.x+=this.dir*0.5;this.diver.y+=2;
    if(this.diver.y+this.diver.h>=this.p.y){this.end();return;}
    if(this.diver.y>this.H){this.diver.al=false;this.dive=false;this.diver=null;}
    if(this.diver&&!this.diver.al){this.dive=false;this.diver=null;}}
  var he=false;for(var i=0;i<this.ens.length;i++){if(!this.ens[i].al||this.ens[i]===this.diver)continue;
    this.ens[i].x+=this.dir*0.3;if(this.ens[i].x<=0||this.ens[i].x>=this.W-30)he=true;}
  if(he)this.dir*=-1;
  if(this.ens.every(function(e){return !e.al})){this.pts(200);this.end();return;}
  this.f++;
  this.cls();this.ctx.fillStyle='#10b981';this.ctx.fillRect(this.p.x,this.p.y,this.p.w,this.p.h);
  for(var i=0;i<this.bul.length;i++){this.ctx.fillStyle='#f59e0b';this.ctx.fillRect(this.bul[i].x,this.bul[i].y,this.bul[i].w,this.bul[i].h);}
  for(var i=0;i<this.ens.length;i++){if(this.ens[i].al){this.ctx.fillStyle='#ef4444';this.ctx.fillRect(this.ens[i].x,this.ens[i].y,this.ens[i].w,this.ens[i].h);}}
  this.txt('Galaxian | '+this.score);
};

// ===== 39. POPEYE =====
function PopeyeGame(c,o){BaseGame.call(this,c,o);this.p={x:this.W/2-15,y:this.H-60,w:30,h:40};this.items=[];this.enemy={x:0,y:this.H-80,w:30,h:40,vy:0,vx:1};this.lives=3;this.f=0;this.g=0.4;this.onGround=true;}
PopeyeGame.prototype=Object.create(BaseGame.prototype);
PopeyeGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  if(this.keys['ArrowLeft']||this.keys['a'])this.p.x=Math.max(0,this.p.x-3);
  if(this.keys['ArrowRight']||this.keys['d'])this.p.x=Math.min(this.W-this.p.w,this.p.x+3);
  if((this.keys['ArrowUp']||this.keys['w']||this.keys[' '])&&this.onGround){this.p.vy=-7;this.onGround=false;}
  this.p.vy+=this.g;this.p.y+=this.p.vy;
  if(this.p.y>=this.H-60){this.p.y=this.H-60;this.p.vy=0;this.onGround=true;}
  if(this.f%50===0){this.items.push({x:Math.random()*(this.W-20),y:-15,w:15,h:15,vy:1+Math.random()*2});}
  for(var i=this.items.length-1;i>=0;i--){var it=this.items[i];it.y+=it.vy;
    if(it.y+it.h>this.p.y&&it.y<this.p.y+this.p.h&&it.x+it.w>this.p.x&&it.x<this.p.x+this.p.w){this.items.splice(i,1);this.pts(10);}
    else if(it.y>this.H){this.items.splice(i,1);}}
  this.enemy.x+=this.enemy.vx;if(this.enemy.x<=0||this.enemy.x>=this.W-30)this.enemy.vx*=-1;
  if(Math.abs(this.p.x-this.enemy.x)<30&&Math.abs(this.p.y-this.enemy.y)<30){this.lives--;if(this.lives<=0){this.end();return;}this.p.x=this.W/2;this.p.y=this.H-60;}
  this.cls();this.ctx.fillStyle='#87CEEB';this.ctx.fillRect(0,0,this.W,20);
  for(var i=0;i<4;i++){this.ctx.fillStyle='#8B4513';this.ctx.fillRect(i*this.W/4,this.H-20,this.W/8,10);}
  this.ctx.fillStyle='#3b82f6';this.ctx.fillRect(this.p.x,this.p.y,this.p.w,this.p.h);
  this.ctx.fillStyle='#ef4444';this.ctx.fillRect(this.enemy.x,this.enemy.y,this.enemy.w,this.enemy.h);
  for(var i=0;i<this.items.length;i++){var it=this.items[i];this.ctx.fillStyle='#f59e0b';this.ctx.fillRect(it.x,it.y,it.w,it.h);}
  this.txt('Popeye | Vidas:'+this.lives+' Pts:'+this.score);
};

// ===== 40. BATTLE CITY (TANQUES) =====
function TankGame(c,o){BaseGame.call(this,c,o);this.G=13;this.cs=this.W/this.G;this.brd=[];this.bul=[];this.base={x:6,y:12};this.lives=3;
  for(var y=0;y<13;y++){this.brd[y]=[];for(var x=0;x<13;x++){this.brd[y][x]=0;if(x%2===0&&y%2===0&&!(x===6&&y===12)&&!(x===6&&y===11)&&!(x===5&&y===12)&&!(x===7&&y===12))this.brd[y][x]=1;if(Math.random()<0.2&&this.brd[y][x]===0)this.brd[y][x]=1;}}
  this.tank={x:6,y:10,dir:0};this.ens=[];this.ft=0;this.f=0;
  for(var i=0;i<3;i++){var ex,ey;do{ex=Math.floor(Math.random()*13);ey=Math.floor(Math.random()*8);}while(this.brd[ey][ex]!==0||ex===6||(ey>10));this.ens.push({x:ex,y:ey,dir:Math.floor(Math.random()*4),al:true,ft:0});}}
TankGame.prototype=Object.create(BaseGame.prototype);
TankGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  var nx=this.tank.x,ny=this.tank.y;
  if(this.keys['ArrowUp']){this.tank.dir=0;ny--;}if(this.keys['ArrowDown']){this.tank.dir=2;ny++;}
  if(this.keys['ArrowLeft']){this.tank.dir=3;nx--;}if(this.keys['ArrowRight']){this.tank.dir=1;nx++;}
  if(nx>=0&&nx<13&&ny>=0&&ny<13&&this.brd[ny][nx]===0){this.tank.x=nx;this.tank.y=ny;}
  if(this.keys[' ']&&this.ft<=0){var bx=this.tank.x,by=this.tank.y;
    if(this.tank.dir===0)by--;if(this.tank.dir===2)by++;if(this.tank.dir===3)bx--;if(this.tank.dir===1)bx++;
    if(bx>=0&&bx<13&&by>=0&&by<13){this.bul.push({x:bx,y:by,dir:this.tank.dir});this.ft=20;}}this.ft--;
  for(var i=this.bul.length-1;i>=0;i--){var b=this.bul[i];var bnx=b.x,bny=b.y;
    if(b.dir===0)bny--;if(b.dir===2)bny++;if(b.dir===3)bnx--;if(b.dir===1)bnx++;
    if(bnx<0||bnx>=13||bny<0||bny>=13||this.brd[bny][bnx]===1){this.brd[bny]&&this.brd[bny][bnx]===1?this.brd[bny][bnx]=0:0;this.bul.splice(i,1);continue;}
    if(bny===this.base.y&&bnx===this.base.x){this.lives--;this.bul.splice(i,1);if(this.lives<=0){this.end();return;}continue;}
    for(var j=0;j<this.ens.length;j++){if(!this.ens[j].al)continue;
      if(bnx===this.ens[j].x&&bny===this.ens[j].y){this.ens[j].al=false;this.bul.splice(i,1);this.pts(20);break;}}
    b.x=bnx;b.y=bny;}
  for(var i=0;i<this.ens.length;i++){var e=this.ens[i];if(!e.al)continue;e.ft--;
    var dirs=[[0,-1],[1,0],[0,1],[-1,0]];if(e.ft<=0||Math.random()<0.05){
      e.dir=Math.floor(Math.random()*4);e.ft=30;}
    var enx=e.x+dirs[e.dir][0],eny=e.y+dirs[e.dir][1];
    if(enx>=0&&enx<13&&eny>=0&&eny<13&&this.brd[eny][enx]===0&&!(eny===this.base.y&&enx===this.base.x)){e.x=enx;e.y=eny;}
    else{e.dir=Math.floor(Math.random()*4);}
    if(Math.random()<0.02){var ebx=e.x,eby=e.y;
      if(e.dir===0)eby--;if(e.dir===2)eby++;if(e.dir===3)ebx--;if(e.dir===1)ebx++;
      if(ebx>=0&&ebx<13&&eby>=0&&eby<13)this.bul.push({x:ebx,y:eby,dir:e.dir,enemy:true});}}
  if(this.ens.every(function(e){return !e.al})){this.pts(200);this.end();return;}
  this.cls();var cs=this.cs;
  for(var y=0;y<13;y++)for(var x=0;x<13;x++){if(this.brd[y][x]===1){this.ctx.fillStyle='#8B4513';this.ctx.fillRect(x*cs,y*cs,cs-1,cs-1);}else{this.ctx.fillStyle='#1a1a2e';this.ctx.fillRect(x*cs,y*cs,cs-1,cs-1);}}
  this.ctx.fillStyle='#f59e0b';this.ctx.fillRect(this.base.x*cs,this.base.y*cs,cs*2,cs/2);
  this.ctx.fillStyle='#10b981';this.ctx.fillRect(this.tank.x*cs+2,this.tank.y*cs+2,cs-4,cs-4);
  for(var i=0;i<this.ens.length;i++){if(!this.ens[i].al)continue;var e=this.ens[i];this.ctx.fillStyle='#ef4444';this.ctx.fillRect(e.x*cs+2,e.y*cs+2,cs-4,cs-4);}
  for(var i=0;i<this.bul.length;i++){var b=this.bul[i];this.ctx.fillStyle=b.enemy?'#f59e0b':'#fff';this.ctx.fillRect(b.x*cs+cs/2-2,b.y*cs+cs/2-2,4,4);}
  this.txt('Battle City | Vidas:'+this.lives+' Tanques:'+this.ens.filter(function(e){return e.al}).length+' Pts:'+this.score);
};

// ===== 41. ROAD FIGHTER (Carreras clasicas NES con nitro) =====
function RoadFighterGame(c,o){BaseGame.call(this,c,o);this.car={x:this.W/2-18,y:this.H-70,w:36,h:50};this.obs=[];this.f=0;this.speed=4;this.nitro=100;this.roadOffset=0;this.lives=3;this.roadMarkers=[];
  for(var i=0;i<6;i++)this.roadMarkers.push({x:this.W/2-2,y:i*60});}
RoadFighterGame.prototype=Object.create(BaseGame.prototype);
RoadFighterGame.prototype.update=function(){
  if(!this.alive)return;this.f++;
  var accel=this.keys['ArrowUp']||this.keys['w'];var brake=this.keys['ArrowDown']||this.keys['s'];
  if(this.keys['ArrowLeft']||this.keys['a'])this.car.x=Math.max(10,this.car.x-4);
  if(this.keys['ArrowRight']||this.keys['d'])this.car.x=Math.min(this.W-this.car.w-10,this.car.x+4);
  if(accel&&this.nitro>0){this.speed=Math.min(10,this.speed+0.2);this.nitro=Math.max(0,this.nitro-0.5);}
  else{this.speed=Math.max(3,this.speed-0.1);this.nitro=Math.min(100,this.nitro+0.2);}
  this.roadOffset+=this.speed;
  for(var i=0;i<this.roadMarkers.length;i++){var m=this.roadMarkers[i];m.y+=this.speed;if(m.y>this.H){m.y=-20;m.x=this.W/2-2+Math.sin(Math.random()*2)*40;}}
  if(this.f%Math.max(20,50-this.speed*3)===0&&Math.random()<0.6){
    var lane=Math.floor(Math.random()*3);var lx=[this.W/2-80,this.W/2-15,this.W/2+50];
    this.obs.push({x:lx[lane],y:-50,w:36,h:50,sp:1+Math.random()*1.5});}
  for(var i=this.obs.length-1;i>=0;i--){var o=this.obs[i];o.y+=this.speed*o.sp*0.5+1;
    if(o.y>this.H+50){this.obs.splice(i,1);this.pts(5);continue;}
    if(this.car.x<o.x+o.w-10&&this.car.x+this.car.w-10>o.x&&this.car.y<o.y+o.h-10&&this.car.y+this.car.h-10>o.y){
      this.lives--;this.obs.splice(i,1);if(this.lives<=0){this.end();return;}this.car.x=this.W/2-18;}}
  this.cls();
  this.ctx.fillStyle='#2d2d2d';this.ctx.fillRect(0,0,this.W,this.H);
  this.ctx.fillStyle='#555';this.ctx.fillRect(this.W/2-100,0,200,this.H);
  for(var i=0;i<this.roadMarkers.length;i++){var m=this.roadMarkers[i];this.ctx.fillStyle='#fff';this.ctx.fillRect(m.x,m.y,4,30);}
  this.ctx.fillStyle='#fff';this.ctx.fillRect(this.W/2-2,0,4,this.H);
  this.ctx.fillStyle='#10b981';this.ctx.fillRect(this.car.x,this.car.y,this.car.w,this.car.h);
  this.ctx.fillStyle='#ff0';this.ctx.fillRect(this.car.x+5,this.car.y-3,8,3);this.ctx.fillRect(this.car.x+this.car.w-13,this.car.y-3,8,3);
  for(var i=0;i<this.obs.length;i++){var o=this.obs[i];this.ctx.fillStyle='#ef4444';this.ctx.fillRect(o.x,o.y,o.w,o.h);
    this.ctx.fillStyle='#fff';this.ctx.fillRect(o.x+5,o.y+8,o.w-10,6);this.ctx.fillRect(o.x+5,o.y+o.h-14,o.w-10,6);}
  var nc=this.nitro>50?'#10b981':this.nitro>20?'#f59e0b':'#ef4444';
  this.ctx.fillStyle=nc;this.ctx.fillRect(10,10,this.nitro*1.5,10);
  this.ctx.strokeStyle='#fff';this.ctx.strokeRect(10,10,150,10);
  this.txt('Road Fighter | Vidas:'+this.lives+' Vel:'+this.speed.toFixed(1)+' Pts:'+this.score,this.W/2,this.H-6);
};

// ===== REGISTRAR TODOS LOS JUEGOS =====
(function() {
  var g = MathGames;
  if (!g) return;
  g.register('snake', 'Culebrita', 'Come la comida y crece sin chocar', '🐍', SnakeGame, {controls:'Flechas para mover'});
  g.register('pong', 'Pong', 'Juego clasico de ping pong vs IA', '🏓', PongGame, {controls:'W/S y Flechas | IA incluida'});
  g.register('tictac', 'Gato (Tic Tac Toe)', 'Tres en linea contra la IA', '❌', TTTGame, {controls:'Clic para colocar ficha'});
  g.register('dino', 'Dino Run', 'Salta obstaculos como el de Chrome', '🦖', DinoGame, {controls:'Espacio / Flecha arriba para saltar'});
  g.register('breakout', 'Breakout', 'Rompe los ladrillos con la pelota', '🧱', BreakGame, {controls:'Flechas izquierda/derecha o A/D'});
  g.register('invaders', 'Space Invaders', 'Dispara a los invasores', '👾', SpaceGame, {controls:'Flechas para mover | Espacio para disparar'});
  g.register('flappy', 'Flappy Bird', 'Vuela entre obstaculos', '🐤', FlappyGame, {controls:'Espacio/Flecha arriba para volar'});
  g.register('memory', 'Memoria', 'Encuentra los pares de cartas', '🧠', MemGame, {controls:'Clic para descubrir cartas'});
  g.register('tetris', 'Tetris', 'Apila las piezas clasicas', '🧩', TetroGame, {controls:'Flechas: mover/rotar | Abajo: caer'});
  g.register('asteroids', 'Asteroides', 'Destruye asteroides en el espacio', '☄️', AstroGame, {controls:'Flechas: mover/rotar | Espacio: disparar'});
  g.register('pacman', 'Pac-Man', 'Come puntos y evita fantasmas', '👾', PacGame, {controls:'Flechas para mover por el laberinto'});
  g.register('mines', 'Buscaminas', 'Encuentra las minas sin explotar', '💣', MineGame, {controls:'Click izq: descubrir | Click der: bandera'});
  g.register('simon', 'Simon', 'Repite la secuencia de colores', '🔴', SimonGame, {controls:'Flechas o clic para repetir secuencia'});
  g.register('mole', 'Tope Topos', 'Golpea los topos que aparecen', '🔨', MoleGame, {controls:'Clic en los topos para golpearlos'});
  g.register('2048', '2048', 'Junta numeros hasta llegar a 2048', '🧮', TwoZeroGame, {controls:'Flechas para mover las fichas'});
  g.register('snake2', 'Snake 2', 'Culebrita con paredes y obstaculos', '🐍', Snake2Game, {controls:'Flechas para mover | Evita paredes'});
  g.register('connect4', 'Conecta 4', 'Conecta 4 fichas contra la IA', '🔵', C4Game, {controls:'Clic en la columna para soltar ficha'});
  g.register('race', 'Carrera', 'Esquiva autos en la carretera', '🏎️', RaceGame, {controls:'Flechas izq/der para esquivar'});
  g.register('heli', 'Helicoptero', 'Vuela esquivando obstaculos', '🚁', HeliGame, {controls:'Espacio/Flecha arriba para subir'});
  g.register('jumper', 'Saltarin', 'Salta entre plataformas sin caer', '🦘', PlatGame, {controls:'Flechas para mover | Espacio para saltar'});
  g.register('colormatch', 'ColorMatch', 'Encuentra el color correcto', '🎨', ColorMatchGame, {controls:'Clic en el recuadro correcto'});
  g.register('aim', 'Punteria', 'Dispara a los blancos rapido', '🎯', AimGame, {controls:'Clic en los circulos para acertar'});
  g.register('reaction', 'Reaccion', 'Prueba tu tiempo de reaccion', '⚡', ReactGame, {controls:'Clic cuando veas el verde'});
  g.register('typing', 'Tipeo Rapido', 'Escribe las palabras correctas', '⌨️', TypeGame, {controls:'Tecla las palabras que aparecen'});
  g.register('match3', 'Match 3', 'Intercambia fichas para hacer grupos', '💎', Match3Game, {controls:'Clic en dos fichas adyacentes para intercambiar'});
  g.register('falling', 'Bolas', 'Esquiva las bolas que caen', '🔴', FallGame, {controls:'Sobrevive el mayor tiempo posible'});
  g.register('catch', 'Atrapa Frutas', 'Atrapa lo bueno, evita lo malo', '🧺', CatchGame, {controls:'Flechas izq/der para mover la canasta'});
  g.register('pongsolo', 'Pong Solo', 'Rompe ladrillos con la pelota', '🏓', SoloPongGame, {controls:'Flechas o A/D para mover la paleta'});
  g.register('ninja', 'Number Ninja', 'Encuentra el numero correcto', '🔢', NumGame, {controls:'Clic en el numero que coincida'});
  g.register('drum', 'Bateria', 'Toca la bateria con las teclas', '🥁', DrumGame, {controls:'Teclas D,F,J,K para tocar'});
  g.register('machrider', 'Mach Rider', 'Carreras futuristas con perspectiva 3D', '🏍️', MachGame, {controls:'Flechas izq/der para esquivar'});
  g.register('duckhunt', 'Duck Hunt', 'Caza patos con clic de precision', '🦆', DuckGame, {controls:'Clic en los patos para dispararles'});
  g.register('iceclimber', 'Ice Climber', 'Escala rompiendo bloques de hielo', '🧊', IceGame, {controls:'Flechas para mover | Arriba/Espacio para romper'});
  g.register('balloon', 'Balloon Fight', 'Vuela y revienta globos enemigos', '🎈', BalloonGame, {controls:'Espacio/Arriba para aletear'});
  g.register('excitebike', 'Excitebike', 'Carrera de motos con gestion de temperatura', '🏍️', ExciteGame, {controls:'Flechas mover | Arriba acelerar | Abajo frenar'});
  g.register('bomberman', 'Bomberman', 'Coloca bombas y destruye bloques', '💣', BombGame, {controls:'Flechas para mover | Espacio para colocar bomba'});
  g.register('kungfu', 'Kung Fu Master', 'Pelea contra oleadas de enemigos', '🥋', KungFuGame, {controls:'Flechas mover | Espacio para golpear'});
  g.register('galaxian', 'Galaxian', 'Enemigos que se lanzan en picada', '👾', GalaxGame, {controls:'Flechas mover | Espacio/Arriba disparar'});
  g.register('popeye', 'Popeye', 'Atrapa objetos y evita al enemigo', '💪', PopeyeGame, {controls:'Flechas mover | Arriba saltar'});
  g.register('battlecity', 'Battle City', 'Protege tu base de tanques enemigos', '🪖', TankGame, {controls:'Flechas mover | Espacio disparar'});
  g.register('roadfighter', 'Road Fighter', 'Carreras clasicas con nitro y adelantamientos', '🏎️', RoadFighterGame, {controls:'Flechas mover | Arriba acelerar (consume nitro)'});
})();
