#pragma strict

var ps: playerscript;

function Start () {
	ps = transform.parent.GetComponent(playerscript);
}

function Update () {

}

function OnTriggerEnter2D(trig: Collider2D) {
	if (trig.name == "zipline") {
		ps.inZipline = true;
		ps.zipline = trig.gameObject;
		//ps.print("Zipline on!");
	}
}

function OnTriggerExit2D(trig: Collider2D) {
	if (trig.name == "zipline") {// && trig.gameObject == ps.zipline) {
		ps.inZipline = false;
		ps.onZipline = false;
		ps.zipline = null;
		//ps.print("Zipline off!");
	}
}
