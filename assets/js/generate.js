document.addEventListener("DOMContentLoaded", () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => populateMenu(data))
        .catch(error => console.error('Error fetching products:', error));
});

function populateMenu(products) {
    const menuContainer = document.getElementById('menu-container');
    const sections = {};

    products.forEach(product => {
        if (!sections[product.section]) {
            sections[product.section] = [];
        }
        sections[product.section].push(product);
    });

    Object.keys(sections).forEach(section => {
        const sectionHeader = document.createElement('header');
        sectionHeader.classList.add('major');
        sectionHeader.innerHTML = `<h2>${section}</h2>`;

        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('row');

        sections[section].forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('col-4', 'col-6-medium', 'col-12-small');
            productDiv.style.flex = '1 1 calc(33.33% - 20px)';
            productDiv.style.boxSizing = 'border-box';

            productDiv.innerHTML = `
                <article class="box post">
                    <a href="#" class="image fit">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                    <h3>${product.name}</h3>
                    <div class="table-wrapper">
                        <table>
                            <tbody>
                                ${product.options.map(option => `
                                    <tr>
                                        <td>${option.size}</td>
                                        <td>${option.price}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <form name="contact" action="https://formspree.io/f/mleqvqjn" method="POST">
                        <div class="col-6 col-12">
                            <input type="text" name="name" id="name" value="" placeholder="Name" required>
                        </div>
                        <br>
                        <div class="col-6 col-12-large">
                            <input type="email" name="email" id="email" value="" placeholder="Email or Phone" required>
                        </div>
                        <br>
                        <div class="col-6">
                            <select name="category" id="category" required>
                                <option value="">- Choose Amount -</option>
                                ${product.options.map(option => `
                                    <option value="${option.size}">${option.size}</option>
                                `).join('')}
                                <option value="Custom Order ${product.name}">Different Amount (Type Below)</option>
                            </select>
                        </div>
                        ${product.glazeOptions ? `
                        <br>
                        <div class="col-6">
                            <select name="glaze" id="glaze" required>
                                <option value="">- Glaze -</option>
                                ${product.glazeOptions.map(glaze => `
                                    <option value="${glaze}">${glaze}</option>
                                `).join('')}
                            </select>
                        </div>
                        ` : ''}
                        ${product.frostingOptions ? `
                        <br>
                        <div class="col-6">
                            <select name="frosting" id="frosting" required>
                                <option value="">- Frosting -</option>
                                ${product.frostingOptions.map(frosting => `
                                    <option value="${frosting}">${frosting}</option>
                                `).join('')}
                            </select>
                        </div>
                        ` : ''}
                        <br>
                        <div class="col-6 col-12-large">
                            <input type="text"  name="address" id="address" value="" placeholder="Delivery Address (If Applicable)">
                        </div>
                        <br>
                        <div class="col-12">
                            <textarea name="message" id="message" placeholder="Add a message" rows="1"></textarea>
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
            `;
            sectionDiv.appendChild(productDiv);
        });

        menuContainer.appendChild(sectionHeader);
        menuContainer.appendChild(sectionDiv);
    });
}
