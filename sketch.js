var dogImg, happyDogImg;
var dogSprite;
var database = firebase.database();
var milkImage;
var foodStock = 0;
var lastFed, foodRef;
var feedButton, restockButton;
var foodObj;

function getFoodStock(data) {
	foodStock = data.val();
}

function feed() {
	foodStock = foodStock - 1;
	database.ref('/').update({
		Food: foodStock,
	});
}

function restock() {
	foodStock++;
	database.ref('/').update({
		Food: foodStock,
	});
}

function preload() {
	dogImg = loadImage('images/Dog.png');
	milkImage = loadImage('images/Milk.png');
	happyDogImg = loadImage('images/happydog.png');
}

function setup() {
	createCanvas(500, 500);
	dogSprite = createSprite(250, 250, 1, 1);
	dogSprite.addImage(dogImg);
	dogSprite.scale = 0.3;

	foodObj = new Food();

	foodRef = database.ref('Food');
	foodRef.on('value', getFoodStock);

	feedButton = createButton('Feed');
	feedButton.position(500, 60);
	feedButton.mousePressed(feed);

	restockButton = createButton('Restock Food');
	restockButton.position(400, 60);
	restockButton.mousePressed(restock);
}

function draw() {
	background('#00F90E');

	drawSprites();

	stroke('#000000');
	fill('#000000');
	textSize(20);
	text('Food: ' + foodStock, 400, 30);
	foodObj.display();
}

/* Deprecated Functions, use ONLY for reference

function readStock(data) {
	food = data.val();
}

function writeStock() {
	if (food <= 0) {
		food = 0;
	}
	database.ref('/').update({
		Food: food,
	});
}
*/
