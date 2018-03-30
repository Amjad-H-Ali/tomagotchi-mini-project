let ageCounter = 0;

let stepsOfX = 1;

let stepsOfY = 1;

let control = true;

let lights = true;

let timeControl = true;

//Make Canvas for pet


const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

let af; // we will use this to stop the animation frame if pet dies



//Prompt to name Pet
//User Should Be Able to Name Pet with Prompt, if named, button removes for good
//Name Displays On screen
document.getElementById('nameBtn').addEventListener('click',function(e){

	const nameBox = document.getElementById('name')

	this.remove();
	
	newPet.name = nameBox.value;

	document.getElementById('nameHeader').innerHTML = 'Your Pet Name: ' + newPet.name;

	nameBox.remove();

	newPet.drawBody(newPet.body.length);


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
			x:200,
			y:50,
			r:5,
			e:0,
			//body should start with three circles
			length:10


			}
		

		
	}//Age increments every x minutes
	increaseAge(){

		this.age += 1;
		this.increaseSize();
		tomagotchi.printToScreen('age',this.age);

	}//Pet gets hungry
	increaseHunger(){
		this.hunger += 1;
		this.makeSmaller();
		console.log('Hunger Works');
		tomagotchi.printToScreen('hunger',this.hunger);
	}//Pet gets sleepy
	increaseSleepiness(){
		
		this.sleepiness +=1;	
		
		console.log('Sleepiness Works');
		tomagotchi.printToScreen('sleepiness',this.sleepiness);
	}//Pet Gets Bored
	increaseBoredom(){
		this.boredom += 1;
		console.log('Boredom works');
		tomagotchi.printToScreen('boredom',this.boredom);

	}//Button to feed
	resetHunger(){
		control=false;
		this.hunger -= 1;
		this.morphs();
		aFood.generateFood()
		tomagotchi.printToScreen('hunger',this.hunger);

	}//Button to turn off Lights
	resetSleepiness(){

		this.sleepiness = 1;

		tomagotchi.printToScreen('sleepiness',this.sleepiness);
		
		lights == true ? (canvas.style.backgroundColor='black',lights = false, control = false,timeControl=false) : (canvas.style.backgroundColor='rgb(250,250,200)',lights = true, control=true,timeControl=true,this.drawBody(this.body.length));

		

	}

	resetBoredom(){
		control=true;
		timeControl=true;
		animateCanvas()
		this.boredom -= 1;
		tomagotchi.printToScreen('boredom',this.boredom);
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
	die(){ console.log("die") 


		control = false; 
		
		ctx.font = "50px Arial";
		ctx.fillStyle = 'white';
		ctx.clearRect(0,0,canvas.width,canvas.height);

		ctx.fillText("Your Pet Died",50,225); 
		ctx.closePath();
		canvas.style.backgroundColor = 'rgb(255,0,0)';
		

		

	}
	drawBody(num){
		for(let i = 0; i < num; i ++){
			ctx.beginPath();
			ctx.arc(this.body.x + (i*this.body.r),this.body.y + (i*this.body.r),this.body.r ,this.body.e , Math.PI * 2);
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




const tomagotchi = {

	//Timer function to run as long as app is running
	//Increments hunger,boredom,sleepiness every x minutes
		
		timer(){	
			 const theTime = setInterval(()=>{ 

				if(ageCounter % 2 === 0 ){
					newPet.increaseAge();
				}

				if(newPet.hunger >= 10 || newPet.sleepiness >= 10 || newPet.boredom >= 10 || newPet.age >= 5){
					// cancelAnimationFrame(af)
					newPet.die(); 
					clearInterval(theTime);
					
				}else{
					newPet.increaseHunger();
					newPet.increaseBoredom();
					newPet.increaseSleepiness();
				}

				ageCounter += 1;



				console.log('t');
			},1000)
		},

		//Displays updates property values to screen
		printToScreen(property,num){
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
			else {

				document.getElementById('hunger').innerText = 'Hunger: ' + newPet.hunger;
				document.getElementById('sleepiness').innerText = 'Sleepiness: ' + newPet.sleepiness;
				document.getElementById('boredom').innerText = 'Boredom: ' + newPet.boredom;
				document.getElementById('age').innerText = 'Age: ' + newPet.age;
			}
		}

}		



class Food {
	constructor(){
		this.x = Math.floor(Math.random() * canvas.width-30);
		this.y = Math.floor(Math.random() * canvas.height-30);
		this.height = 10;
		this.width = 10;
	}

}

class FoodFactory {
	constructor(){
		this.foods =[];
	}
	generateFood(){
		if(this.foods.length === 1){
			ctx.clearRect(this.foods[0].x, this.foods[0].y, 10, 10);
		}	
		this.foods = [];
			
		const newFood = new Food();
			
		this.foods.push(newFood);

		ctx.beginPath();
		ctx.rect(this.foods[0].x,this.foods[0].y,10,10);
		ctx.fillStyle = 'brown';
		ctx.fill();
	

	}
	
}


const aFood = new FoodFactory();







 const  animateCanvas = () => { console.log("animateCanvas")

	


 	if(control ===true ){ctx.clearRect(0,0,canvas.width,canvas.height);
	newPet.animation();
	newPet.drawBody(newPet.body.length);
 		window.requestAnimationFrame(animateCanvas);
 	}

 	
	// ctx.clearRect(0,0,canvas.width,canvas.height);
	// if(control === true){
	
	// 	newPet.animation();
	// 	newPet.drawBody(newPet.body.length);


	// 	af = window.requestAnimationFrame(animateCanvas);
	// } else {
	// 	ctx.clearRect(0,0,canvas.width,canvas.height);
	// }
	
}



// timeControl === true ? tomagotchi.timer() : clearInterval(tomagotchi.theTime)



tomagotchi.printToScreen();

// tomagotchi.timer()






