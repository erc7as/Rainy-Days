#pragma strict
var speed: double;
var direction: boolean = true;
var range: int;
var rangecounter: int;

function Start () {

}

function FixedUpdate () {

if(rangecounter == 0 || rangecounter == range){
	direction = !direction;
	transform.localScale.x *= -1;
}

if(direction){
transform.Translate(Vector2(-1,0) * speed);
		rangecounter -= 1;
		}
		
if(!direction){				
transform.Translate(Vector2(1,0) * speed);
		rangecounter += 1;
		}
}
