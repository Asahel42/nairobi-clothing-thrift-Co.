document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     GLOBAL CART FUNCTIONALITY
  ========================================================= */
  let cartCount = 0;
  const cartDisplay = document.getElementById("cart-count");

  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      cartCount++;
      if (cartDisplay) cartDisplay.textContent = cartCount;

      btn.textContent = "Added ✓";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.disabled = false;
      }, 1200);
    });
  });

  /* =========================================================
  Read more Toggle Menu
  ========================================================= */
  function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("open");
  document.getElementById("navLinks").classList.toggle("open");
  
}
 
    
/*Close menu when a link is clicked (for mobile)*/
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});

/*Top Sales Section*/
// Product Data
const products = [
    {
        id: 1,
        title: "Men Shirt 100% Cotton Oxford",
        description: "Striped Shirt",
        price: "$29.76",
        originalPrice: "$39.99",
        brand: "Outdoor",
        category: ["top-deals", "rating"],
        image: "images/oxford-striped-shirt.png",
        badge: "TOP DEAL",
        badgeType: "top-deal",
        rating: 4.5,
        isWishlist: false
    },
    {
        id: 2,
        title: "Vintage Perim Jacket",
        description: "Classic vintage style",
        price: "$41.99",
        originalPrice: "$59.99",
        brand: "Calvin Klein",
        category: ["new", "top-deals"],
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "NEW",
        badgeType: "new",
        rating: 4.8,
        isWishlist: false
    },
    {
        id: 3,
        title: "Graphic T-Shirt",
        description: "Retro / Band Tee",
        price: "$24.99",
        originalPrice: "$34.99",
        brand: "Boss",
        category: ["new"],
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "NEW",
        badgeType: "new",
        rating: 4.3,
        isWishlist: false
    },
    {
        id: 4,
        title: "Tidoor Waterproof Short Sleeve",
        description: "Index Shirt",
        price: "$30.00",
        originalPrice: "$45.00",
        brand: "Spandex",
        category: ["top-deals"],
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "TOP DEAL",
        badgeType: "top-deal",
        rating: 4.7,
        isWishlist: false
    },
    {
        id: 5,
        title: "Flannel Plaid Shirt",
        description: "Classic winter shirt",
        price: "$19.33",
        originalPrice: "$29.99",
        brand: "Gucci",
        category: ["rating", "top-deals"],
        image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "TOP DEAL",
        badgeType: "top-deal",
        rating: 4.9,
        isWishlist: false
    },
    {
        id: 6,
        title: "Corduroy Button-Up Shirt",
        description: "Classic corduroy material",
        price: "$14.59",
        originalPrice: "$24.99",
        brand: "30 Fashions",
        category: ["rating"],
        image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: null,
        badgeType: null,
        rating: 4.2,
        isWishlist: false
    },
    {
        id: 7,
        title: "Denim Jacket Vintage",
        description: "Light wash denim",
        price: "$45.99",
        originalPrice: "$65.00",
        brand: "Levi's",
        category: ["new", "rating"],
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "NEW",
        badgeType: "new",
        rating: 4.6,
        isWishlist: false
    },
    {
        id: 8,
        title: "Wool Blend Sweater",
        description: "Winter essential",
        price: "$35.50",
        originalPrice: "$49.99",
        brand: "Tommy Hilfiger",
        category: ["top-deals"],
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "TOP DEAL",
        badgeType: "top-deal",
        rating: 4.4,
        isWishlist: false
    }
];

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const productCountElement = document.getElementById('productCount');
const tabButtons = document.querySelectorAll('.tab-btn');

