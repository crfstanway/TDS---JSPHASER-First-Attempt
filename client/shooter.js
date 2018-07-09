
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};
var timeconfig = {
timeScale: 1, };

var game = new Phaser.Game(config);
var player;
var cursors;
var direction = new Phaser.Math.Vector2();
var mouse = {
    x: 0,
    y: 0,
  };
var timer;
var timetext;
var enemy1;
var enemy_spawn = false;
var enemy_destroy = false;
// console.log(game);

function preload ()
{
this.load.image('park', "assets/sprites/park_background.png");
this.load.image('player', "assets/sprites/player.png");
this.load.image('enemy1', "assets/sprites/enemy_prac.png");
console.log(this);
}

function create ()
{
this.add.image(400, 300, 'park');
cursors = this.input.keyboard.createCursorKeys();
this.wasd = {
  wKey: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
  aKey: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
  sKey: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
  dKey: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
};
player = this.add.sprite(100, 500, 'player');
// player.angle = ;
player.speed = 5;
timetext = this.add.text(400, 400);
timer = 0;
}

function update ()
{
timer = this.sys.game.loop.time;
mouse.x = this.input.activePointer.x;
mouse.y = this.input.activePointer.y;
if (cursors.left.isDown || this.wasd.aKey.isDown) {
  direction.x -= player.speed;
}
if (cursors.right.isDown || this.wasd.dKey.isDown) {
  direction.x += player.speed;
}
if (cursors.down.isDown || this.wasd.sKey.isDown) {
  direction.y += player.speed;
}
if (cursors.up.isDown || this.wasd.wKey.isDown) {
  direction.y -= player.speed;
}
direction.normalize();
direction.scale(player.speed);
player.x += direction.x;
player.y += direction.y;
direction.set(0, 0);
player.rotation = Phaser.Math.Angle.Between(player.x, player.y,mouse.x, mouse.y);
player.angle -= 90;
// console.log(this.input.activePointer.x);
// console.log(player.x, player.y);
// console.log(Phaser.Math.Angle.Between(player.x, player.y,mouse.x, mouse.y));
timetext.setText('time: ' + timer.toString());
if (timer > 5000 && enemy_spawn == false && enemy_destroy == false) {
  enemy1 = this.add.sprite(150, 50, 'enemy1');
  enemy_spawn = true;
}
if (timer > 10000 && enemy_spawn == true) {
  enemy1.destroy();
  enemy_spawn = false;
  enemy_destroy = true;
}
}
