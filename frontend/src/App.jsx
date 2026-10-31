import { useState } from "react";
import "./App.css";

const categories = [
  { icon: "🪴", name: "Indoor Plants" },
  { icon: "🌺", name: "Flowering Plants" },
  { icon: "🌳", name: "Outdoor Plants" },
  { icon: "🍋", name: "Fruit Plants" },
  { icon: "🌱", name: "Seeds & Soil" },
  { icon: "🏺", name: "Pots & Planters" },
];

const products = [
  {
    name: "Money Plant",
    category: "Indoor Plant",
    price: 149,
    emoji: "🌿",
  },
  {
    name: "Rose Plant",
    category: "Flowering Plant",
    price: 199,
    emoji: "🌹",
  },
  {
    name: "Mango Sapling",
    category: "Fruit Plant",
    price: 249,
    emoji: "🥭",
  },
  {
    name: "Terracotta Pot",
    category: "Garden Accessories",
    price: 99,
    emoji: "🏺",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  // Add a product to the cart
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.name === product.name
      );

      if (existing) {
        return currentCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Update quantity and remove items when quantity reaches zero
  const changeQuantity = (name, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total quantity of all products
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Remove a product completely
  const removeFromCart = (name) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.name !== name)
    );
  };

  return (
    <div className="website">
      <div className="announcement">
        🌱 Bring home the joy of greenery!
      </div>

      <header className="navbar">
        <a className="logo" href="#home">
          <span>🌿</span> GreenNest
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Shop Plants</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="cart-button" href="#cart">
          🛒 Cart ({cartCount})
        </a>
      </header>

      <main>
        {/* Hero section */}
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR LITTLE CORNER OF NATURE
            </span>

            <h1>
              Grow happiness,
              <br />
              <span>one plant at a time.</span>
            </h1>

            <p>
              Discover beautiful plants, healthy saplings, stylish
              pots, and gardening essentials to make your space greener.
            </p>

            <a className="primary-button" href="#products">
              Explore Our Collection →
            </a>

            <div className="hero-note">
              🌱 Plants for every home and every garden
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-circle">
              <span className="plant-illustration">🪴</span>
            </div>

            <div className="floating-card">
              <span>🌿</span>
              <div>
                <strong>Grow naturally</strong>
                <small>Bring your garden to life</small>
              </div>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="section" id="categories">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FIND YOUR GREEN</span>
              <h2>Shop by category</h2>
            </div>

            <p>
              Everything you need to create your dream garden.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <a
                className="category-card"
                href="#products"
                key={category.name}
              >
                <span className="category-icon">
                  {category.icon}
                </span>

                <h3>{category.name}</h3>

                <span className="category-arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* Products section */}
        <section
          className="section products-section"
          id="products"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">HANDPICKED FOR YOU</span>
              <h2>Popular picks</h2>
            </div>

            <span className="product-count">
              {products.length} sample products
            </span>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article
                className="product-card"
                key={product.name}
              >
                <div className="product-image">
                  <span>{product.emoji}</span>
                  <span className="sample-label">Sample</span>
                </div>

                <div className="product-info">
                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">
                    <strong>₹{product.price}</strong>

                    <button
                      type="button"
                      className="add-button"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="demo-note">
            These are sample products and prices. We will replace
            them with your uncle's actual nursery inventory later.
          </p>
        </section>

        {/* Shopping cart section */}
        <section className="section" id="cart">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR SELECTION</span>
              <h2>Your shopping cart</h2>
            </div>
          </div>

          {cart.length === 0 ? (
            <p>
              Your cart is empty. Add some plants to get started!
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.name}>
                  <span className="cart-emoji">
                    {item.emoji}
                  </span>

                  <div className="cart-details">
                    <strong>{item.name}</strong>
                    <span>₹{item.price} each</span>
                  </div>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(item.name, -1)
                      }
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(item.name, 1)
                      }
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeFromCart(item.name)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="cart-total">
                <strong>Total: ₹{cartTotal}</strong>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() =>
                    alert(
                      "Checkout will be implemented next!"
                    )
                  }
                >
                  Proceed to checkout
                </button>
              </div>
            </>
          )}
        </section>

        {/* Garden banner */}
        <section className="garden-banner">
          <div>
            <span className="eyebrow">A GREENER TOMORROW</span>

            <h2>Your dream garden starts here.</h2>

            <p>
              From your first indoor plant to a flourishing
              backyard, let us help you grow.
            </p>
          </div>

          <a className="light-button" href="#contact">
            Get in touch →
          </a>
        </section>

        {/* Contact section */}
        <section className="contact-section" id="contact">
          <span className="eyebrow">WE'D LOVE TO HELP</span>

          <h2>Let's grow something beautiful.</h2>

          <p>
            Contact our nursery for plant availability, gardening
            products, delivery, and pickup enquiries.
          </p>

          <a className="primary-button" href="mailto:">
            Contact the Nursery
          </a>

          <small>
            We'll add your uncle's real contact information
            before launch.
          </small>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a className="logo" href="#home">
          🌿 GreenNest
        </a>

        <p>Growing greener homes, one plant at a time.</p>

        <small>
          © 2026 GreenNest Nursery. All rights reserved.
        </small>
      </footer>
    </div>
  );
}

export default App;