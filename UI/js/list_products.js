function setToken(result){
   return localStorage.setItem('access_token', result.body.access_token)
}

function getToken(){
    access_token = localStorage.getItem('access_token');
    return access_token;
}

access_token = getToken()
window.onload = function products(){
	let products_url = 'http://127.0.0.1:5000/api/v2/products';


  fetch(products_url,{
    method:"GET",
    Headers: {
			'Accept':'application/json',
			'Content-type':'application/json',
			"Authorization":'Bearer' + access_token
    },
    })

  .then(respose => respose.json())
  .then((data) =>{
  	console.log(data);
  	let products = data.products;
  	let product_table  = document.getElementById('customers');
  	let result = `<tr>
    <th>Product_id</th>
        <th>Product Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Delete</th>
        <th>Update</th>

      </tr>`;
  	products.forEach(product =>{
  		result +=`

      <table id="customers">

      
      <tr>
         <td> ${product.product_id}</td>
         <td> ${product.product_name}</td>
        <td>${product.category}</td>
        <td>${product.quantity}</td>
        <td>${product.price}0</td>
        <td><button onclick="delete_products(`+product.product_id+`)">Delete</button></td>

        <td><button onclick="update_products(`+product.product_id+`)">Update</button></td>

      </tr>
    </table >
            	

            `
            product_table.innerHTML = result;
            })
  	        localStorage.setItem('products', JSON.stringify(data.products));

  	})
  }
  // delete product
function delete_products(id) {
    let url = 'http://127.0.0.1:5000/api/v2/products/'.concat(id);

    fetch(url,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + access_token
        }})
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
      console.log(result.body)
      // window.location.reload();
      if(result.status == 200){
        document.getElementById('success').innerHTML = "Deleted Successfully";
            alert("This Product will be deleted!!");
          window.location.reload();


      }else if(result.status == 500){
      document.getElementById('error').innerHTML = "Please Login";
      window.setTimeout("location.href = 'index.html';",3000)
      }else{
        document.getElementById(error).innerHTML = result.body.message;
      }
    
        // window.location.reload();
    })
}

// function popup(){
//   document.getElementById("myForm").style.display = "block";
//   // update_products()
// }
document.getElementById('update_product').addEventListener('click',update_products)
function update_products(id){
  document.getElementById("myForm").style.display = "block";
 
  let product_name = document.getElementById("product_name").value;
  let category = document.getElementById("category").value;
  let price = document.getElementById("price").value;
  var quantity = document.getElementById("quantity").value
  fetch('http://127.0.0.1:5000/api/v2/products/'.concat(id),{
    method:'PUT',
    headers:{
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + access_token,
            mode: 'cors'

        },
        body:JSON.stringify({product_name: product_name,category: category,price: price,quantity: quantity})
      })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
      console.log(result.body)
      // window.location.reload();
      if(result.status == 200){
        document.getElementById('success').innerHTML = "Product successfully updated";
      }else if(result.status ==500){
      document.getElementById('error').innerHTML = "Please Login";
      window.setTimeout("location.href = 'index.html';",3000)
      }else{
        document.getElementById(error).innerHTML = result.body.message;
      }
    
        // window.location.reload();
    })
}