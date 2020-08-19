var dogIMG, dogIMG2, dog, foodS, foodStock, database, Exercise;
var lastFed,fedTime,foodObj;
var foodObj;
var feed,addfood;
var garden, washroom, bedroom;
var RState;
var CState;
var gameS = "";

function preload() {
  dogIMG = loadImage("images/Dog.png");
  dogIMG2 = loadImage("images/happy dog.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  dog = createSprite(120, 250, 10, 10);
  dog.addImage(dogIMG);
  dog.scale = .2;
  foodObj = new Food(200,200);

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
feed = createButton("Feed");
feed.position(100,350);
feed.mousePressed(feedDog);

addfood = createButton("Add Food");
addfood.position(100,380);
addfood.mousePressed(addFood);
}


function draw() {
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  foodStock = firebase.database().ref("Food");
  foodStock.on("value", readStock);

  readState = firebase.database().ref("gameState");
  
  readState.on("value", function(data) {
    gameS = data.val();
  });
  

  background(46, 139, 87);
  drawSprites();
  
 var color1 = random(0,255);
 var color2 = random(0,255);
 var color3 = random(0,255);
 
 fill(color1,color2,color3);
 textSize(50)
 
 text("Virtual Pet v3", 350,50);
 text("___________", 350,60);

 textSize(20);
 fill('white');
 
 fill(255,255,254);
 textSize(25);



 if(lastFed >= 12){
   text("Last fed : " + lastFed%12 + " PM", 800,490);
 }else if(lastFed == 0){
   text("Last Fed : 12 AM",800,490);
 }else{
   text("Last Fed : " + lastFed + " AM", 800,490);
 }
 //console.log(foodS);
 
 text("food Avalible: " + foodS, 5, 490);
 //Exercise = datBase.ref("Exercise");

var hour = getTime();

if(hour - lastFed === 4){
  console.log("Time to feed");
 
}

console.log(lastFed);

if(hour ===(lastFed + 1)){
  foodObj.garden();
}

}

function readStock(data) {
  foodS = data.val();
}

function addFood(){
  foodS++

  database.ref('/').update({
    Food : foodS
  })
  dog.addImage(dogIMG);
}



function feedDog() {
 
  firebase.database().ref('/').update({

    FeedTime : hour()
  });

  foodObj.decFood(foodS);
  dog.addImage(dogIMG2);
}


async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var jsondat = await response.json();

  var dayTime = jsondat.datetime;
  var hour = dayTime.slice(11,13);
  console.log(hour);
 return hour;
}

function update(x) {

  firebase.database().ref('/').update({
    gameState: x
  });

}









