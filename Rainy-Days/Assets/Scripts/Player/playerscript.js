#pragma strict

static var speed : int = 10;
static var jumpspeed : int = 20;
var grounded : boolean = false;

function Start () {
}

function OnCollisionEnter2D(coll: Collision2D) {
	print("Coll Enter: " + coll.contacts[0].normal);
	if (coll.contacts[0].normal.y > 0) {
    	grounded = true;
//    	print("Ground collision");
	}
}

function OnCollisionExit2D(coll: Collision2D) {
	print("Coll Exit: " + coll.contacts[0].normal);
	if (coll.contacts[0].normal.y > 0) {
    	grounded = false;
//    	print("Ground collision exit");
	}
}

function Update () {

	if (Input.GetKey(KeyCode.UpArrow) && grounded) {
		rigidbody2D.velocity.y = jumpspeed;
	}
	if (Input.GetKey(KeyCode.LeftArrow)) {
//		rigidbody2D.velocity.x = -speed;
		transform.Translate (Vector2(-1,0) * Time.deltaTime*speed);
	}
	if (Input.GetKey(KeyCode.RightArrow)) {
//		rigidbody2D.velocity.x = speed;
		transform.Translate (Vector2(1,0) * Time.deltaTime*speed);
	}

}