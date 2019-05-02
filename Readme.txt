Example uses a simple Node.js (Express based) server and
an SQLite database.

To run the node:

You need Node.js installed https://nodejs.org

Open command windows on the directory where the example is.

Execute
>npm install

which will install module dependencies mentioned in the package.json file.

Launch server by executing:
>node nodejs_server_with_sqlite_song_database.js

When the server has started open a browser and visit
http://localhost:3000/


1)   Problem 2 was done in nodeJS

2)   Localhost:3000/

3)   The database is in data folder.

4)   The original database that proferssor provided with node wasn’t working it was replaced with the database from Java.

The database file name is “node nodejs_server_with_sqlite_database.js”

5)   Install node.js

6)   Write npm install in the terminal (staying in the folder , in the terminal)

In the terminal type : node node nodejs_server_with_sqlite_database.js

 

7)   The server will be running at localhost:3000/

How to use:
 -keep the title to search empty and select a category to list all items in the category
 -Search a Product by name or category 
 -add product to cart 
 -view cart ** not working properly


********************************************
Database Schema
********************************************
CREATE TABLE Category (
  category_id integer NOT NULL PRIMARY KEY,
  category_name varchar(50)
);
CREATE TABLE Customer (
customer_id integer not null primary key,
first_name varchar(20),
last_name varchar(20),
email varchar(50),
billing_address varchar(100)
);
CREATE TABLE Orders(
order_id integer not null,
payment_id integer not null,
customer_id integer,
total_price integer,
primary key (order_id,payment_id,customer_id),
FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) on delete set null
);
CREATE TABLE Product (
product_id integer NOT NULL Primary key,
product_name varchar(20),
product_details varchar(100),
date_added varchar(10),
price integer,
category_id integer,
sup_id integer,
FOREIGN KEY (category_id) REFERENCES Category(category_id) on delete set null,
FOREIGN KEY (sup_id) REFERENCES Supplier(supplier_id) on delete set null
);
CREATE TABLE Shopping_cart (
id integer primary key,
quantity integer,
product_id integer ,
foreign key (product_id) references Product(product_id) on delete set null
);
CREATE TABLE Supplier (
supplier_id integer NOT NULL PRIMARY KEY ,
company_name  varchar(15),
address varchar(30),
phone varchar(15),
city varchar(15),
country varchar(15)
);