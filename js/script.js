let restaurantName = "BiteBox";
alert("welcome to " + restaurantName + "!"); 

let customerName = prompt("Welcome to " + restaurantName + "\n\nWhat is your name?");

alert("Hello " + customerName + "\n\nWelcome to BiteBox.");

let exploreMenu = confirm("would you like to explore our menu?");

if(exploreMenu){
    alert("Great! Let's explore the BiteBox menu.");
}else{
    alert("No problem! You can explore the menu anytime.");
}

	
let choice = prompt( "Choose a BiteBox category:\n" +
    "1. Pizza\n" +
    "2. Burgers\n" +
    "3. Pasta\n" +
    "4. Desserts"
);

switch(choice){
    case "1":
        alert("You selected pizza!");
        break;
    case "2":
        alert("You selected burger!");
        break;
    case "3":
        alert("You selected pasta");
        break;
    case "4":
        alert("You selected desserts!");
        break;
    default:
        alert("Invalid selection");
}

let item = parseInt(prompt('enter food items:'));
for(let i=1; i<=item; i++){
    let food = prompt("enter food item");
    let quantity= prompt("enter quantity for "+food);
    console.log(food + " - Quantity: "+quantity);
}