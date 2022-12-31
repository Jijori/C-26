const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var ground;
var con;
var top_wall;
var ball;

var btn1;
var btn2;

function setup() {
  createCanvas(400,400);

  engine = Engine.create();
  world = engine.world;
  
   var ball_options = {
    restitution: 0.95,
  }
   
  btn2 = createImg('up.png');
  btn2.position(20,30);
  btn2.size(50,50);
  btn2.mouseClicked(vForce);

  ground =new Ground(200,390,400,20);

  ball = Bodies.circle(100,200,20,ball_options);
  World.add(world,ball);

  //con is shortform for constraint
  con = Matter.Constraint.create({
    pointA:{x:200,y:20},
    bodyB:ball,
    pointB:{x:0,y:0},
    length:100,
    //stiffness is the elasticity of the string, less stifffness - more elasticity - more oscillations and vice versa
    stiffness:0.1
  })
  
  World.add(world,con); 
  
}

function draw() 
{
  background(51);
  Engine.update(engine);
  
  rectMode(CENTER);
  ellipseMode(RADIUS);

  ellipse(ball.position.x,ball.position.y,20);
  //to give thickness of the string
  strokeWeight(3);
  //to give color to the string and outline of ball
  stroke("white");
  //to add a line visible on the screen since it is always transparent
  line(con.pointA.x,con.pointA.y,ball.position.x,ball.position.y);
  ground.show();
  
  Engine.update(engine);
}


function vForce()
{
  Matter.Body.applyForce(ball,{x:0,y:0},{x:0.05,y:0});
}
  


