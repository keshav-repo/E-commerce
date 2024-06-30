-- create database
CREATE DATABASE ecommerce;

-- connect to db
-- \ c ecommerce 
-- create table for product
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    category VARCHAR(255)
);