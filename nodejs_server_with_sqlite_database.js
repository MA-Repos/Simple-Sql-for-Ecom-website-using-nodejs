



var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose(); //verbose provides more detailed stack trace
var url = require('url');

var db = new sqlite3.Database('data/test.db');
var  app = express(); //create express middleware dispatcher
var urlObj; //we will parse user GET URL's into this object

//Define middleware functions
/*
function(request, response, next){
   //request is the http request object
   //response is the http response object
   //next is the next-in-line middleware that needs to be called
   //this function should either respond to the client -ending the
   //middleware chain, or call next()
}
*/

//add a user table to database
//serialize ensures the queries are presented to database serially.


function methodLogger(request, response, next){  
           //for debugging         
   console.log("");
   console.log("================================");
   console.log("Console Logger:");
   console.log("METHOD: " + request.method);
   console.log("URL:" + request.url);
   next(); //call next middleware registered
}

function headerLogger(request, response, next){  
           //for debugging         
   console.log("Headers:")
   for(k in request.headers) console.log(k);
   next(); //call next middleware registered
}


function respondToClient(request, response, next){
    response.end(); //send response to client
	//notice no call to next()
}

function addHeader(request, response, next){
        // header portion of web page
    var title = 'COMP 3005:';
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<!DOCTYPE html>');
    response.write('<html><head><title>About</title></head>' + '<body>');
    response.write('<h1>' +  title + '</h1>');		
	
	response.write('<hr>');
	next();
}
function addFooter(request, response, next){
    //footer portion of web page
	response.write('<hr>');
	response.write('<h3>' +  'Carleton University' + '</h3>');
	response.write('<h3>' +  'School of Computer Science' + '</h3>');
    response.write('</body></html>');
	next();

}


function getUsersPage(request, response, next){
    // users.html
	console.log("RUNNING ADD USERS");
    response.write('<h2>' +  'USERS' + '</h2>');
	db.all("SELECT userid, password FROM users", function(err, rows){
	  for(var i=0; i<rows.length; i++){
          console.log(rows[i].userid + ": " + rows[i].password);
		   response.write('<p>' + rows[i].userid + ": " + rows[i].password + '</p>');
	     
	  }
      next();		  
	});

}

function parseURL(request, response, next){
    //parse query parameters in URL
	var parseQuery = true; //parseQueryStringIfTrue 
    var slashHost = true; //slashDenoteHostIfTrue 
    urlObj = url.parse(request.url, parseQuery , slashHost );
    // console.log('path: ' + urlObj.path);
    // console.log('query: ' + urlObj.query);	
    for(x in urlObj.query) console.log(x + ': ' + urlObj.query[x]);
	next();

}

function serveSearchForm(request, response, next){
	response.write('<p>' + "select a book to search from or leave blank" + '</p>');
	
	var sqldefault = "SELECT category_name FROM Category";


	db.all(sqldefault, function(err, rows){
		
		
		  var page = '<html><head><title>Search By Product name</title></head>' +
    	'<body>' +
    	'<form method="post">' + '<br>' +
    	'      Enter Title to search: <input type="text" name="title"><br>' +
   		'<br>'+'<p> Select a category to search from or leave blank </p>';
   		page +='<select name="category" >';
		page +='<option>' + '</option>'; 
		if(rows != null){
		  for(var i=0; i<rows.length; i++){
			  page +='<option value="'+ rows[i].category_name +'">' + (i+1) + "  " +  rows[i].category_name +  '</option>';		    
		  }
          	page +='</select>';
			page += '</body></html><br><br>'; 
    		page +='<input type="submit" value="Submit"></form>';
   			response.end(page);
    	}
    	else{
    		var elsePage = '<html><head><title>Search By Product name</title></head>' +
    		'<body> <h1> No Product in database </h1></body></html>'
			response.end(elsePage);
    	}
          //next();		  
    	
	});


	//don't call next
}

