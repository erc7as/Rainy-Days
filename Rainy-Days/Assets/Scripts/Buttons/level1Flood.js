#pragma strict

var floodWater : GameObject;
var floodGround : GameObject;

function Start() {
	floodWater.SetActive(false);
	floodGround.SetActive(false);
}
function ButtonPress() {
	floodWater.SetActive(true);
	floodGround.SetActive(true);
	Destroy(gameObject);
}