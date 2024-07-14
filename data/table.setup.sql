-- CREATE DATABASE ecommerce;

-- connect to db
-- \ c ecommerce

CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    name VARCHAR(100),
    profilePhoto TEXT 
);

CREATE TABLE product (
    productId SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    images JSONB,
    additional_info JSONB,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	gender varchar(30)
);

CREATE TABLE carts (
    cartId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE cartItems (
    cartItemId SERIAL PRIMARY KEY,
    cartId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cartId) REFERENCES carts(cartId) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES product(productId)
);

CREATE INDEX idx_cart_user ON carts(cartId);
CREATE INDEX idx_cart_items_cart ON cartItems(cartId);
CREATE INDEX idx_cart_items_product ON cartItems(productId);

ALTER TABLE cartitems ADD CONSTRAINT unique_cart_product UNIQUE (cartId, productId);

CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    productid INT NOT NULL,
    userid INT NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (productid) REFERENCES product(productid),
    CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES users(userid)
);

