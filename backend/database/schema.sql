DROP DATABASE React_Task;
CREATE DATABASE React_Task;
USE React_Task;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL UNIQUE,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(255) NOT NULL UNIQUE,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);
 
 CREATE TABLE permission_role (
    id INT AUTO_INCREMENT NOT NULL,
    role INT NOT NULL,
    permission INT NOT NULL,
    FOREIGN KEY (role ) REFERENCES roles(id),
    FOREIGN KEY (permission ) REFERENCES permissions(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

 CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL ,
    userName VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL UNIQUE,
    country VARCHAR(255),
    phoneNumber VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL,
    FOREIGN KEY (role ) REFERENCES roles(id),
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0
);

CREATE TABLE store (
    id INT AUTO_INCREMENT NOT NULL,
    name  VARCHAR(255) NOT NULL,
    owner INT NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (owner ) REFERENCES users(id),
    PRIMARY KEY (id)
);
CREATE TABLE item (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price  INT NOT NULL,
    store_id INT NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT NOT NULL,
    order_by INT NOT NULL,
    item_id INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    order_desc VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (order_by ) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES item(id),
    PRIMARY KEY (id)
); 


-- Roles Permission
INSERT INTO roles (role) VALUES ("Seller");
INSERT INTO roles (role) VALUES ("Shopper");


-- permissions
INSERT INTO permissions (permission) VALUES ("CREATE_STORE");
INSERT INTO permissions (permission) VALUES ("ADD_ITEM");
INSERT INTO permissions (permission) VALUES ("REMOVE_ITEM");
INSERT INTO permissions (permission) VALUES ("CREATE_ORDER");


-- role permission
INSERT INTO permission_role (permission, role) VALUES (1,1);
INSERT INTO permission_role (permission, role) VALUES (2,1);
INSERT INTO permission_role (permission, role) VALUES (3,1);
INSERT INTO permission_role (permission, role) VALUES (4,2);




