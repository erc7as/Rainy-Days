#pragma strict

var floodCloud : GameObject;
var button : Sprite;

function Start() {
	floodCloud.SetActive(false);
}

function ButtonPress() {
	floodCloud.SetActive(true);
	Destroy(gameObject);
	gameObject.GetComponent(SpriteRenderer).sprite = button;
}