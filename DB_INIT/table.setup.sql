-- connect to db
\c ecommerce;

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
    FOREIGN KEY (productId) REFERENCES product(productId),
    UNIQUE (cartId, productId)
);

CREATE INDEX idx_cart_user ON carts(cartId);

CREATE INDEX idx_cart_items_cart ON cartItems(cartId);

CREATE INDEX idx_cart_items_product ON cartItems(productId);

ALTER TABLE
    cartitems
ADD
    CONSTRAINT unique_cart_product UNIQUE (cartId, productId);

CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    productid INT NOT NULL,
    userid INT NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product FOREIGN KEY (productid) REFERENCES product(productid),
    CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE orders (
    orderid SERIAL PRIMARY KEY,
    userid INTEGER not null REFERENCES users(userid),
    totalamount decimal NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orderitems (
    orderitemid SERIAL PRIMARY KEY,
    orderid INTEGER not null REFERENCES orders(orderid),
    productid INTEGER not null REFERENCES product(productid),
    quantity INTEGER NOT NULL,
    price decimal NOT NULL
);

CREATE TABLE StripePaymentInfo (
    payment_intent_id VARCHAR(200) PRIMARY KEY,
    stripeCustomerId VARCHAR(200) NOT NULL,
    payment_method VARCHAR(200) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    stripeStatus VARCHAR(30) NOT NULL,
    createdTime TIMESTAMP NOT NULL,
    completedTime TIMESTAMP,
    orderId INT NOT NULL REFERENCES orders (orderid)
);

INSERT INTO
    product
VALUES
    (
        3,
        'Men Kurta',
        NULL,
        999.00,
        'Kurtas',
        'HERE&NOW',
        '["https://ecomstore-dev-data.s3.us-east-2.amazonaws.com/product/men_ethnic_motifs_embroidered_chikankari_kurta_1.jpg"]',
        '{"specifications": { "Number of Items": "1"}}',
        '2024-07-09 11:05:43.748989',
        '2024-07-09 11:05:43.748989',
        'Men'
    );
