#pragma strict
var updraft1: GameObject;
var sunbeams;

function Start () {
	updraft1.SetActive(false);
}

function Update () {
	sunbeams= playerscript.sunbeamCounter;
	if(sunbeams==5){
	updraft1.SetActive(true);
	}
	
}