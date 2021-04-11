var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedTheDog=createButton("Feed the dog")
  feedTheDog.position(400,95);
  feedTheDog.mousePressed(feedDog);

  stroke("black")
  strokeWeight(4)
  fill("black")
  text("Last fed:"+ lastFed,600,110);


}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  food=data.val();
  foodObj.updateFoodStock(food);
}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFood(food);
  foodObj.updateFoodStock(food);
  lastFed.getFedTime(feedTime);

}

//function to add food in stock
function addFoods(){
  food++;
  database.ref('/').update({
    Food:food
  })
}
