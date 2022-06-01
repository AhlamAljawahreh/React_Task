DROP DATABASE React_Task;
CREATE DATABASE React_Task;
USE React_Task;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL UNIQUE,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (role_id)
);

CREATE TABLE permissions (
    Permission_id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(255) NOT NULL UNIQUE,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (Permission_id)
);
 
 CREATE TABLE permission_role (
    id INT AUTO_INCREMENT NOT NULL,
    role INT NOT NULL,
    permission INT NOT NULL,
    FOREIGN KEY (role ) REFERENCES roles(role_id),
    FOREIGN KEY (permission ) REFERENCES permissions(Permission_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

 CREATE TABLE users (
    user_id INT AUTO_INCREMENT NOT NULL ,
    userName VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL UNIQUE,
    country VARCHAR(255),
    phoneNumber VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL,
    FOREIGN KEY (role ) REFERENCES roles(role_id),
    PRIMARY KEY (user_id),
    is_deleted TINYINT DEFAULT 0
);

CREATE TABLE store (
    store_id INT AUTO_INCREMENT NOT NULL,
    name  VARCHAR(255) NOT NULL,
    owner INT NOT NULL,
    image VARCHAR(255) ,
    description VARCHAR(255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (owner ) REFERENCES users(user_id),
    PRIMARY KEY (store_id)
);
CREATE TABLE item (
    item_id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) ,
    price  INT NOT NULL,
    store_id INT NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (item_id)
);

CREATE TABLE orders (
    orders_id INT AUTO_INCREMENT NOT NULL,
    order_by INT NOT NULL,
    item_id INT NOT NULL,
    store_id INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    order_desc VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (order_by ) REFERENCES users(user_id),
    FOREIGN KEY (store_id ) REFERENCES store(store_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id),
    PRIMARY KEY (orders_id)
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




