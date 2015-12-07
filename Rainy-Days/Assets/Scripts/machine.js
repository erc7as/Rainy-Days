#pragma strict

var machine_empty: Sprite;
var machine1: Sprite;
var machine2: Sprite;
var machine3: Sprite;
var machine4: Sprite;
var machine5: Sprite;
var sunbeams;

function Start () {

}

function Update () {
sunbeams= playerscript.sunbeamCounter;
if(sunbeams==0){
	gameObject.GetComponent(SpriteRenderer).sprite = machine_empty;
	}
	else if(sunbeams==1){
	gameObject.GetComponent(SpriteRenderer).sprite = machine1;
	}
	else if(sunbeams==2){
	gameObject.GetComponent(SpriteRenderer).sprite = machine2;
	}
	else if(sunbeams==3){
	gameObject.GetComponent(SpriteRenderer).sprite = machine3;
	}
	else if(sunbeams==4){
	gameObject.GetComponent(SpriteRenderer).sprite = machine4;
	}
	else if(sunbeams==5){
	gameObject.GetComponent(SpriteRenderer).sprite = machine5;
	}
}