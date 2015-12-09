#pragma strict
var updraft1: GameObject;
var sunbeam;

function Start () {
updraft1.SetActive(false);
}

function Update () {
	sunbeam= playerscript.sunbeamCounter;
	if(sunbeam==5){
	updraft1.SetActive(true);
	}
	
}