function handleSearchFormData(request, response, next){
    // handler for search POST message
	console.log("RUNNING HANDLE SEARCH FORM");
	console.log("SEARCH REQUEST BODY");
	console.log(request.body.title);
	console.log("END REQUEST BODY");
	
	var sql = "select * from Product join Category on Product.product_id = Category.category_id";

    if(request.body.title) {
	    console.log("finding title: " + urlObj.query['title']);
		sql = " select * from Product join Category on Product.product_id = Category.category_id WHERE Product.product_name LIKE '%" + 
		          request.body.title + "%' AND Category.category_name LIKE '%" + 
		          request.body.category + "%';";
			
	}
	else{
 		 sql = "select * from Product join Category on Product.product_id = Category.category_id WHERE Category.category_name LIKE '%" + 
		          request.body.category + "%';";	
	}		


    response.write('<h2>' +  'Products :</h2>');
    response.write('<ul>');
	db.all(sql, function(err, rows){
	if(rows != null){
	  for(var i=0; i<rows.length; i++){
		   response.write('<li><a href=' + 'product/' + rows[i].product_id + '>' + rows[i].product_name+ '</a></li>');		     
	  }
      response.write('</ul>');
  	}else{
  	    response.write('<h2>' +  'length is null' + '</h2>');
  	}
      next();		  
  
	});

}

function getProductDetails(request, response, next){
        
    var productID = urlObj.path; //expected form: /song/235
	productID = productID.substring(productID.lastIndexOf("/")+1, productID.length);
	
	var sql = "select * from Product join Category join Supplier on Product.product_id = Category.category_id = Supplier.supplier_id where Product.product_id =" + productID;

   response.write('<h2>' +  'Product DETAILS:' + '</h2>');
		db.all(sql, function(err, rows){
		console.log(rows.length);
	  for(var i=0; i<rows.length; i++){
		   response.write('<p><strong> Product Name: ' + rows[i].product_name  + '</strong></p>');		     
		   response.write('<p> Product Details: ' + rows[i].product_details  + '</p>');		     
		   response.write('<p> Date Added: ' + rows[i].date_added + '</p>');
		   response.write('<p> Price: ' + rows[i].date_added + '</p>');
		   response.write('<p> Category: ' + rows[i].category_name + '</p>');
		   response.write('<p> Supplier: ' + rows[i].company_name + '</p>');		     		     
	  }

	   response.write('<form action="/cart" method="post">');
	   response.write('<input type=hidden name="productID" value="'+productID+'">');
	   response.write('<input type="submit" value="Add to Cart"/></form>');
      next();
  });

}

 function getIndexPage(request, response, next){
        // index.html
    var page = 'Index:';
    response.write('<h1>' +  page + '</h1>');
    response.write('<p>' +  'Example of using sqlite relational database in node.js server'  + '</p>');
    response.write('<p>' +  '<a href=search>Search Product</a>'  + '</p>');
	next();
}

function cartItems(request, response, next){
	console.log("id----"+request.body.productID);
	var productID =request.body.productID;
	var sql = "Insert into shopping_cart values(((select count(*) from shopping_cart)+1),2,"+productID+")";

	db.all(sql, function(err, rows){
		response.write('<form action="/search" method="get">');
		response.write('<p>Successfully added to Cart');
		response.write('<input type="submit" value="Back to Search"/></form>');
		response.write('<form action="/viewcart" method="post">');
		response.write('<input type=hidden name="productID" value="'+productID+'">');
		response.write('<input type="submit" value="View Cart"/></form>');
		next();
	});
}
function viewCart(request, response, next){
	var productID =request.body.productID;
	response.write('<h2> Pro '+productID);
	var sql = "Select * from Product join Customer join shopping_cart on Product.product_id = Customer.customer_id = shopping_cart.id where Customer.customer_id ="+productID;  
		db.all(sql, function(err, rows){
		if( rows != null){
		  for(var i=0; i<rows.length; i++){
		  	response.write('<p><strong> Cart: ' + rows[i].first_name + '</strong></p>');
			response.write('<p><strong> Product Name: ' + rows[i].product_name  + '</strong></p>');		     
			response.write('<p> Product Quantity: ' + rows[i].quantity  + '</p>');		     		     		     
		  }
		}
			response.write('<form action="/search" method="get">');
			response.write('<p>Successfully added to Cart');
			response.write('<input type="submit" value="Back"/></form>');
			next();
		});
}


		


//register middleware with dispatcher
//ORDER MATTERS HERE
//app.use(methodLogger); 
//app.use(headerLogger);
app.use(parseURL);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //parse body of POST messages
app.use(addHeader);
app.use('/users', getUsersPage);
app.use('/product', getProductDetails);
app.post('/cart', cartItems);
app.post('/viewcart', viewCart);
app.use('/', getIndexPage);
app.get('/search', serveSearchForm);
app.post('/search', handleSearchFormData);
app.use(addFooter);
app.use(respondToClient);

//create http-express server
http.createServer(app).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');