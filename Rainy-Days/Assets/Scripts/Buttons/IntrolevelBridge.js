#pragma strict

var Bridge1: GameObject;
var Bridge2: GameObject;
var button : Sprite;

function Start () {
	Bridge2.SetActive(false);
}

function ButtonPress() {
	Bridge2.SetActive(true);
	Destroy(Bridge1);
	gameObject.GetComponent(SpriteRenderer).sprite = button;
}