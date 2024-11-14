     
    let cart = [];
    let cartCount = 0;

    // Function to handle adding books to the cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const bookTitle = this.getAttribute('data-title');
            const bookPrice = parseFloat(this.getAttribute('data-price'));
            const existingItem = cart.find(item => item.title === bookTitle);

            // If the book is already in the cart, increase the quantity
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ title: bookTitle, price: bookPrice, quantity: 1 });
            }

            // Update cart count badge
            cartCount++;
            document.getElementById('cart-count').textContent = cartCount;

            alert(`"${bookTitle}" added to cart`);
        });
    });

    // Function to render the cart items in the modal
    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;

                // Create HTML structure for each cart item
                const cartItem = document.createElement('div');
                cartItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');
                cartItem.innerHTML = `
                    <div>
                        <h6>${item.title}</h6>
                        <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
                    </div>
                    <div>
                        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
                        <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index}, -1)">-</button>
                        <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                `;

                cartItemsContainer.appendChild(cartItem);
            });
        }

        // Update the total price
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    }

    // Function to change the quantity of items
    function changeQuantity(index, delta) {
        if (cart[index].quantity + delta > 0) {
            cart[index].quantity += delta;
            cartCount += delta;
            document.getElementById('cart-count').textContent = cartCount;
            renderCart(); // Re-render the cart items
        }
    }

    // Function to remove an item from the cart
    document.getElementById('cart-items').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cartCount -= cart[index].quantity; // Decrease total item count
            cart.splice(index, 1); // Remove the item from cart
            document.getElementById('cart-count').textContent = cartCount;
            renderCart(); // Re-render the cart items
        }
    });

    // Checkout Button: clear cart and show "Order confirmed" message
    document.getElementById('checkout-button').addEventListener('click', function() {
        if (cart.length > 0) {
            // Display order confirmation message
            alert("Order confirmed");

            // Empty the cart
            cart = [];
            cartCount = 0;

            // Update cart count badge and re-render the cart
            document.getElementById('cart-count').textContent = cartCount;
            renderCart(); // Re-render the cart as empty
        } else {
            alert("Your cart is empty. Add some books before checking out.");
        }
    });

    // Show cart when the modal is opened
    document.querySelector('[data-bs-target="#cartModal"]').addEventListener('click', renderCart);






     // Event listener for book cards to open the modal
     document.querySelectorAll('.book-card').forEach(card => {
            card.addEventListener('click', function() {
                const bookTitle = this.getAttribute('data-title');
                const bookDescription = this.getAttribute('data-description');

                // Set the modal title and description
                document.getElementById('bookDetailsModalLabel').textContent = bookTitle;
                document.getElementById('book-description').textContent = bookDescription;

                // Open the modal
                const bookDetailsModal = new bootstrap.Modal(document.getElementById('bookDetailsModal'));
                bookDetailsModal.show();
            });
        });




// seacrh bar for scrolable section
        
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('searchInput');
        const searchForm = document.getElementById('searchForm');

        function scrollToSection(targetId) {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        document.querySelectorAll('.dropdown-item').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                scrollToSection(targetId);

                document.querySelectorAll('.dropdown-item').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            });
        });

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = searchInput.value.toLowerCase();

            if (query.includes('fiction')) {
                scrollToSection('fictionBooks');
            } else if (query.includes('non-fiction')) {
                scrollToSection('nonFictionBooks');
            } else if (query.includes('biography')) {
                scrollToSection('biography');
            } else if (query.includes('poetry')) {
                scrollToSection('poetry');
            } else if (query.includes('science') || query.includes('technology')) {
                scrollToSection('scienceTechnology');
            } else {
                alert('Section not found');
            }
        });
    });



    
      