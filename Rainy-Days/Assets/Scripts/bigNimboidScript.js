#pragma strict

var ps: playerscript;

function Start () {
	ps = GameObject.Find("player").GetComponent(playerscript);
}

function Update () {

}

function OnTriggerStay2D(trig: Collider2D) {
	if (trig.name == "player") {
		var dist = trig.transform.position.x - transform.position.x;
		transform.parent.localScale.x = (dist <= 0 ? 1 : -1) * Mathf.Abs(transform.parent.localScale.x);
		if (ps.isShielding) {
			var dir = Vector2(Mathf.Sign(dist), 0);
			trig.GetComponent.<Rigidbody2D>().AddForce(20 * dir);
		}
		else if (dist) {
			var vec = Vector2(1 / dist, 0);
			trig.GetComponent.<Rigidbody2D>().AddForce(500 * vec);
		}
	}
}
