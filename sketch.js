var dogImg, happyDogImg;
var dogSprite;
var database = firebase.database();
var foodStock, food;

function preload() {
	dogImg = loadImage('images/Dog.png');
	happyDogImg = loadImage('images/happydog.png');
}

function setup() {
	createCanvas(500, 500);
	dogSprite = createSprite(250, 250, 1, 1);
	dogSprite.addImage(dogImg);
	dogSprite.scale = 0.3;

	foodStock = database.ref('Food');
	foodStock.on('value', readStock);
}

function draw() {
	background(43, 139, 87);

	if (keyWentDown(UP_ARROW)) {
		food = food - 1;
		writeStock(foodStock);
		dogSprite.addImage(happyDogImg);
	}
	drawSprites();

	stroke('#000000');
	fill('#000000');
	textSize(20);
	text('Food: ' + food, 400, 30);
}

function readStock(data) {
	food = data.val();
}

function writeStock() {
	if (food <= 0) {
		food = 0;
		break;
	}
	database.ref('/').update({
		Food: food,
	});
}
