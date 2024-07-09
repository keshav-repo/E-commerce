-- create database
CREATE DATABASE ecommerce;

-- connect to db
-- \ c ecommerce
-- create table for product
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    images JSONB,
    additional_info JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

alter table
    product
add
    column gender varchar(30);

CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100),
    -- Make this nullable to accommodate OAuth users
    email VARCHAR(100) UNIQUE,
    name VARCHAR(100),
    profilePhoto TEXT -- Use TEXT for potentially long URLs or base64 encoded images
);