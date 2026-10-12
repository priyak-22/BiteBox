function calculateItemTotal(price, quantity){
    
    return price * quantity;
}

let cartRows = document.querySelectorAll(
    "#shopping-cart tbody tr"
);

function calculateSubtotal() {
    let subtotal = 0;
    let cartRows = document.querySelectorAll("#shopping-cart tbody tr" );

    cartRows.forEach(function(row) {
        let priceText =  row.children[1].textContent;
        let price = parseFloat(priceText.replace("₹", "")  );
        let quantityText = row.querySelector(".quantity-box span").textContent;
        let quantity = parseInt(quantityText);
        let itemTotal = calculateItemTotal(price, quantity);
        console.log(itemTotal);
        
        subtotal += itemTotal;
      
        
    });

    console.log(subtotal);
    
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


    console.log(subtotal);
    

    document.getElementById("subtotal-amount").textContent = "₹" + subtotal.toFixed(2);

    document.getElementById("delivery-amount").textContent = "₹" + deliveryCharges.toFixed(2);

    document.getElementById("packaging-amount").textContent = "₹" + packagingCharge.toFixed(2);

    document.getElementById("discount-amount").textContent = "₹" + discount.toFixed(2);

    document.getElementById("total-amount").textContent = "₹" + totalAmount.toFixed(2);
}

updateOrderSummary();