#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerStay2D(trig: Collider2D) {
	if (trig.name == "player") {
		var vec = Vector2(500/(trig.transform.position.x - transform.position.x), 0);
		trig.rigidbody2D.AddForce(vec);
	}
}
