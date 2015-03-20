#pragma strict

static var speed : int = 10;
static var jumpspeed : int = 20;
var grounded : boolean = false;
var direction : boolean = true; //facing left is true
var umbrellaUp : boolean = true; //default will be to have the umbrella be up
var onWater : boolean = true; //NEED COLLISION, A METHOD TO MAKE THIS TRUE IF PERSON ENCOUNTERS WATER
//var spriteRnd : SpriteRenderer;
//var spriteRndUmbr : SpriteRenderer;
var umbrDownSprite : Sprite;
var umbrUpSprite : Sprite;
var onWaterSprite : Sprite;
var sunbeam : Sprite;
var sunbeamCounter : int = 0;

function Start () {
	
}

function OnCollisionEnter2D(coll: Collision2D) {
	print("Coll Enter: " + coll.contacts[0].normal);
	if (coll.contacts[0].normal.y > 0) {
    	grounded = true;
//    	print("Ground collision");
	}
	
	if (coll.gameObject.name == "sunbeam") {
		Destroy(coll.gameObject);
		sunbeamCounter++;
	}
	print(sunbeamCounter);
}

function OnCollisionExit2D(coll: Collision2D) {
	print("Coll Exit: " + coll.contacts[0].normal);
	if (coll.contacts[0].normal.y > 0) {
    	grounded = false;
//    	print("Ground collision exit");
	}
}

function OnTriggerEnter2D(trig: Collider2D) {
if(trig.gameObject.name == "water" && umbrellaUp) {
onWater = true;
gameObject.GetComponent(SpriteRenderer).sprite = onWaterSprite;
} else if (trig.gameObject.name == "water" && !umbrellaUp) {
//respawn

transform.position = Vector3(4, -4.9, 0);

}
}

function OnTriggerExit2D(trig: Collider2D) {
if(trig.gameObject.name == "water") {
onWater = false;
if(umbrellaUp){
gameObject.GetComponent(SpriteRenderer).sprite = umbrUpSprite;
}
else { //getting respawned out of water, umbrella still needs to be down
gameObject.GetComponent(SpriteRenderer).sprite = umbrDownSprite;
}

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
	if(onWater) {
	gameObject.GetComponent(SpriteRenderer).sprite = onWaterSprite;
	}
	
	

}
