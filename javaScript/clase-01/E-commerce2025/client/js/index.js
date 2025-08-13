const shopContent = document.getElementById("shopContent");

products.forEach((product) => {
  const productCard = document.createElement("div");

  productCard.innerHTML = `
    <img src="${product.img}" />
    <h2>${product.productName}</h2>
    <p>Precio: $${product.price}</p>
    <p>Cantidad: ${product.quantity} U.</p>
  `;
  shopContent.append(productCard);
});
