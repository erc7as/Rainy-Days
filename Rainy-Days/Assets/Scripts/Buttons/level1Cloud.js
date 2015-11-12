#pragma strict

var floodCloud : GameObject;

function Start() {
	floodCloud.SetActive(false);
}

function ButtonPress() {
	floodCloud.SetActive(true);
	Destroy(gameObject);
}