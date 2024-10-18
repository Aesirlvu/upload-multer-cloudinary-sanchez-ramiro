import "./style.css";

const $app = document.querySelector("#app");
$app.className = "flex items-center justify-center min-h-screen bg-gray-100";

const $formContainer = document.createElement("div");
$formContainer.className =
  "space-y-6 p-8 bg-white shadow-lg rounded-lg max-w-md w-full";

// Title
const $title = document.createElement("h1");
$title.textContent = "Upload New Product";
$title.className = "text-2xl font-bold text-center text-gray-700";

// Form
const $form = document.createElement("form");
$form.className = "space-y-4";

// Input for product name
const $nameInput = document.createElement("input");
$nameInput.name = "name";
$nameInput.type = "text";
$nameInput.placeholder = "Product Name";
$nameInput.className =
  "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500";

// Input for product description
const $descriptionInput = document.createElement("textarea");
$descriptionInput.name = "description";
$descriptionInput.placeholder = "Product Description";
$descriptionInput.className =
  "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500";

// Input for product price
const $priceInput = document.createElement("input");
$priceInput.name = "price";
$priceInput.type = "number";
$priceInput.placeholder = "Product Price";
$priceInput.className =
  "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500";

// Input for product image
const $input = document.createElement("input");
$input.name = "productImage"; // ! Aquí va el valor del fieldName de su servidor
$input.type = "file";
$input.accept = "image/*";
$input.className =
  "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500";

$input.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (readerEvent) => {
    let $img = document.querySelector("img");

    if (!$img) {
      $img = document.createElement("img");
      $img.className = "mt-4 rounded shadow-md";
    }

    $img.src = readerEvent.target.result;
    $img.style.width = "100%";
    $img.style.maxWidth = "512px";
    $app.appendChild($img);
  };

  reader.readAsDataURL(file);
});

const $button = document.createElement("button");
$button.textContent = "Accept";
$button.className =
  "w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

$form.appendChild($nameInput);
$form.appendChild($descriptionInput);
$form.appendChild($priceInput);
$form.appendChild($input);
$form.appendChild($button);

$formContainer.appendChild($title);
$formContainer.appendChild($form);

$app.appendChild($formContainer);

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch("http://localhost:3000", {
    // ! Ruta de su servidor en la que recibe el archivo
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchProducts();
    });
});

function fetchProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      const $productsContainer = document.createElement("div");
      $productsContainer.className = "mt-8 space-y-4";

      data.forEach((product) => {
        const $productCard = document.createElement("div");
        $productCard.className = "p-4 bg-white shadow rounded-lg";

        const $productName = document.createElement("h2");
        $productName.textContent = product.name;
        $productName.className = "text-lg font-bold text-gray-700";

        const $productDescription = document.createElement("p");
        $productDescription.textContent = product.description;
        $productDescription.className = "text-sm text-gray-600";

        const $productPrice = document.createElement("p");
        $productPrice.textContent = `$${product.price}`;
        $productPrice.className = "text-sm text-gray-600";

        const $productImage = document.createElement("img");
        $productImage.src = product.image;
        $productImage.className = "mt-4 rounded shadow-md";
        $productImage.style.width = "100%";
        $productImage.style.maxWidth = "512px";

        $productCard.appendChild($productName);
        $productCard.appendChild($productDescription);
        $productCard.appendChild($productPrice);
        $productCard.appendChild($productImage);

        $productsContainer.appendChild($productCard);
      });

      $app.appendChild($productsContainer);
    });
}

// Fetch and display products on page load
fetchProducts();
