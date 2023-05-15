const filterButton = document.querySelector('#filter-button');
const keywordsInput = document.querySelector('#keywords');
const featuredProductsContainer = document.querySelector('.featured-products');

// Fetch the JSON data and generate the elements for all products
fetch('products-data.json')
    .then(response => response.json())
    .then(products => {
        products.forEach(generateProductElement);
    });

filterButton.addEventListener('click', event => {
    event.preventDefault();

    const keywords = keywordsInput.value.trim().toLowerCase();

    // Clear the featured products container
    featuredProductsContainer.innerHTML = '';

    fetch('products-data.json')
        .then(response => response.json())
        .then(products => {
            // Filter the products by keywords
            const filteredProducts = products.filter(product => {
                return (
                    product.name.toLowerCase().includes(keywords)
                );
            });

            // Generate and append the elements for the filtered products
            filteredProducts.forEach(generateProductElement);
        });
});

keywordsInput.addEventListener("keyup", (event) => {
    const keywords = event.target.value.trim().toLowerCase();

    // Clear the featured products container
    featuredProductsContainer.innerHTML = '';

    fetch('products-data.json')
        .then(response => response.json())
        .then(products => {
            // Filter the products by keywords
            const filteredProducts = products.filter(product => {
                return (
                    product.name.toLowerCase().includes(keywords)
                );
            });

            // Generate and append the elements for the filtered products
            filteredProducts.forEach(generateProductElement);
        });
});

function generateProductElement(products) {
    // Create the elements for the products
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
    productsElement.href = products.product_url;
    imageElement.src = products.images[0];
    nameElement.textContent = products.name;
    shortDescriptionElement.textContent = products.short_description;
    priceElement.textContent = products.regular_price + " \u20AC";

    // Append the elements to the products element
    productsElement.appendChild(imageWrapElement);
    imageWrapElement.appendChild(imageElement);
    productsElement.appendChild(nameElement);
    productsElement.appendChild(shortDescriptionElement);
    productsElement.appendChild(priceElement);

    // Append the product element to the featured products container
    featuredProductsContainer.appendChild(productsElement);
}
