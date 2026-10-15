function calculateItemTotal(price, quantity){
    
    return price * quantity;
}

let cartRows = document.querySelectorAll(
    "#shopping-cart tbody tr"
);

let cart =
    JSON.parse(
      
        localStorage.getItem("biteboxCart")
      
    ) || [];

    
function calculateSubtotal() {

    let subtotal = 0;

    cart.forEach(function (item) {

        let itemTotal =
            calculateItemTotal(
                item.price,
                item.quantity
            );

        subtotal += itemTotal;

    });

    return subtotal;
}

function calculateDeliveryCharge(subtotal){
    if (subtotal ===0){
        return 0;
    }
    else if(subtotal >0 && subtotal <=499){
        return 40;
    }
    else if(subtotal>500 && subtotal<=699){
        return 30;
    }
    else if(subtotal>700 && subtotal<=999){
        return 30;
    }
    else{
        return 0;
    }
    
}

	
function calculatePackagingCharge(subtotal) {
    if (subtotal === 0) {
        return 0;
    }
  
    return 20;
}

function calculateDiscount(subtotal){
     
    if (subtotal==0){
        return 0;
    }
    else if (subtotal > 599 && subtotal<=799){
        return subtotal * 0.10;
    }
    else if (subtotal > 799 && subtotal<=999){
        return subtotal * 0.15;
    }
    else if (subtotal >=1000){
        return subtotal * 0.25;
    }
}

function calculateTotal(subtotal, deliveryCharges, packagingCharge, discount){
    return subtotal + deliveryCharges + packagingCharge -discount;
}

function updateOrderSummary(){
    

    let subtotalElement = document.getElementById("subtotal-amount");
    if(!subtotalElement){
        return;
    }

    let subtotal= calculateSubtotal();
    let deliveryCharges = calculateDeliveryCharge(subtotal);
    let packagingCharge = calculatePackagingCharge(subtotal);
    let discount = calculateDiscount(subtotal);
    let totalAmount = calculateTotal(subtotal, deliveryCharges, packagingCharge, discount);
    

    document.getElementById("subtotal-amount").textContent = "₹" + subtotal.toFixed(2);

    document.getElementById("delivery-amount").textContent = "₹" + deliveryCharges.toFixed(2);

    document.getElementById("packaging-amount").textContent = "₹" + packagingCharge.toFixed(2);

    document.getElementById("discount-amount").textContent = "₹" + discount.toFixed(2);

    document.getElementById("total-amount").textContent = "₹" + totalAmount.toFixed(2);
}

updateOrderSummary();


let menuContainer = document.getElementById("menu-items");

if (menuContainer){
    menuContainer.addEventListener("click", function(event){
        let button = event.target.closest("button");
        if(!button){
            return;
        }
        if(button.textContent.includes("Add to Cart")){
            let card = button.closest("article");
            addToCart(card);
        }

    });
}

function addToCart(card){
    let name=card.querySelector("h3").textContent.trim();
    let priceText=card.querySelector(".price").textContent;
    let price = parseFloat( priceText.replace("₹", ""));
    let image=card.querySelector("img").getAttribute("src");

    let carItem={
        name: name,
        price: price,
        image:image,
        quantity:1
    }
    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Image:", image);
    let existingItem = cart.find(function(item){
        return item.name===name;
    });

    if(existingItem){
        existingItem.quantity++;
    }else{
        cart.push(carItem);
    }
    localStorage.setItem("biteboxCart",JSON.stringify(cart));
}


localStorage.setItem("biteboxCart",JSON.stringify(cart));
let cartBody = document.querySelector("#shopping-cart tbody");

function renderCart(){
    if (!cartBody){
        return;
    }
    cartBody.innerHTML = "";

     if (cart.length === 0) {

        let row = document.createElement("tr");


        row.innerHTML = `

            <td colspan="5">

                <div class="empty-cart">

                    <h3> Your Cart is Empty</h3>

                    <p>
                        Add some delicious food
                        from our Menu!
                    </p>
                    </div>

            </td>

        `;


        cartBody.appendChild(row);

        return;

    }


    // cart.forEach() comes here

    cart.forEach(function(item, index){
        let itemTotal = item.price * item.quantity;
        let row = document.createElement("tr");
          row.innerHTML = `
    
            <td>
    
                <div class="cart-item">
    
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >
    
                    <div>
    
                        <h3>
                            ${item.name}
                        </h3>
    
                    </div>
    
                </div>
    
            </td>
    
            <td>
                ₹${item.price}
            </td>
              <td>
    
                <div class="quantity-box">
    
                    <button
                        class="decrease"
                        data-index="${index}">
                        −
                    </button>
    
                    <span>
                        ${item.quantity}
                    </span>
    
                    <button
                        class="increase"
                        data-index="${index}">
                        +
                    </button>
    
                </div>
    
            </td>
    
    
            <td>
                ₹${itemTotal.toFixed(2)}
            </td>
     <td>
    
    <a href="#" class="remove-item" data-index="${index}">
    
    <img src="assets/icon/delete.gif" alt="Delete" width="25">
    
    </a>
    
            </td>
    
        `;
    
    
    
        cartBody.appendChild(row);
    
    });
}

console.log("Cart:", cart);
renderCart();

