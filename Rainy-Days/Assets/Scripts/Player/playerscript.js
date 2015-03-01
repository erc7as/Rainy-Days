#pragma strict

static var speed : int = 10;
static var jumpspeed : int = 20;
var grounded : boolean = false;
var direction : boolean = true; //facing left is true
var umbrellaUp : boolean = true; //default will be to have the umbrella be up
//var spriteRnd : SpriteRenderer;
//var spriteRndUmbr : SpriteRenderer;
var umbrDownSprite : Sprite;
var umbrUpSprite : Sprite;

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
		if(!direction) {
		transform.localScale.x *= -1;
		direction = true;
		}
	}
	if (Input.GetKey(KeyCode.RightArrow)) {
//		rigidbody2D.velocity.x = speed;
		transform.Translate (Vector2(1,0) * Time.deltaTime*speed);
		if(direction) {
		transform.localScale.x *= -1;
		direction = false;
		}
	}
	if (Input.GetKeyDown(KeyCode.D)) { //getkeydown
	//make umbrella go down
	if(umbrellaUp){
		 gameObject.GetComponent(SpriteRenderer).sprite = umbrDownSprite;
	} else {
	 gameObject.GetComponent(SpriteRenderer).sprite = umbrUpSprite;
	}
	
		umbrellaUp = !umbrellaUp; //should enable features only available when umbrella is down
		//spriteRnd = renderer as SpriteRenderer;
	//	GetComponent(SpriteRenderer).sprite = Resources.Load("Assets/Sprite/_Character/unicornpusheen.png", typeof(Sprite));

	}
		

}