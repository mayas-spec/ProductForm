const form = document.getElementById("productForm");
const productsContainer = document.getElementById("productsContainer");
const messageContainer = document.getElementById("message-container");

// Store products in memory
let products = [];

function showMessage(text, type) {
  messageContainer.innerHTML = `<div class="message ${type}">${text}</div>`;
  const messageEl = messageContainer.querySelector(".message");

  // Remove message after 4 seconds
  setTimeout(() => {
    if (messageEl) {
      messageEl.classList.remove("show");
      setTimeout(() => {
        messageContainer.innerHTML = "";
      }, 300);
    }
  }, 4000);
}

function validateForm(formData) {
  const requiredFields = ["name", "description", "imageUrl", "price", "brand"];
  const emptyFields = [];

  for (const field of requiredFields) {
    if (!formData.get(field) || formData.get(field).trim() === "") {
      emptyFields.push(field);
    }
  }
  return emptyFields;
}

function createProductCard(product, index) {
  return `<div class="product-card" style="animation-delay: ${index * 0.1}s">
        <img src="${product.imageUrl}" alt="${
    product.name
  }" class="product-image" 
        onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjdGQUZDIi8+CjxwYXRoIGQ9Ik03NSA3NUgxMjVWMTI1SDc1Vjc1WiIgZmlsbD0iI0NEREZFOCIvPgo8cGF0aCBkPSJNODcuNSA5M0w5My43NSA5OS4yNUwxMTIuNSA4MC41IiBzdHJva2U9IiM2Qjc1ODQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3NTg0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K'">
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description}</div>
        <div class="product-info">
        <div class="product-price">$${parseFloat(product.price).toFixed(
          2
        )}</div>
        <div class="product-brand">${product.brand}</div>
        </div>
        </div>
            `;
}

function updateProductsDisplay() {
  if (products.length === 0) {
    productsContainer.innerHTML = `
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V17C19 18.1 18.1 19 17 19H7C5.9 19 5 18.1 5 17V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V17H17V6H7Z"/>
                        </svg>
                        <p>No products added yet. Use the form to add your first product!</p>
                    </div>
                `;
  } else {
    productsContainer.innerHTML = products
      .map((product, index) => createProductCard(product, index))
      .join("");

    // Trigger animations
    setTimeout(() => {
      document.querySelectorAll(".product-card").forEach((card) => {
        card.classList.add("show");
      });
    }, 50);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const emptyFields = validateForm(formData);

  if (emptyFields.length > 0) {
    const fieldNames = emptyFields.map((field) => {
      switch (field) {
        case "imageUrl":
          return "Image URL";
        default:
          return field.charAt(0).toUpperCase() + field.slice(1);
      }
    });
    showMessage(`Please fill in all fields: ${fieldNames.join(", ")}`, "error");
    return;
  }

  // Create product object
  const product = {
    name: formData.get("name").trim(),
    description: formData.get("description").trim(),
    imageUrl: formData.get("imageUrl").trim(),
    price: formData.get("price"),
    brand: formData.get("brand").trim(),
  };

  // Add to products array
  products.push(product);

  // Update display
  updateProductsDisplay();

  // Clear form
  form.reset();

  // Show success message
  showMessage("Product added successfully!", "success");
});

// Initialize display
updateProductsDisplay();
