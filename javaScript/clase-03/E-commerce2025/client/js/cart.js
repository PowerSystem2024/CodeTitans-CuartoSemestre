const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");

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
      }
    });

    const btnIncrease = modalBody.querySelector(".quantity-btn-increase");
    btnIncrease.addEventListener("click", () => {
      product.quantity++;
      displayCart();
    });

    //Boton para eliminar un articulo del carrito
    const btnDelete = modalBody.querySelector(".delete-product");
    btnDelete.addEventListener("click", () => {
      const index = cart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        cart.splice(index, 1);
        displayCart();
      }
    });
  });
  //Modal Footer
  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `
    <div class="total-price">Total: ${cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )}</div>
  `;
  modalContainer.append(modalFooter);
};
//Cuando el usuario apriete este btn de va a disparar la funcion displayCart
cartBtn.addEventListener("click", displayCart);
