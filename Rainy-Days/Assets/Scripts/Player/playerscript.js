#pragma strict

var speed : int = 10;
var jumpspeed : int = 20;
var zipspeed : int = 10;

var direction : boolean = true; //facing left is true
var umbrellaUp : boolean = false; //default will be to have the umbrella be up
var grounded : boolean = false;
var onWater : boolean = false; //NEED COLLISION, A METHOD TO MAKE THIS TRUE IF PERSON ENCOUNTERS WATER
var inUpdraft : boolean = false;
var inZipline : boolean = false;
var onZipline : boolean = false;
var isPoking : boolean = false;
var isShielding : boolean = false;

var sunbeamCounter : int = 0;
var numSunbeams : int = 2;
var respawnPoints : GameObject[];
var zipline : GameObject = null;

var umbrDownSprite : Sprite;
var umbrUpSprite : Sprite;
var onWaterSprite : Sprite;
var pokeUpSprite : Sprite;
var pokeFwdSprite : Sprite;
var shieldSprite : Sprite;

var sunbeam : Sprite;
var collectSound : AudioClip;
var umbOpened : AudioClip;
var umbClosed: AudioClip;
var splash : AudioClip;

var floodWater : GameObject;


function Start () {

}

function OnCollisionEnter2D(coll: Collision2D) {
//	if (coll.contacts[0].normal.y > 0) {
//    	grounded = true;
////    	print("Ground collision");
//	}

	if (coll.gameObject.name == "blockage" && sunbeamCounter == numSunbeams) {
		Destroy(coll.gameObject);
		grounded = false;
	}
//	print(sunbeamCounter);
}

//function OnCollisionExit2D(coll: Collision2D) {
//	if (coll.contacts[0].normal.y > 0) {
//    	grounded = false;
////    	print("Ground collision exit");
//	}
//}

function OnCollisionStay2D(coll: Collision2D) {
	if (coll.contacts[0].normal.y > 0) {
    	grounded = true;
	}
}

function OnTriggerEnter2D(trig: Collider2D) {
	if(trig.name == "water") {
	AudioSource.PlayClipAtPoint(splash, transform.position);
		if (umbrellaUp) {
			onWater = true;
			gameObject.GetComponent(SpriteRenderer).sprite = onWaterSprite;
		} else {
			//respawn

			if(respawnPoints.Length > 0) {
				Respawn();
			}
		}
	}
	
	else if (trig.name == "sunbeam") {
		AudioSource.PlayClipAtPoint(collectSound, transform.position);
		Destroy(trig.gameObject);
		sunbeamCounter++;
	}
	
	else if (trig.name == "updraft") {
		inUpdraft = true;
	}

//	else if (trig.name == "zipline") {
//		inZipline = true;
//		zipline = trig.gameObject;
//	}

	else if (isPoking && trig.name == "eventSwitch1") {
		//do what needs to be done in event
		//floodscript.flood();
		// floodScript.GetComponent(floodscript).flood();
	//	floodScript.flood();
	Destroy(trig.gameObject);
	floodWater.SetActive(true);
	}
	
	else if (trig.name == "nimboid") {
		Respawn();
	}

	else if (trig.name == "puddle") {
		this.gameObject.transform.position = GameObject.Find("puddle 1").transform.position;
	}
}

function OnTriggerExit2D(trig: Collider2D) {
	if(trig.name == "water") {
		onWater = false;
		if(umbrellaUp){
			gameObject.GetComponent(SpriteRenderer).sprite = umbrUpSprite;
		}
		else { //getting respawned out of water, umbrella still needs to be down
			gameObject.GetComponent(SpriteRenderer).sprite = umbrDownSprite;
		}

	}

	else if (trig.name == "updraft") {
		inUpdraft = false;
	}
	
//	else if (trig.name == "zipline") {
//		inZipline = false;
//		onZipline = false;
//		zipline = null;
//	}

}

function Update () {
	if (umbrellaUp) {
		if (inUpdraft) {
			GetComponent.<Rigidbody2D>().gravityScale = -2;
			GetComponent.<Rigidbody2D>().drag = 2;
		} else {
			GetComponent.<Rigidbody2D>().gravityScale = 2;
			GetComponent.<Rigidbody2D>().drag = 5;
		}
	} else {
		GetComponent.<Rigidbody2D>().gravityScale = 8;
		GetComponent.<Rigidbody2D>().drag = 0;
	}

	if (onZipline) {
		GetComponent.<Rigidbody2D>().gravityScale = 0;
		GetComponent.<Rigidbody2D>().velocity.y = 0;
//		rigidbody2D.velocity.x = 0;
		var angle : float = Mathf.Deg2Rad * zipline.transform.rotation.eulerAngles.z;
		var dir : Vector2 = Vector2(Mathf.Cos(angle), Mathf.Sin(angle));
//		print(angle);
//		print(dir);
		transform.Translate(dir * zipspeed * Time.deltaTime);
	}

	if (Input.GetKey(KeyCode.UpArrow) && grounded && !onWater && !onZipline) {
		GetComponent.<Rigidbody2D>().velocity.y = jumpspeed;
	}
	if (Input.GetKey(KeyCode.LeftArrow) && !onZipline) {
//		rigidbody2D.velocity.x = -speed;
		transform.Translate(Vector2(-1,0) * Time.deltaTime*speed);
		if(!direction) {
		transform.localScale.x *= -1;
		direction = true;
		}
	}
	if (Input.GetKey(KeyCode.RightArrow) && !onZipline) {
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
		isShielding = false;
		print("Not shielding");
		if (!onWater && !onZipline) {
			if(umbrellaUp){
				AudioSource.PlayClipAtPoint(umbClosed, transform.position);
				gameObject.GetComponent(SpriteRenderer).sprite = umbrDownSprite;
			} else {
				AudioSource.PlayClipAtPoint(umbOpened, transform.position);
				gameObject.GetComponent(SpriteRenderer).sprite = umbrUpSprite;
			}
			
			umbrellaUp = !umbrellaUp; //should enable features only available when umbrella is down
		}
	}

	if (Input.GetKeyDown(KeyCode.W)) {
		if (umbrellaUp) {
			
		}
		else {
			//POKE UP
			isPoking = true;
			gameObject.GetComponent(SpriteRenderer).sprite = pokeUpSprite;
		}
	}

	if (Input.GetKeyDown(KeyCode.S)) {
		if (umbrellaUp) {
			isShielding = true;
			print("Shielding");
			gameObject.GetComponent(SpriteRenderer).sprite = shieldSprite;
		}
		else {
			//POKE FORWARD 
			isPoking = true;
			gameObject.GetComponent(SpriteRenderer).sprite = pokeFwdSprite;
		}
	}

	if (Input.GetKeyUp(KeyCode.W) || Input.GetKeyUp(KeyCode.S)) {
		if (isPoking) {
			//UNPOKE
			isPoking = false;
			gameObject.GetComponent(SpriteRenderer).sprite = umbrDownSprite;
		}
		else if (isShielding) {
			isShielding = false;
			print("Not shielding");
			gameObject.GetComponent(SpriteRenderer).sprite = umbrUpSprite;
		}
	}

	if (Input.GetKeyDown(KeyCode.Z)) {
		if (!onZipline) {
			if (inZipline && !umbrellaUp) {
				onZipline = true;
//				print("On zipline");
			}
		} else {
			onZipline = false;
//			print("Off zipline");
		}
	}
	
	grounded = false;
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
