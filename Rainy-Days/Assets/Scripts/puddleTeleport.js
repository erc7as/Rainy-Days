#pragma strict

var destination : GameObject;

function Start() {

}

function Teleport(traveler: GameObject) {
	traveler.transform.position = destination.transform.position;
}