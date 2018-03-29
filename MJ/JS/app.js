
let ageCounter = 0;

let stepsOfX = 10;

let stepsOfY = 10;

let control = true;

//Make Canvas for pet


const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');


//Prompt to name Pet
//User Should Be Able to Name Pet with Prompt, if named, button removes for good
//Name Displays On screen
document.getElementById('nameBtn').addEventListener('click',function(e){

	const nameBox = document.getElementById('name')

	this.remove();

	document.getElementById('nameHeader').innerHTML = 'Your Pet Name: ' + nameBox.value;

	newPet.name = nameBox.value;

	nameBox.remove();


})

//Pet should be able to get bored, sleepy, and hungry every x minutes if button not clicked

//User Should Be able To Feed Pet with Button,reset hunger

//User Should Be able To Play with Pet, reset boredom

//User Should Be able To Turn Off Lights, reset sleepiness

document.getElementById('btnContainer').addEventListener('click',function(e){
	let clickedBtn = event.target.innerText
	if( clickedBtn === 'Feed'){
		newPet.resetHunger();
	}
	else if(clickedBtn === 'Play'){
		newPet.resetBoredom();
	}
	else if(clickedBtn === 'Lights'){
		newPet.resetSleepiness();
	}
})




//create class to represent tomagotchi pet
class Pet {
	constructor(age,hunger,sleepiness,boredom){
		
		
		//Age
		this.age = age;
		//Hunger 1-10
		this.hunger = hunger;
		//Sleepiness 1-10
		this.sleepiness = sleepiness;
		//Boredom 1-10
		this.boredom = boredom;
		//Property for pets body on canvas
		this.body = {
			x:450,
			y:200,
			r:15,
			e:0,
			//body should start with three circles
			length:3


			}
		

		
	}//Age increments every x minutes
	increaseAge(){

		this.age += 1;
		this.increaseSize()
		printToScreen('age',this.age);

	}//Pet gets hungry
	increaseHunger(){
		this.hunger += 1;
		this.makeSmaller();
		console.log('Hunger Works');
		printToScreen('hunger',this.hunger);
	}//Pet gets sleepy
	increaseSleepiness(){
		
		this.sleepiness +=1;	
		
		console.log('Sleepiness Works');
		printToScreen('sleepiness',this.sleepiness);
	}//Pet Gets Bored
	increaseBoredom(){
		this.boredom += 1;
		console.log('Boredom works');
		printToScreen('boredom',this.boredom);

	}//Button to feed
	resetHunger(){
		this.hunger -= 1;
		this.morphs();
		printToScreen('hunger',this.hunger);

	}//Button to turn off Lights
	resetSleepiness(){
		this.sleepiness -= 1;
		printToScreen('sleepiness',this.sleepiness);

	}//Button To Play with Pet
	resetBoredom(){
		this.boredom -= 1;
		printToScreen('boredom',this.boredom);
	}
	// If Age is X, Morph
	//Increase Length of Body
	morphs(){
		this.body.length += 1;

		ctx.clearRect(0,0,canvas.width,canvas.height);
		this.drawBody(this.body.length);


	}
	makeSmaller(){
		this.body.length -= 1;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		this.drawBody(this.body.length);
	}

	//Pet Animates across page
	//Pet Moves
	animation(){
		if(this.body.x + stepsOfX > canvas.width-(this.body.r * this.body.length) || this.body.x + stepsOfX < this.body.r) {
    		stepsOfX = -stepsOfX;
		}

		if(this.body.y + stepsOfY > canvas.height-(this.body.r * this.body.length) || this.body.y + stepsOfY < this.body.r) {
    		stepsOfY = -stepsOfY;
		}

		this.body.x += stepsOfX;
		this.body.y += stepsOfY;
		
	}
	
	
	//If Either one reaches 10, pet dies
	die(){
		control = false;
		canvas.style.backgroundColor = 'rgb(255,0,0)';
		ctx.font = "100px Arial";
		ctx.fillStyle = 'white';

		ctx.fillText("Your Pet Died",150,450);
		

		

	}
	drawBody(num){
		for(let i = 0; i < num; i ++){
			ctx.beginPath();
			ctx.arc(this.body.x + (i*15),this.body.y + (i*15),this.body.r ,this.body.e , Math.PI * 2);
			ctx.fillStyle = '#333';
			ctx.fill();
			ctx.closePath();
		}
	}
	//As pet eats, circles get bigger
	increaseSize(){
		this.body.r += 5;
		ctx.clearRect(0,0,canvas.width,canvas.height);

		this.drawBody(this.body.length);
	}


		

}



const newPet = new Pet(0,1,1,1);

//Timer function to run as long as app is running
//Increments hunger,boredom,sleepiness every x minutes
const timer = ()=>{
		setInterval(()=>{
			
			newPet.increaseHunger();
			newPet.increaseBoredom();
			newPet.increaseSleepiness();

			ageCounter += 1;


			if(ageCounter % 20 === 0){
				newPet.increaseAge();
			}


		},1000)
}
//Displays updates property values to screen
const printToScreen=(property,num)=>{
	if(property === 'hunger'){
		document.getElementById('hunger').innerText = 'Hunger: ' + num;
	}

	else if(property === 'sleepiness'){
		document.getElementById('sleepiness').innerText = 'Sleepiness: ' + num;
	}
	else if(property === 'boredom'){
		document.getElementById('boredom').innerText = 'Boredom: ' + num;
	}
	else if(property === 'age'){
		document.getElementById('age').innerText = 'Age: ' + num;
	}
	else{

		document.getElementById('hunger').innerText = 'Hunger: ' + newPet.hunger;
		document.getElementById('sleepiness').innerText = 'Sleepiness: ' + newPet.sleepiness;
		document.getElementById('boredom').innerText = 'Boredom: ' + newPet.boredom;
		document.getElementById('age').innerText = 'Age: ' + newPet.age;
	}
}
printToScreen();



const animateCanvas = ()=>{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		newPet.animation();
		newPet.drawBody(newPet.body.length);


		if(control === true){
			window.requestAnimationFrame(animateCanvas);
		}
	}







//Circles should be able to Move Accross screen 





