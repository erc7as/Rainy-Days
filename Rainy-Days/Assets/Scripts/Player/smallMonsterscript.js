#pragma strict
var speed: int;
var direction: boolean = true;
var range: int;
var rangecounter: int;

function Start () {

}

function Update () {

if(rangecounter == 0 || rangecounter == range){
	direction = !direction;
	transform.localScale.x *= -1;
}

if(direction){
transform.Translate(Vector2(-1,0) * Time.deltaTime*speed);
		rangecounter -= 1;
		}
		
if(!direction){				
transform.Translate(Vector2(1,0) * Time.deltaTime*speed);
		rangecounter += 1;
		}
}