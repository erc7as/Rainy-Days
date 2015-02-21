#pragma strict

static var speed : int = 10;


function Start () {

}

function Update () {

  if (Input.GetKey (KeyCode.UpArrow)) {
         rigidbody2D.velocity = Vector2(0, 5);
         }
         if (Input.GetKey (KeyCode.LeftArrow)) {
         transform.Translate (Vector2(-1,0) * Time.deltaTime*speed);
         }
         if (Input.GetKey (KeyCode.RightArrow)) {
         transform.Translate (Vector2(1,0) * Time.deltaTime*speed);
         }

}