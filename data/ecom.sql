drop table if exists Category;
drop table if exists Orders;
drop table if exists Product;
drop table if exists Shopping_cart;
drop table if exists Supplier;
drop table if exists Customer;

pragma foreign_keys= ON;

CREATE TABLE if not exists Category (
  category_id integer NOT NULL PRIMARY KEY,
  category_name varchar(50)
);


CREATE TABLE if not exists Orders(
order_id integer not null,
payment_id integer not null,
customer_id integer,
total_price integer,
primary key (order_id,payment_id,customer_id),
FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) on delete set null
);


CREATE TABLE if not exists Product (
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


CREATE TABLE if not exists Shopping_cart (
id integer primary key,
quantity integer,
product_id integer ,
foreign key (product_id) references Product(product_id) on delete set null
);


CREATE TABLE if not exists Supplier (
supplier_id integer NOT NULL PRIMARY KEY ,
company_name  varchar(15),
address varchar(30),
phone varchar(15),
city varchar(15),
country varchar(15)
);


CREATE TABLE if not exists Customer (
customer_id integer not null primary key,
first_name varchar(20),
last_name varchar(20),
email varchar(50),
billing_address varchar(100)
);


--INSERT DATA
--=======================

begin transaction;

--Insert Category
insert into Category values (1,'Books');
insert into Category values (2,'Women''s Clothing and Accessories');
insert into Category values (3,'Men''s Clothing and Accessories');
insert into Category values (4,'Phones and Telecommunications');
insert into Category values (5,'Computer and Office');
insert into Category values (6,'Shoes');
insert into Category values (7,'Sports');
insert into Category values (8,'Watches');	
insert into Category values (9,'Music');
insert into Category values (10,'Toys');


--Insert Supplier
insert into Supplier values (1,'companyA', 'ot1 st', '613-716 9160', 'Ottawa', 'Canada');
insert into Supplier values (2,'companyB', 'ot2 st', '613-716 9160', 'Montreal', 'Canada');
insert into Supplier values (3,'companyC', 'ot3 st', '613-716 9160', 'Toronto', 'Canada');
insert into Supplier values (4,'companyD', 'ot4 st', '613-716 9160', 'Ottawa', 'Canada');
insert into Supplier values (5,'companyE', 'ot5 st', '613-716 9160', 'Vancuvor', 'Canada');
insert into Supplier values (6,'companyF', 'ot6 st', '613-716 9160', 'Montreal', 'Canada');
insert into Supplier values (7,'companyG', 'ot7 st', '613-716 9160', 'Toronto', 'Canada');
insert into Supplier values (8,'companyH', 'ot8 st', '613-716 9160', 'Vancuvor', 'Canada');
insert into Supplier values (9,'companyI', 'ot9 st', '613-716 9160', 'Ottawa', 'Canada');
insert into Supplier values (10,'companyJ','ot10 st', '613-716 9160', 'London', 'Canada');

--Insert Product
insert into Product values (1,'Technology and the Politics of University Reform','Edward C. Hamilton is Chair of the School of Communication at Capilano University, Canada.', 'March,21', 40,1,5);
insert into Product values (2,'Funky Boutique Womens Long Sleeve Off Shoulder Plain Batwing Top','Featuring Slash neck and can be worn Off The Shoulder or Normally with a finishing touch of band at the bottom, Light Weight, Soft & Stretchy Viscose Material', 'March,22', 45,2,3);
insert into Product values (3,'Men Point Collar Half Sleeves Slim Fit Casual Shirt','Color: White, Black, Sky Blue, Warm Red Point Collar, Half Sleeves, Slim Fit', 'March,26', 1220,3,2);
insert into Product values (4,' Azbro Men''s Highneck Zip Up Casual Jacket & Outcoat ','This is the piece you''ll be reaching for every single day. It''s a jacket has zip placket at front, ribbed cuff and hemline.', 'March,23', 15,3,3);
insert into Product values (5,'Alienware Area 51 R2 Desktop A51R2-HID52-AUK2 ','Overclocked "Haswell-E" Intel® Core™ i7-5960X 8-Core Processor, 3.0 GHz', 'March,20', 150,5,5);
insert into Product values (6,'2016 Grammy Nominees','The 22nd installment of the best-selling series features 21 GRAMMY-nominated artists and hit songs from the world s biggest superstars and hottest emerging talent', 'March,22', 40,9,3);
insert into Product values (7,'Beauty Behind The Madness','2015 album from Canadian R&B artist/producer', 'March,21', 130,9,2);
insert into Product values (8,'DADAWEN Men''s Canvas Lace-up Oxford Casual Shoes','"DADAWEN" is a young brand, and it come up with many fresh designs. Not matter Individuality', 'March,19', 10,6,5);
insert into Product values (9,'Bessky® Children''s Drawing Toys Mat Magic Pen Educational Toy Painting Writing Mat Board','Package Content:* 1 pcs Magic Doodle Mat (Size=80cmx60cm) * 2 pcs Water Doodle Pen ', 'March,16', 30,6,8);
insert into Product values (10,'Geneva Rose Gold Plated Classic Round CZ Stainless Steel Back Ladies Boyfriend Watch','This striking ladies watch has a unique look that is sure to hit the right note with any outfit. The rose and gold plated watch features a stainless steel back, a round face with bezel encrusted cubic zirconia and a subdued rose colored band measuring .75 inches in width', 'March,20', 250,8,4);

-- Insert Shopping_cart
insert into Shopping_cart values (1,4,3);
insert into Shopping_cart values (2,4,2);
insert into Shopping_cart values (3,2,3);
insert into Shopping_cart values (4,1,5);
insert into Shopping_cart values (5,4,3);
insert into Shopping_cart values (6,7,9);
insert into Shopping_cart values (7,10,7);
insert into Shopping_cart values (8,3,8);
insert into Shopping_cart values (9,8,5);
insert into Shopping_cart values (10,2,7);

-- Insert Customer
insert into Customer values (1,'Mir','Abbas','mir9abbas','222 ot st. Ottawa Canada');
insert into Customer values (2,'Ehsan','Malik','ehsanmalik','222 ot st. Toronto Canada');
insert into Customer values (3,'Ahmed','Ab','ahmed.ab','222 ot st. Montreal Canada');
insert into Customer values (4,'Brit','V.','brit.v','222 ot st. Ottawa Canada');
insert into Customer values (5,'Stanle','Bronson','stanle.bronson','222 ot st. London Canada');
insert into Customer values (6,'Ray','Tarnum','ray.tarnum','222 ot st. Toronto Canada');
insert into Customer values (7,'Micheal','Chuby','micheal.chuby','222 ot st. Vancuvor Canada');
insert into Customer values (8,'Nich','Rivard','nich.rivard','222 ot st. London Canada');
insert into Customer values (9,'Adam','Niazi','adam.niazi','222 ot st. Toronto Canada');
insert into Customer values (10,'Katie','Beltran','katie.beltran','222 ot st. Montreal Canada');


--Insert Order
insert into Orders values (1,101,4, 36);
insert into Orders values (2,102,2, 160);
insert into Orders values (3,103,5, 57);
insert into Orders values (4,104,2, 430);
insert into Orders values (5,105,1, 66);
insert into Orders values (6,106,4, 145);
insert into Orders values (7,107,5, 14);
insert into Orders values (8,108,10, 79);
insert into Orders values (9,109,8, 65);
insert into Orders values (10,110,6, 27);

end transaction;
