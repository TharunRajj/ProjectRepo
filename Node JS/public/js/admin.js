const deleteProduct = (btn) => {
  const productId = btn.parentNode.querySelector("[name=productId]").value;
  const csrfToken = btn.parentNode.querySelector("[name=_csrf]").value;
  const productElement = btn.closest("article");

  fetch("/admin/product/" + productId, {
    method: "DELETE",
    headers: {
      "csrf-token": csrfToken,
    },
  })
    .then((result) => {
        return result.json();
      console.log(result);
    }).then((data)=>{
        productElement.parentNode.removeChild(productElement);// or
        // productElement.remove(productElement) //Not working in internet explorer browser
    })
    .catch((err) => console.log(err));
};
