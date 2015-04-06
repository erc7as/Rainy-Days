#pragma strict

var speed : int = 10;
var jumpspeed : int = 20;
var direction : boolean = true; //facing left is true
var umbrellaUp : boolean = true; //default will be to have the umbrella be up
var grounded : boolean = false;
var onWater : boolean = false; //NEED COLLISION, A METHOD TO MAKE THIS TRUE IF PERSON ENCOUNTERS WATER
var inUpdraft : boolean = false;
var isPoking : boolean = false;
//var spriteRnd : SpriteRenderer;
//var spriteRndUmbr : SpriteRenderer;
var umbrDownSprite : Sprite;
var umbrUpSprite : Sprite;
var onWaterSprite : Sprite;
var pokeUpSprite : Sprite;
var pokeFwdSprite : Sprite;


var sunbeam : Sprite;
var sunbeamCounter : int = 0;
var numSunbeams : int = 2;
var respawnPoints : GameObject[];

function Start () {

}

function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.contacts[0].normal.y > 0) {
    	grounded = true;
//    	print("Ground collision");
	}
	
	if (coll.gameObject.name == "blockage" && sunbeamCounter == numSunbeams) {
		Destroy(coll.gameObject);
		grounded = false;
	}
//	print(sunbeamCounter);
}

function OnCollisionExit2D(coll: Collision2D) {
//	print("Collision exit: " + coll.gameObject.name);
	if (coll.contacts[0].normal.y > 0) {
    	grounded = false;
//    	print("Ground collision exit");
	}
}

function OnTriggerEnter2D(trig: Collider2D) {
	if(trig.gameObject.name == "water") {
		if (umbrellaUp) {
			onWater = true;
			gameObject.GetComponent(SpriteRenderer).sprite = onWaterSprite;
		} else {
			//respawn

			if(respawnPoints.Length > 0) {
				Respawn();
				}
			//transform.position = Vector3(4, -4.9, 0);
		}
	}
	
	else if (trig.gameObject.name == "sunbeam") {
		Destroy(trig.gameObject);
		sunbeamCounter++;
	}
	
	else if (trig.gameObject.name == "updraft") {
		inUpdraft = true;
	}
	
	else if (isPoking && trig.gameObject.name == "eventSwitch") {
	//do what needs to be done in event
	Destroy(trig.gameObject);
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

	else if (trig.gameObject.name == "updraft") {
		inUpdraft = false;
	}

}

function Update () {
	if (umbrellaUp) {
		if (inUpdraft) {
			rigidbody2D.gravityScale = -2;
			rigidbody2D.drag = 2;
		} else {
			rigidbody2D.gravityScale = 2;
			rigidbody2D.drag = 5;
		}
	} else {
		rigidbody2D.gravityScale = 8;
		rigidbody2D.drag = 0;
	}

	if (Input.GetKey(KeyCode.UpArrow) && grounded && !onWater) {
		rigidbody2D.velocity.y = jumpspeed;
	}
	if (Input.GetKey(KeyCode.LeftArrow)) {
//		rigidbody2D.velocity.x = -speed;
		transform.Translate(Vector2(-1,0) * Time.deltaTime*speed);
		if(!direction) {
		transform.localScale.x *= -1;
		direction = true;
		}
	}
	if (Input.GetKey(KeyCode.RightArrow)) {
//		rigidbody2D.velocity.x = speed;
		transform.Translate(Vector2(1,0) * Time.deltaTime*speed);
		if(direction) {
		transform.localScale.x *= -1;
		direction = false;
		}
	}
	if (Input.GetKeyDown(KeyCode.D)) { //getkeydown
		//make umbrella go down
		isPoking = false;
		if (!onWater) {
			if(umbrellaUp){
				gameObject.GetComponent(SpriteRenderer).sprite = umbrDownSprite;
			} else {
				gameObject.GetComponent(SpriteRenderer).sprite = umbrUpSprite;
			}
			
			umbrellaUp = !umbrellaUp; //should enable features only available when umbrella is down
			//spriteRnd = renderer as SpriteRenderer;
			//GetComponent(SpriteRenderer).sprite = Resources.Load("Assets/Sprite/_Character/unicornpusheen.png", typeof(Sprite));
		}

	}
	
	if (Input.GetKeyDown(KeyCode.W)) {
		if(!umbrellaUp) {
			//POKE UP
			isPoking = true;
			gameObject.GetComponent(SpriteRenderer).sprite = pokeUpSprite;
		}	
	
	}
	
	if (Input.GetKeyDown(KeyCode.S)) {
		if(!umbrellaUp) {
			//POKE FORWARD 
			isPoking = true;
			gameObject.GetComponent(SpriteRenderer).sprite = pokeFwdSprite;
		}	
	
	
	}
	
//	if(onWater) {
//		gameObject.GetComponent(SpriteRenderer).sprite = onWaterSprite;
//	}



}

	function Respawn() { //will go thru array of all of the current levels respawn points and will put player at closest respawning point
	isPoking = false;
		var minPos : Vector3 = respawnPoints[0].transform.position;
		for(var i : int = 1; i < respawnPoints.Length; i++) {
			if(((respawnPoints[i].transform.position.x - this.gameObject.transform.position.x) - (minPos.x - this.gameObject.transform.position.x)) < 1) {
			minPos = respawnPoints[i].transform.position;
			}
		
		}
		
		this.gameObject.transform.position = minPos;
		
	
	}