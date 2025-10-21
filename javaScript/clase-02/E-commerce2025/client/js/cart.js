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
};

//Cuando el usuario apriete este btn de va a disparar la funcion displayCart
cartBtn.addEventListener("click", displayCart);
