// assets/js/generate.js

// Function to create the HTML for a single product
function createProductHTML(product) {
  // Generate the table rows for each option
  const optionsHTML = product.options
    .map(
      option => `<tr>
                  <td>${option.size}</td>
                  <td>${option.price}</td>
                </tr>`
    )
    .join('');

  // Generate the select options for the form
  let selectOptionsHTML = product.options
    .map(
      option =>
        `<option value="${option.size} ${product.name}">${option.size}</option>`
    )
    .join('');
  selectOptionsHTML += `<option value="Custom Order ${product.name}">Different Amount (Type Below)</option>`;

  // Return the complete HTML for the product
  return `
    <div class="col-4 col-6-medium col-12-small" style="flex: 1 1 calc(33.33% - 20px); box-sizing: border-box;">
      <article class="box post">
        <a href="#" class="image fit">
          <img src="${product.image}" alt="${product.name}">
        </a>
        <h3>${product.name}</h3>
        <div class="table-wrapper">
          <table>
            <tbody>
              ${optionsHTML}
            </tbody>
          </table>
        </div>
        <form name="contact" action="https://formspree.io/f/mleqvqjn" method="POST">
          <div class="col-6 col-12">
            <input type="text" name="name" placeholder="Name" required>
          </div>
          <br>
          <div class="col-6 col-12-large">
            <input type="email" name="email" placeholder="Email or Phone" required>
          </div>
          <br>
          <div class="col-6">
            <select name="category" required>
              <option value="">- Choose Amount -</option>
              ${selectOptionsHTML}
            </select>
          </div>
          <br>
          <div class="col-6 col-12-large">
            <input type="text" name="address" placeholder="Delivery Address (If Applicable)">
          </div>
          <br>
          <div class="col-12">
            <textarea name="message" placeholder="Add a message" rows="1"></textarea>
          </div>
          <br>
          <ul class="actions">
            <li>
              <input type="submit" value="Submit Order">
              <input type="button" value="More Info" onclick="window.location.href='${product.moreInfoLink}';">
            </li>
          </ul>
        </form>
      </article>
    </div>
  `;
}

// Fetch products from the JSON file and inject them into their respective sections
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      // Determine the target container ID based on the product's section
      // Assumes section names in JSON are like "Breads", "Pies", "Cookies", "Bars"
      const containerId = product.section.toLowerCase() + '-row';
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML += createProductHTML(product);
      }
    });
  })
  .catch(error => console.error('Error loading products:', error));