// Current filter state
let currentFilter = 'all';
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Generate product card HTML
function generateProductCard(product) {
    const isInWishlist = wishlist.includes(product.id);
    
    return `
        <div class="product-card" data-category="${product.category.join(' ')}" data-id="${product.id}">
            ${product.badge ? `<div class="product-badge ${product.badgeType}">${product.badge}</div>` : ''}
            
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="product-price">
                    ${product.price}
                    ${product.originalPrice ? `<span>${product.originalPrice}</span>` : ''}
                </div>
                
                <div class="product-brand">Brand: <span>${product.brand}</span></div>
                
                <div class="product-rating">
                    <div class="stars">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="rating-value">${product.rating}/5</span>
                </div>
                
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Filter products based on current filter
function filterProducts() {
    let filteredProducts;
    
    if (currentFilter === 'all') {
        filteredProducts = products;
    } else if (currentFilter === 'rating') {
        // Sort by rating for rating filter
        filteredProducts = [...products].sort((a, b) => b.rating - a.rating);
    } else {
        filteredProducts = products.filter(product => 
            product.category.includes(currentFilter)
        );
    }
    
    return filteredProducts;
}

// Display products
function displayProducts() {
    const filteredProducts = filterProducts();
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try selecting a different category</p>
            </div>
        `;
    } else {
        productsContainer.innerHTML = filteredProducts.map(product => 
            generateProductCard(product)
        ).join('');
    }
    
    // Update product count
    productCountElement.textContent = filteredProducts.length;
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // In a real app, you would add to cart storage/API
    alert(`Added "${product.title}" to cart!`);
    
    // Visual feedback
    const button = document.querySelector(`.product-card[data-id="${productId}"] .add-to-cart`);
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.background = '#2ecc71';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 1500);
}

// Toggle wishlist
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        // Add to wishlist
        wishlist.push(productId);
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
    }
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update UI
    const wishlistBtn = document.querySelector(`.product-card[data-id="${productId}"] .wishlist-btn`);
    wishlistBtn.classList.toggle('active');
    
    // Visual feedback
    if (wishlistBtn.classList.contains('active')) {
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        wishlistBtn.style.background = '#ff6b6b';
        wishlistBtn.style.color = 'white';
    } else {
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        wishlistBtn.style.background = '';
        wishlistBtn.style.color = '';
    }
}

// Tab filtering
function setupTabFiltering() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current filter
            currentFilter = button.dataset.filter;
            
            // Display filtered products
            displayProducts();
        });
    });
}

// Initialize the page
function init() {
    // Set wishlist status on products
    products.forEach(product => {
        product.isWishlist = wishlist.includes(product.id);
    });
    
    // Display products
    displayProducts();
    
    // Setup tab filtering
    setupTabFiltering();
}

// Load when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Add CSS for no-products message
const style = document.createElement('style');
style.textContent = `
    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
    }
    
    .no-products h3 {
        font-size: 24px;
        color: #7f8c8d;
        margin-bottom: 10px;
    }
    
    .no-products p {
        color: #95a5a6;
        font-size: 16px;
    }
`;
document.head.appendChild(style);

  /* =========================================================
     COUNTDOWN TIMER (FLASH SALES)
  ========================================================= */
  // Flash Sale End Date (YYYY, MM-1, DD, HH, MM, SS)
const flashSaleEnd = new Date(2025, 0, 15, 23, 59, 59).getTime();
const flashTimer = document.getElementById("flash-timer");

