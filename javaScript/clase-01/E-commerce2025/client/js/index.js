const shopContent = document.getElementById("shopContent");

products.forEach((product) => {
  const productCard = document.createElement("div");

  productCard.innerHTML = `
    <img src="${product.img}" />
    <h2>${product.productName}</h2>
    <p>Price: $${product.price}</p>
    <p>Quantity: ${product.quantity}</p>
  `;
  shopContent.append(productCard);
});
