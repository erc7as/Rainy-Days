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
		if (dist < 0) {
			transform.parent.localScale.x = Mathf.Abs(transform.parent.localScale.x);
			print("left");
		} else {
			transform.parent.localScale.x = -Mathf.Abs(transform.parent.localScale.x);
			print("right");
		}
		if (ps.isShielding) {
			var dir = Vector2(Mathf.Sign(dist), 0);
			trig.rigidbody2D.AddForce(20 * dir);
		}
		else if (dist) {
			var vec = Vector2(1 / dist, 0);
			trig.rigidbody2D.AddForce(500 * vec);
		}
	}
}