function updateFlashTimer() {
  const now = new Date().getTime();
  const distance = flashSaleEnd - now;

  if (distance <= 0) {
    flashTimer.textContent = "FLASH SALE ENDED";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  flashTimer.textContent = `TIME LEFT: ${days}d : ${hours}h : ${minutes}m`;
}

updateFlashTimer();
setInterval(updateFlashTimer, 60000);


  /* =========================================================
     CAROUSEL (FLASH SALES)
  ========================================================= */
  const track = document.querySelector(".carousel-track");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  if (track && prev && next) {
    let index = 0;
    const cardWidth = 290;

    next.onclick = () => {
      index++;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    };

    prev.onclick = () => {
      index = Math.max(index - 1, 0);
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    };
  }
  /* =========================================================
     SHOW PRODUCTS 6+ ON SEE ALL / NAV CLICK
  ========================================================= */
  document.getElementById("flash-sales").classList.add("expanded");

  const seeAllBtns = document.querySelectorAll(".see-all");
  const navBtns = document.querySelectorAll(".nav");
  const extraProducts = document.querySelectorAll(".product-card.extra");

  function showExtraProducts() {
    extraProducts.forEach(card => {
      card.style.display = "block";
    });
  }

  seeAllBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      showExtraProducts();
    });
  });

  navBtns.forEach(btn => {
    btn.addEventListener("click", showExtraProducts);
  });


  /* =========================================================
     PRODUCT CARD HOVER (OPTIONAL)
  ========================================================= */
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.cursor = "pointer";
    });
  });


  /* =========================================================
     CONTACT FORM VALIDATION
  ========================================================= */
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();

      const fullName = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!fullName || !email || !phone || !message) {
        alert("Please fill out all fields.");
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }

      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }


 

  /* ================= REGISTER ALERT ================= */
  /* Login Alert */
  function loginAlert() {
    // Show custom alert instead of browser alert
    document.getElementById("loginAlert").style.display = "block";
  }

  function closeAlert() {
    document.getElementById("loginAlert").style.display = "none";
  }
  function registerAlert() {

    document.getElementById("registerAlert").style.display = "block";
  }

  function closeRegisterAlert() {
    document.getElementById("registerAlert").style.display = "none";
  }

  /* Signup Alert */
  function signupAlert() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
      alert("⚠️ Please fill in all sign-up fields.");
      return;
    }

    alert(
      `🎉 Account Created Successfully!\n\n` +
      `Username: ${username}\n` +
      `Email: ${email}\n\n` +
      `Welcome to Nairobi Clothing Thrift Co. 🛍️`
    );

    // Optional: clear form after signup
    document.getElementById("signupForm").reset();
  }


 

/* =========================================================
     SIGN UP FORM + PASSWORD STRENGTH
  ========================================================= */
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();

      const spinner = document.getElementById("loadingSpinner");
      if (spinner) spinner.style.display = "block";

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !email || !password) {
        alert("Please fill in all fields");
        if (spinner) spinner.style.display = "none";
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        if (spinner) spinner.style.display = "none";
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        if (spinner) spinner.style.display = "none";
        return;
      }

      setTimeout(() => {
        alert("Account created successfully!");
        signupForm.reset();
        if (spinner) spinner.style.display = "none";
      }, 2000);
    });

    function validateEmail(email) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    const passwordInput = document.getElementById("password");
    const strengthText = document.getElementById("passwordStrength");

    if (passwordInput && strengthText) {
      passwordInput.addEventListener("input", () => {
        const strength = calculatePasswordStrength(passwordInput.value);
        strengthText.textContent = `Password strength: ${strength}`;
        strengthText.style.color =
          strength === "Weak" ? "red" :
          strength === "Medium" ? "orange" : "green";
      });
    }

    function calculatePasswordStrength(password) {
      if (password.length > 12 && /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password))
        return "Strong";
      if (password.length > 8 && /[A-Za-z]/.test(password) && /\d/.test(password))
        return "Medium";
      return "Weak";
    }

    const togglePassword = document.getElementById("togglePassword");
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        togglePassword.classList.toggle("fa-eye-slash");
      });
    }
  }


  /* =========================================================
     ABOUT US — FADE IN ON SCROLL
  ========================================================= */
  const faders = document.querySelectorAll(".fade-in");
  if (faders.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.2 });

    faders.forEach(el => observer.observe(el));
  }


  /* =========================================================
     READ MORE TOGGLE (ABOUT US)
  ========================================================= */
  const readMoreBtn = document.querySelector(".read-more-btn");
  const moreText = document.querySelector(".more-text");

  if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener("click", () => {
      const expanded = moreText.style.display === "inline";
      moreText.style.display = expanded ? "none" : "inline";
      readMoreBtn.textContent = expanded ? "Read more" : "Read less";
    });
  }


  /* =========================================================
     IMAGE MODAL (ABOUT US GALLERY)
  ========================================================= */
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.querySelector(".close-modal");

  if (modal && modalImg && closeModal) {
    document.querySelectorAll(".gallery-img").forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
      });
    });

    closeModal.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

});



document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signin-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // 🔥 stops refresh immediately

    const username = document.getElementById("loginUsername").value;

    if (!username) {
      showInlineMessage("Please enter your username");
      return;
    }

    showInlineMessage(`Welcome back, ${username}!`);
  });
});
