// get all products
function getToken(){
    token = localStorage.getItem('token');
    return token;
}

// function edit(){
// 	let updateform = document.getElementById("form-popup");
// 	updateform.style.display = "block";
// 	}
token = getToken()
window.onload = function products(){
	let products_url = 'http://127.0.0.1:5000/api/v2/products';


  fetch(products_url,{
    method:"GET",
    Headers: {
			'Accept':'application/json',
			'Content-type':'application/json',
			"Authorization":'Bearer' + token
    },
    })

  .then(respose => respose.json())
  .then((data) =>{
  	console.log(data);
  	let products = data.products;
  	let product_table  = document.getElementById('my_products');
            th = `
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Action</td>
                </tr>
            `


            product_table.innerHTML = th
            products.forEach(product =>{
            	'<td>'+product.product_id+'</td>'+
                    '<td>'+product.product_name+'</td>'+
                    '<td>'+product.price+'</td>'+
                    '<td>'+product.category+'</td>'+
                    '<td>'+product.product_quantity+'</td>'+
                    '<td><a href="edit_product.html"><button id="edit_product">Edit</button></a>'+
                    '&nbsp;&nbsp;'+
                    '<button id="delete_product">Delete</button></td>'+
                    '</tr>';
            })

  	})
  }


// add product



function products(){
	let products_url = 'http://127.0.0.1:5000/api/v2/products';
	let product_name = document.getElementById("product_name").value
	let category = document.getElementById("category").value
	let quantity = document.getElementById("quantity").value
	let price = document.getElementById("price").value



	let data = {product_name: product_name,
				category: category,
				quantity: quantity,
				price: price}


  fetch(products_url,{
    method:"POST",
    body: JSON.stringify(data),
    headers: {
			'Accept':'application/json',
			'Content-type':'application/json',
			"Authorization":'Bearer' + token
    }
    }).then(res => res.json())
	.then(response => {
		console.log(response);
		if (response["message"]!="Product added successfully"){
			return alert(JSON.stringify(response["message"]));
		}else{
			document.getElementById("product_name").value ="";
	    	document.getElementById("quantity").value = "";
	    	document.getElementById("price").value = "";
	    	document.getElementById("product_category").value ="";
			return alert(response["message"]);
		}
	})
	.catch(error => console.error('Error:', error));
}


// update product

function Editproducts(){
	let products_url = 'http://127.0.0.1:5000/api/v2/products';
	let product_name = document.getElementById("product_name").value
	let category = document.getElementById("category").value
	let quantity = document.getElementById("quantity").value
	let price = document.getElementById("price").value



	let data = {product_name: product_name,
				category: category,
				quantity: quantity,
				price: price}


  fetch(products_url,{
    method:"PUT",
    body: JSON.stringify(data),
    headers: {
			'Accept':'application/json',
			'Content-type':'application/json',
			"Authorization":'Bearer' + token
    }
    }).then(res => res.json())
	.then(response => {
		console.log(response);
		if (response["message"]!="Product added successfully"){
			return alert(JSON.stringify(response["message"]));
		}else{
			alert(response["message"]);
		}
	})
	.catch(error => console.error('Error:', error));
}


// delete product

function Deleteproducts(){
	let products_url = 'http://127.0.0.1:5000/api/v2/products';
	let product_name = document.getElementById("product_name").value
	let category = document.getElementById("category").value
	let quantity = document.getElementById("quantity").value
	let del = confirm("Delete");
	if (del == false){

	}





  fetch(products_url,{
    method:"DELETE",
    body: JSON.stringify(data),
    headers: {
			'Accept':'application/json',
			'Content-type':'application/json',
			"Authorization":'Bearer' + token
    }
    }).then(res => res.json())
	.then(response => {
		console.log(response);
		if (response["message"]=="Product deleted successfully"){
			alert(response["message"]):
		}else {
			return alert(response["message"]);
		}
	})
	.catch(error => console.error('Error:', error));
}