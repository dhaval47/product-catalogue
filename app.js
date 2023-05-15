const filterButton = document.querySelector('#filter-button');
const keywordsInput = document.querySelector('#keywords');
const featuredProductsContainer = document.querySelector('.featured-products');
let currentPage = 1;

function fetchAndGenerateProducts() {
    const keywords = keywordsInput.value.trim().toLowerCase();

    fetch('products-data.json')
        .then(response => response.json())
        .then(products => {
            // Filter the products by keywords
            const filteredProducts = products.filter(product => {
                return (
                    product.name.toLowerCase().includes(keywords)
                );
            });

            // Calculate the total number of pages
            const totalPages = Math.ceil(filteredProducts.length / 8);

            // Generate and append the elements for the selected page of products
            generateProductElement(filteredProducts, currentPage);

            // Add pagination buttons
            const paginationContainer = document.getElementById("pagination");
            paginationContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.className = 'mx-2 px-2 py-1 bg-indigo-500 text-white rounded';
                button.textContent = i;
                button.addEventListener('click', () => {
                    // Clear the featured products container
                    featuredProductsContainer.innerHTML = '';

                    // Generate and append the elements for the selected page of products
                    currentPage = i;
                    generateProductElement(filteredProducts, currentPage);
                });
                paginationContainer.appendChild(button);
            }
            // featuredProductsContainer.parentNode.insertBefore(paginationContainer, featuredProductsContainer.nextSibling);
        });
}

// Generate the elements for all products on page load
fetchAndGenerateProducts();

// Handle filter button click event
filterButton.addEventListener('click', event => {
    event.preventDefault();

    // Clear the featured products container
    featuredProductsContainer.innerHTML = '';

    // Fetch and generate the products based on the filter keywords
    fetchAndGenerateProducts();
});

// Handle keywords input event
keywordsInput.addEventListener("keyup", (event) => {
    // Clear the featured products container
    featuredProductsContainer.innerHTML = '';

    // Fetch and generate the products based on the filter keywords
    fetchAndGenerateProducts();
});


function generateProductElement(products, page) {
    // Determine the index range for products on this page
    const startIndex = (page - 1) * 8;
    const endIndex = page * 8;
    featuredProductsContainer.innerHTML = '';
    // Create the elements for the products on this page
    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];
        // Create the elements for the product
        const productsElement = document.createElement('a');
        productsElement.className = "group relative";
        const imageWrapElement = document.createElement('div');
        imageWrapElement.className = "aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7";
        const imageElement = document.createElement('img');
        imageElement.className = "h-full w-full object-cover object-center group-hover:opacity-75";
        const nameElement = document.createElement('h3');
        nameElement.className = "mt-4 text-lg text-gray-900 font-semibold";
        const shortDescriptionElement = document.createElement('p');
        shortDescriptionElement.className = "italic text-gray-500 text-sm"
        const priceElement = document.createElement('p');
        priceElement.className = "mt-1 text-base text-gray-900 font-medium";


        // Set the content and attributes of the elements
        productsElement.href = product.product_url;
        imageElement.src = product.images[0];
        nameElement.textContent = product.name;
        shortDescriptionElement.textContent = product.short_description;
        priceElement.textContent = product.regular_price + " \u20AC";

        // Append the elements to the products element
        productsElement.appendChild(imageWrapElement);
        imageWrapElement.appendChild(imageElement);
        productsElement.appendChild(nameElement);
        productsElement.appendChild(shortDescriptionElement);
        productsElement.appendChild(priceElement);
        // Append the elements to the featured products container
        featuredProductsContainer.appendChild(productsElement);
    }
}