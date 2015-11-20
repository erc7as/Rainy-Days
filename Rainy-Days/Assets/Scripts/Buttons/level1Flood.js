#pragma strict

var floodWater : GameObject;
var floodGround : GameObject;
var button : Sprite;

function Start() {
	floodWater.SetActive(false);
	floodGround.SetActive(false);
}
function ButtonPress() {
	floodWater.SetActive(true);
	floodGround.SetActive(true);
	Destroy(gameObject);
	gameObject.GetComponent(SpriteRenderer).sprite = button;
}