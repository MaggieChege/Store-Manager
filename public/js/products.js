// get all products

function setToken(result){
   return localStorage.setItem('access_token', result.body.access_token)
}

function getToken(){
    access_token = localStorage.getItem('access_token');
    return access_token;
}

access_token = getToken()
// window.onload = function products(){
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
  	let product_table  = document.getElementById('my_products');
  	let result = '';
  	products.forEach(product =>{
  		result +=`
            	<table>
                              
                    <tr>
                    <td><img src="img/AIR JORDAN 11 HEIRESS.jpg"height="150" width="150">
                      <h4 style="display: none;">${product.product_id}</h4>
                    <h4>product_name:${product.product_name}</h4>
                    <h4>category:${product.category}</h4>
                    <h4>quantity:${product.quantity}</h4>
                    <h4>Kshs:${product.price}</h4>
                    <button onclick="Popup(`+product.product_id+`)" value="cart" class="btn-cart" style="margin-bottom: 100px;"">Shopping Cart </button>
                    
                    </td>
                    </tr>
               
                
            </table>

            `
            // document.getElementById('product_name').value = product.product_name
            product_table.innerHTML = result;
            })
  	        localStorage.setItem('products', JSON.stringify(data.products));


  	})
  // }
// 
function Popup(product_id){
  console.log(product_id)
  document.getElementById("myForm").style.display = "block";
  document.getElementById('product_id').value = product_id

  // document.getElementById('product_name').value = document.getElementById('product_name')

}



document.getElementById('sale').addEventListener('click',SellProduct)
function SellProduct(){
  // console.log(product_id)
  let product_id = document.getElementById('product_id').value; 
  // document.getElementById('product_id').innerHTML = "product_id"
  let quantity = document.getElementById('quantity').value; 
  let attendant = document.getElementById('attendant').value;
  fetch('http://127.0.0.1:5000/api/v2/sales',{
    method: 'POST',
    headers:{
      'Accept':'application/json',
      'Content-type':'application/json',
      "Authorization":'Bearer' + access_token
    },body:JSON.stringify({product_id:product_id,quantity:quantity,attendant:attendant})
  })
  .then(result => result.json().then(data => ({status: result.status, body: data})))
  .then(result => {
     console.log(result)
     console.log(result.body.data)
     console.log(result.status)
     if(result.status == 201){
       document.getElementById('success_added').innerHTML = result.body.message;
       window.location.reload();
     }else if(result.status == 500){
     alert("Please Login again");
     window.setTimeout("location.href = '../index.html';",2000)}
     else{
       alert(result.body.message);
     }

})
}



