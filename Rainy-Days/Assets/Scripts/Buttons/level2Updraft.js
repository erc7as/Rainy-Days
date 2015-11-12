#pragma strict

static var firstSwitch : boolean = true;
var floodUpdraft : GameObject;

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
}