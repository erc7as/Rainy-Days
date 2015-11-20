#pragma strict

static var firstSwitch : boolean = true;
var floodUpdraft : GameObject;
var button : Sprite;

function Start() {
	floodUpdraft.SetActive(false);
}

function ButtonPress() {
	if(firstSwitch) {
		firstSwitch = false;
	} else {
		floodUpdraft.SetActive(true);
	}
	Destroy(gameObject);
	gameObject.GetComponent(SpriteRenderer).sprite = button;
}