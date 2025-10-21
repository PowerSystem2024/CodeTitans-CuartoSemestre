const shopContent = document.getElementById("shopContent");
const cart = [];

products.forEach((product) => {
  const productCard = document.createElement("div");

  productCard.innerHTML = `
    <img src="${product.img}" />
    <h2>${product.productName}</h2>
    <p>Precio: $${product.price}</p>
    <p>Cantidad: ${product.quantity} U.</p>
  `;
  shopContent.append(productCard);

  const buyButton = document.createElement("button");
  buyButton.innerText = "Comprar";

  productCard.append(buyButton);

  buyButton.addEventListener("click", () => {
    cart.push({
      id: product.id,
      name: product.productName,
      price: product.price,
      img: product.img,
      quantity: 1,
    });
    console.log(cart);
  });
});
