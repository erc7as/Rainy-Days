#pragma strict

var Bridge1: GameObject;
var Bridge2: GameObject;

function Start () {
	Bridge2.SetActive(false);
}

function ButtonPress() {
	Bridge2.SetActive(true);
	Destroy(Bridge1);
}