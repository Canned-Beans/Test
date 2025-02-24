document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Find the container div for the products
            const productContainer = document.querySelector('.row');
            
            // Loop through each product and create the HTML
            products.forEach(product => {
                // Create the outer div for the product
                const productDiv = document.createElement('div');
                productDiv.classList.add('col-4', 'col-6-medium', 'col-12-small');
                productDiv.style.cssText = 'flex: 1 1 calc(33.33% - 20px); box-sizing: border-box;';
                
                // Create the article and other elements
                const article = document.createElement('article');
                article.classList.add('box', 'post');
                
                const link = document.createElement('a');
                link.href = '#';
                link.classList.add('image', 'fit');
                
                const img = document.createElement('img');
                img.src = product.image || 'images/rollsmenu.jpg';  // fallback image if none is provided
                img.alt = product.name || 'Product Image';  // fallback alt text
                link.appendChild(img);
                
                const h3 = document.createElement('h3');
                h3.textContent = product.name;
                
                // Create the table with pricing info
                const tableWrapper = document.createElement('div');
                tableWrapper.classList.add('table-wrapper');
                
                const table = document.createElement('table');
                const tbody = document.createElement('tbody');
                
                product.prices.forEach(price => {
                    const tr = document.createElement('tr');
                    const td1 = document.createElement('td');
                    td1.textContent = price.size;
                    const td2 = document.createElement('td');
                    td2.textContent = `$${price.price}`;
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tbody.appendChild(tr);
                });
                
                table.appendChild(tbody);
                tableWrapper.appendChild(table);
                
                // Create the form
                const form = document.createElement('form');
                form.name = 'contact';
                form.action = 'https://formspree.io/f/mleqvqjn';
                form.method = 'POST';
                
                const inputName = document.createElement('input');
                inputName.type = 'text';
                inputName.name = 'name';
                inputName.id = 'name';
                inputName.placeholder = 'Name';
                inputName.required = true;
                
                const inputEmail = document.createElement('input');
                inputEmail.type = 'email';
                inputEmail.name = 'email';
                inputEmail.id = 'email';
                inputEmail.placeholder = 'Email or Phone';
                inputEmail.required = true;
                
                const selectCategory = document.createElement('select');
                selectCategory.name = 'category';
                selectCategory.id = 'category';
                selectCategory.required = true;
                
                const optionDefault = document.createElement('option');
                optionDefault.value = '';
                optionDefault.textContent = '- Choose Amount -';
                selectCategory.appendChild(optionDefault);
                
                product.prices.forEach(price => {
                    const option = document.createElement('option');
                    option.value = `${price.size} ${product.name}`;
                    option.textContent = price.size;
                    selectCategory.appendChild(option);
                });
                
                const inputAddress = document.createElement('input');
                inputAddress.type = 'text';
                inputAddress.name = 'address';
                inputAddress.id = 'address';
                inputAddress.placeholder = 'Delivery Address (If Applicable)';
                
                const textareaMessage = document.createElement('textarea');
                textareaMessage.name = 'message';
                textareaMessage.id = 'message';
                textareaMessage.placeholder = 'Add a message';
                textareaMessage.rows = 1;
                
                const ulActions = document.createElement('ul');
                ulActions.classList.add('actions');
                
                const liSubmit = document.createElement('li');
                const submitButton = document.createElement('input');
                submitButton.type = 'submit';
                submitButton.value = 'Submit Order';
                
                const moreInfoButton = document.createElement('input');
                moreInfoButton.type = 'button';
                moreInfoButton.value = 'More Info';
                moreInfoButton.onclick = () => window.location.href = `${product.name}.html`;
                
                liSubmit.appendChild(submitButton);
                liSubmit.appendChild(moreInfoButton);
                ulActions.appendChild(liSubmit);
                
                // Append everything together
                form.appendChild(inputName);
                form.appendChild(inputEmail);
                form.appendChild(selectCategory);
                form.appendChild(inputAddress);
                form.appendChild(textareaMessage);
                form.appendChild(ulActions);
                
                // Append to the article
                article.appendChild(link);
                article.appendChild(h3);
                article.appendChild(tableWrapper);
                article.appendChild(form);
                
                // Append the article to the div
                productDiv.appendChild(article);
                
                // Append the div to the container
                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error loading products:', error));
});
