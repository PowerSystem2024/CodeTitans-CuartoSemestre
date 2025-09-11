const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
  //limpiar el contenido anterior del modal
  modalContainer.innerHTML = "";

  //Mostrar el modal y el overlay
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  //Modal Header
  const modalHeader = document.createElement("div");

  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  //Cerrar el modal al hacer click en la "X"
  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Carrito";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);

  modalContainer.append(modalHeader);

  //Modal Body
  if (cart.length > 0) {
    cart.forEach((product) => {
      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";
      modalBody.innerHTML = `
    <div class="product">
      <img class="product-img" src="${product.img}" />
      <div class="product-info">
        <h4>${product.productName}</h4>
      </div>
      
      <div class="quantity">
        <span class="quantity-btn-decrease">-</span>
        <span class="quantity-input">${product.quantity}</span>
        <span class="quantity-btn-increase">+</span>
      </div>
      <div class="price">${product.price * product.quantity}</div>
      <div class="delete-product">❌</div>

      </div>
    `;
      modalContainer.append(modalBody);
      //Boton para restar y sumar articulos al carrito
      const btnDecrease = modalBody.querySelector(".quantity-btn-decrease");
      btnDecrease.addEventListener("click", () => {
        if (product.quantity > 1) {
          product.quantity--;
          displayCart();
          displayCartCounter();
        }
      });

      const btnIncrease = modalBody.querySelector(".quantity-btn-increase");
      btnIncrease.addEventListener("click", () => {
        product.quantity++;
        displayCart();
        displayCartCounter();
      });

      //Boton para eliminar un articulo del carrito
      const btnDelete = modalBody.querySelector(".delete-product");
      btnDelete.addEventListener("click", () => {
        const index = cart.findIndex((item) => item.id === product.id);
        if (index !== -1) {
          cart.splice(index, 1);
          displayCart();
          displayCartCounter();
        }
      });
    });
    //Modal Footer
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    modalFooter.innerHTML = `
      <div class="total-price">Total: ${total}</div>
      <button id="pay-btn" class="pay-btn">Pagar</button>
      <div id="button-checkout"></div>
    `;
    modalContainer.append(modalFooter);

    // Lógica para el botón de pago usando el SDK de MercadoPago
    const payBtn = modalFooter.querySelector("#pay-btn");
    payBtn.addEventListener("click", async () => {
      if (cart.length === 0) return;
      const product = cart[0];
      try {
        const response = await fetch(
          "http://localhost:3001/create_preference",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: product.productName,
              quantity: product.quantity,
              price: product.price,
            }),
          }
        );
        const data = await response.json();
        if (data.id) {
          //Ocultar el boton de pagar original
          payBtn.style.display = "none";
          // SDK de MercadoPago para mostrar el botón oficial
          if (window.MercadoPago) {
            const mp = new window.MercadoPago(
              "APP_USR-dc4eddac-dbfc-44f3-a558-78b9c5c3af58",
              {
                locale: "es-AR",
              }
            );
            mp.checkout({
              preference: {
                id: data.id,
              },
              render: {
                container: "#button-checkout",
                label: "Pagar con MercadoPago",
              },
            });
          } else {
            console.error("No se encontró el SDK de MercadoPago.");
          }
        } else {
          alert("Error al iniciar el pago");
        }
      } catch (error) {
        alert("Error de conexión con el servidor");
      }
    });
  } else {
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerText = "No hay productos en el carrito";
    modalContainer.append(modalText);
  }
};
//Cuando el usuario apriete este btn de va a disparar la funcion displayCart
cartBtn.addEventListener("click", displayCart);

//Actualizar el contador del carrito
const displayCartCounter = () => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (totalItems > 0) {
    cartCounter.innerText = totalItems;
    cartCounter.style.display = "flex";
  } else {
    cartCounter.style.display = "none";
  }
};
