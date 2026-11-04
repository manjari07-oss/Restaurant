let cart = [];

let total = 0;


function addToCart(item, price) {

    cart.push({ item, price });

    total += price;

    updateCart();

    console.log("Added:", item, price);
    console.log(cart);
}


function updateCart() {

    let list = document.getElementById("cartItems");

    list.innerHTML = "";

    cart.forEach((data) => {

        let li = document.createElement("li");

        li.innerText = data.item + " - ₹" + data.price;

        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}


function placeOrder() {

    if (cart.length === 0) {

        alert("Cart is empty!");

    } else {

        let orderTotal = total;

        let choice = confirm(
            "Order Total = ₹" + orderTotal +
            "\n\nClick OK for Online Payment" +
            "\nClick Cancel for Cash on Delivery"
        );

        if (choice) {

            openQR(orderTotal);

        } else {

            let deliveryCharge = 30;

            let finalTotal = orderTotal + deliveryCharge;

            alert(
                "Cash on Delivery Selected!\n\n" +
                "Food Total: ₹" + orderTotal +
                "\nDelivery Charge: ₹" + deliveryCharge +
                "\n----------------------\n" +
                "Final Total: ₹" + finalTotal
            );

            cart = [];
            total = 0;

            updateCart();
        }
    }
}


function openQR(amount) {

    document.getElementById("qrAmount").innerText =
        "Amount to Pay: ₹" + amount;

    document.getElementById("qrPopup").style.display = "flex";
}


function closeQR() {

    document.getElementById("qrPopup").style.display = "none";
}


function paymentDone() {

    alert("Payment Successful!\nThank you for ordering from Spice Garden ❤️");

    closeQR();

    cart = [];
    total = 0;

    updateCart();
}
        let choice = confirm(
            "Order placed! Total = ₹" + total + 
           "\n\nClick OK for Online Payment" +
            "\nClick Cancel for Cash on Delivery"
        );

        if (choice) {
            alert("Redirecting to Online Payment...");
            // ONLINE PAYMENT
            openQR(orderTotal);

            // window.location.href = "payment.html";

        } else {
// CASH ON DELIVERY
            let deliveryCharge = 30;
            let finalTotal = orderTotal + deliveryCharge;
        }

        alert(
                "Cash on Delivery Selected!\n\n" +
                "Food Total: ₹" + orderTotal +
                "\nDelivery Charge: ₹" + deliveryCharge +
                "\n----------------------\n" +
                "Final Total: ₹" + finalTotal
            );

      // Clear car
        cart = [];
        total = 0;
        updateCart();
    



function onlinePay() {
    let qrBox = document.createElement("div");

    qrBox.innerHTML = `
        <div style="
            position: fixed;
            top:0; left:0;
            width:100%; height:100%;
            background: rgba(0,0,0,0.7);
            display:flex;
            justify-content:center;
            align-items:center;
        ">
            <div style="
                background:white;
                padding:20px;
                text-align:center;
                border-radius:10px;
            ">
                <h2>Scan & Pay</h2>
                <p>Amount: ₹${total}</p>

                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=yourupi@bank&am=${total}"
                     width="200">

                <br><br>

                <button onclick="paymentDone()" style="padding:10px;">
                    I Have Paid
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(qrBox);
}

function paymentDone() {
    alert("Redirecting to payment confirmation...");

    setTimeout(() => {
        alert("Payment Successful 🎉 Order Confirmed!");

        cart = [];
        total = 0;
        updateCart();

        let popup = document.getElementById("qrPopup");
        if (popup) popup.remove();
    }, 1000);
}